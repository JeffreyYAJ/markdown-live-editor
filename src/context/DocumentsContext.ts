import { createContext, useContext } from "react";

export interface MarkdownDocument {
  id: string;
  name: string;
  content: string;
  updatedAt: number;
}

export interface DocumentSnapshot {
  ts: number;
  content: string;
}

export interface DocumentsContextValue {
  documents: MarkdownDocument[];
  activeId: string;
  activeDoc: MarkdownDocument | undefined;
  lastSavedAt: number | null;
  createDocument: (name?: string, content?: string) => string;
  deleteDocument: (id: string) => void;
  renameDocument: (id: string, name: string) => void;
  selectDocument: (id: string) => void;
  updateActiveContent: (content: string) => void;
  getHistory: (id: string) => DocumentSnapshot[];
  restoreSnapshot: (id: string, ts: number) => void;
}

export const DocumentsContext = createContext<DocumentsContextValue | null>(
  null,
);

export function useDocuments(): DocumentsContextValue {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return ctx;
}
