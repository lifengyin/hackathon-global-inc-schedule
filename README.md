# Hack the North Frontend Challenge

View the writeup here: https://lifengyin.dev/blog/htn-frontend-challenge/


## Requirements

- **Node.js** 18+
- **pnpm** (recommended; npm or yarn work with the same scripts)

## Running the app

Install dependencies (pnpm is used here)

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Other scripts:

- `pnpm build` — TypeScript check + production build
- `pnpm preview` — Serve the production build locally
- `pnpm lint` — Run ESLint

## Folder Structure

```
src/
├── main.tsx         # Top-level files, shared across the app
├── App.tsx
├── index.css
├── types.ts
├── atoms/           # Reusable UI primitives
│   ├── Badge.tsx
│   ├── Button.tsx
│   └── Field.tsx
├── components/      # Features and layout components, made with atoms
│   ├── EventCard.tsx
│   ├── EventCardDialog.tsx
│   ├── EventsEmptyState.tsx
│   ├── EventsGrid.tsx
│   ├── EventsSearch.tsx
│   ├── EventsToolbar.tsx
│   ├── Logo.tsx
│   ├── MobileHeader.tsx
│   ├── Sidebar.tsx
│   └── SidebarUserRow.tsx
├── hooks/           # React hooks to simplify logic
│   ├── useDebouncedValue.ts
│   └── useEvents.ts
├── pages/           # Route-level, made with components
│   ├── Dashboard.tsx
│   └── Login.tsx
├── utils/           # Helpers and shared logic
│   └── eventUtils.tsx
└── assets/          # Images and static assets
```