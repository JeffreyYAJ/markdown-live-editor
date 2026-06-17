import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  appendHistorySnapshot,
  createFile,
  deleteFile,
  ensureWorkspace,
  getHistory,
  listFiles,
  readFile,
  renameFile,
  resolveWorkspaceRoot,
  uniquePath,
  writeFile,
} from "./fs-utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3001);
const workspaceRoot = resolveWorkspaceRoot();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

function requirePath(queryPath: unknown): string {
  const p = String(queryPath ?? "").trim();
  if (!p) throw new Error("path query parameter is required");
  return p;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, workspace: workspaceRoot });
});

app.get("/api/workspace", async (_req, res) => {
  try {
    const files = await listFiles(workspaceRoot);
    res.json({ root: workspaceRoot, files });
  } catch (err) {
    res.status(500).json({ error: message(err) });
  }
});

app.get("/api/files", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    const data = await readFile(workspaceRoot, rel);
    res.json({ path: rel, ...data });
  } catch (err) {
    const msg = message(err);
    const status =
      msg === "path query parameter is required" || msg === "Path escapes workspace"
        ? 400
        : 404;
    res.status(status).json({ error: msg });
  }
});

app.put("/api/files", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    const content = String(req.body?.content ?? "");
    const { updatedAt } = await writeFile(workspaceRoot, rel, content);
    await appendHistorySnapshot(workspaceRoot, rel, content);
    res.json({ path: rel, updatedAt });
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

app.post("/api/files", async (req, res) => {
  try {
    let rel = String(req.body?.path ?? "").trim();
    const content = String(req.body?.content ?? "");

    if (!rel) {
      rel = await uniquePath(workspaceRoot, "untitled.md");
    } else if (!/\.(md|markdown|txt)$/i.test(rel)) {
      rel = `${rel}.md`;
    }

    const { updatedAt } = await createFile(workspaceRoot, rel, content);
    res.status(201).json({ path: rel, updatedAt });
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

app.patch("/api/files", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    const newPath = String(req.body?.newPath ?? "").trim();
    if (!newPath) {
      res.status(400).json({ error: "newPath is required" });
      return;
    }
    const result = await renameFile(workspaceRoot, rel, newPath);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

app.delete("/api/files", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    await deleteFile(workspaceRoot, rel);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    const snapshots = await getHistory(workspaceRoot, rel);
    res.json({ path: rel, snapshots });
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

app.post("/api/history/restore", async (req, res) => {
  try {
    const rel = requirePath(req.query.path);
    const ts = Number(req.body?.ts);
    const snapshots = await getHistory(workspaceRoot, rel);
    const snap = snapshots.find((s) => s.ts === ts);
    if (!snap) {
      res.status(404).json({ error: "Snapshot not found" });
      return;
    }
    const { updatedAt } = await writeFile(workspaceRoot, rel, snap.content);
    res.json({ path: rel, content: snap.content, updatedAt });
  } catch (err) {
    res.status(400).json({ error: message(err) });
  }
});

// Serve Vite build when running server alone (npm run start)
const distPath = path.resolve(__dirname, "../dist");
app.use(express.static(distPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) res.status(404).send("Build the client first: npm run build");
  });
});

function message(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}

async function main() {
  await ensureWorkspace(workspaceRoot);
  app.listen(PORT, () => {
    console.log(`ARCHITECT_OS file server running on http://localhost:${PORT}`);
    console.log(`Workspace: ${workspaceRoot}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
