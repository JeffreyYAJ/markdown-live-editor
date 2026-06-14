import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { initialMarkdown } from "../data/initialMarkdown";
import {
  DocumentsContext,
  type DocumentSnapshot,
  type MarkdownDocument,
} from "./DocumentsContext";

const DOCS_STORAGE_KEY = "architect-docs-v1";
const HISTORY_STORAGE_KEY = "architect-history-v1";
const LEGACY_DOC_KEY = "architect-document";

const MAX_SNAPSHOTS = 25;
const SNAPSHOT_INTERVAL_MS = 15000;

interface PersistedState {
  documents: MarkdownDocument[];
  activeId: string;
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.documents?.length) return parsed;
    }
  } catch {
    // fall through to migration / defaults
  }

  // Migrate the legacy single-document key, if present.
  let content = initialMarkdown;
  try {
    const legacy = localStorage.getItem(LEGACY_DOC_KEY);
    if (legacy != null) content = legacy;
  } catch {
    // ignore
  }

  const doc: MarkdownDocument = {
    id: makeId(),
    name: "index.md",
    content,
    updatedAt: Date.now(),
  };
  return { documents: [doc], activeId: doc.id };
}

function loadHistory(): Record<string, DocumentSnapshot[]> {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Record<string, DocumentSnapshot[]>;
  } catch {
    // ignore
  }
  return {};
}

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [{ documents, activeId }, setState] = useState<PersistedState>(
    loadInitialState,
  );
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const historyRef = useRef<Record<string, DocumentSnapshot[]>>(loadHistory());
  const saveTimeoutRef = useRef<number | null>(null);

  // Debounced persistence of documents + history snapshots.
  useEffect(() => {
    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(
          DOCS_STORAGE_KEY,
          JSON.stringify({ documents, activeId }),
        );

        const active = documents.find((d) => d.id === activeId);
        if (active) {
          const snaps = historyRef.current[active.id] ?? [];
          const last = snaps[snaps.length - 1];
          const changed = !last || last.content !== active.content;
          const elapsed = !last || Date.now() - last.ts > SNAPSHOT_INTERVAL_MS;
          if (changed && elapsed) {
            const next = [
              ...snaps,
              { ts: Date.now(), content: active.content },
            ].slice(-MAX_SNAPSHOTS);
            historyRef.current = {
              ...historyRef.current,
              [active.id]: next,
            };
            localStorage.setItem(
              HISTORY_STORAGE_KEY,
              JSON.stringify(historyRef.current),
            );
          }
        }
        setLastSavedAt(Date.now());
      } catch {
        // ignore quota / privacy-mode failures
      }
    }, 400);

    return () => {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    };
  }, [documents, activeId]);

  const createDocument = useCallback((name?: string, content = "") => {
    const id = makeId();
    setState((prev) => {
      const base = name?.trim() || `untitled-${prev.documents.length + 1}.md`;
      const finalName = /\.[a-z0-9]+$/i.test(base) ? base : `${base}.md`;
      const doc: MarkdownDocument = {
        id,
        name: finalName,
        content,
        updatedAt: Date.now(),
      };
      return { documents: [...prev.documents, doc], activeId: id };
    });
    return id;
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setState((prev) => {
      if (prev.documents.length <= 1) return prev; // keep at least one
      const remaining = prev.documents.filter((d) => d.id !== id);
      const activeId =
        prev.activeId === id ? remaining[0].id : prev.activeId;
      return { documents: remaining, activeId };
    });
  }, []);

  const renameDocument = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === id ? { ...d, name: trimmed, updatedAt: Date.now() } : d,
      ),
    }));
  }, []);

  const selectDocument = useCallback((id: string) => {
    setState((prev) =>
      prev.activeId === id ? prev : { ...prev, activeId: id },
    );
  }, []);

  const updateActiveContent = useCallback((content: string) => {
    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === prev.activeId
          ? { ...d, content, updatedAt: Date.now() }
          : d,
      ),
    }));
  }, []);

  const getHistory = useCallback((id: string) => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (raw) {
        historyRef.current = JSON.parse(raw) as Record<
          string,
          DocumentSnapshot[]
        >;
      }
    } catch {
      // ignore
    }
    return historyRef.current[id] ?? [];
  }, []);

  const restoreSnapshot = useCallback((id: string, ts: number) => {
    const snaps = historyRef.current[id] ?? [];
    const snap = snaps.find((s) => s.ts === ts);
    if (!snap) return;
    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === id
          ? { ...d, content: snap.content, updatedAt: Date.now() }
          : d,
      ),
    }));
  }, []);

  const activeDoc = useMemo(
    () => documents.find((d) => d.id === activeId),
    [documents, activeId],
  );

  const value = useMemo(
    () => ({
      documents,
      activeId,
      activeDoc,
      lastSavedAt,
      createDocument,
      deleteDocument,
      renameDocument,
      selectDocument,
      updateActiveContent,
      getHistory,
      restoreSnapshot,
    }),
    [
      documents,
      activeId,
      activeDoc,
      lastSavedAt,
      createDocument,
      deleteDocument,
      renameDocument,
      selectDocument,
      updateActiveContent,
      getHistory,
      restoreSnapshot,
    ],
  );

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}
