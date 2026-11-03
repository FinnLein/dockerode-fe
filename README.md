# Algorithm Learning Platform — Frontend

Web client for my algorithm learning platform (LeetCode clone). Built with Next.js, TypeScript, Tailwind CSS, Monaco Editor, TanStack Query, and SSE.

## ✨ Features

- **Code Editor** — Monaco Editor integration for writing and editing solutions.
- **Real-time collaboration** — multiplayer code editing powered by Yjs (CRDT), with shared cursors and presence.
- **Real-time updates** — Server-Sent Events (SSE) for live submission status and test results.
- **Data fetching & caching** — TanStack Query for server state management.
- **UI components** — shadcn/ui built on top of Radix UI and Tailwind CSS.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js](https://nextjs.org/) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Kit | [shadcn/ui](https://ui.shadcn.com/) |
| Editor | Monaco Editor |
| Collaboration | [Yjs](https://yjs.dev/) (CRDT) + y-monaco |
| Data Fetching | TanStack Query |
| Real-time | SSE (Server-Sent Events) |

## 🤝 Collaborative Editing

The editor supports multiplayer sessions so several users can work on the same solution simultaneously.

- **Yjs CRDT** handles conflict-free merging of concurrent edits.
- **y-monaco** binds the Yjs shared document to Monaco Editor.
- **Awareness** (via `y-protocols/awareness`) shares user presence, names, colors, and live cursors.
- The document is synced over a WebSocket provider, so all participants see changes in real time without conflicts.
