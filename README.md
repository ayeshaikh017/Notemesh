# NoteMesh — MVP

Smart class notes + doubt resolution network. Notes are split into blocks
(paragraphs). Doubts are anchored to a specific block, not floating in a
generic chat. A confusion heatmap shows which blocks get the most doubts.

## Folder structure

```
notemesh/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/          # User, Note, Doubt, Answer
│   ├── controllers/      # authController, noteController, doubtController, answerController
│   ├── routes/           # authRoutes, noteRoutes, doubtRoutes, answerRoutes
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/index.html
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.js
        ├── pages/         # Login, Signup, Dashboard, CreateNote, NoteView
        ├── components/    # DoubtPanel, Heatmap
        ├── styles/App.css
        ├── App.js
        └── index.js
```

## MVP feature set (what's actually implemented)

- **Auth**: signup/login with JWT, passwords hashed with bcrypt.
- **Notes**: create a note (title, subject, chapter, topic, content). Content
  is auto-split into blocks on blank lines — each block gets a stable `blockId`.
- **Doubts**: any logged-in user can raise a doubt on a specific block.
- **Answers**: threaded answers per doubt, with upvoting. Answers list sorts
  by upvote count so the best explanation floats up.
- **Confusion Heatmap**: `GET /api/notes/:id/heatmap` aggregates doubt counts
  per block and returns a normalized intensity (0–1). The frontend renders
  this as a red overlay on each block — darker = more students got stuck there.
- **Search**: notes list can be filtered by subject/chapter/topic or searched
  by title.

## What's intentionally left out of v1 (natural next steps)

- Rich text editor (currently plain textarea, split by blank lines)
- Role-based permissions (senior/tutor badges exist in the schema but aren't
  enforced anywhere yet)
- Doubt resolution workflow beyond a simple `resolved` boolean
- Notifications / real-time updates (would use Socket.io)
- File/image uploads in notes

## How to run it locally

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB running locally (or a free MongoDB Atlas cluster)

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI (Atlas connection string or mongodb://127.0.0.1:27017/notemesh)
# and set JWT_SECRET to any long random string
npm run dev      # requires nodemon (installed as devDependency)
# or: npm start
```

Backend runs on `http://localhost:5000`. Confirm it's alive:
`http://localhost:5000/api/health` → `{"status":"ok"}`

### 3. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000` and talks to the backend at
`http://localhost:5000/api` by default (override with a `.env` containing
`REACT_APP_API_URL=http://localhost:5000/api` if you deploy the backend
elsewhere).

### 4. Try it out

1. Sign up for an account.
2. Click "New Note", fill in subject/chapter/topic, and write a few
   paragraphs separated by blank lines.
3. Open the note, click on any paragraph — a doubt panel opens under it.
4. Ask a doubt, then answer it (you can use a second account to simulate a
   classmate answering and upvoting).
5. Refresh the note — the block you asked a doubt on now has a light red
   tint. Ask more doubts on the same block and watch the tint deepen
   relative to the note's other blocks — that's the confusion heatmap.

## Deploying (when you're ready)

- Backend: Render / Railway / Fly.io (set `MONGO_URI` and `JWT_SECRET` as
  env vars), or MongoDB Atlas + any Node host.
- Frontend: Vercel / Netlify, pointing `REACT_APP_API_URL` at your deployed
  backend URL.

## Resume-ready framing

"I built NoteMesh because doubts in class WhatsApp groups get buried and
re-asked every semester. Notes are stored as discrete blocks so a doubt can
be anchored to the exact paragraph it's about, not just posted into a
generic thread. I also built a confusion-heatmap endpoint that aggregates
doubt counts per block and normalizes them, so a student — or a teacher —
can see at a glance which part of a topic causes the most confusion."
