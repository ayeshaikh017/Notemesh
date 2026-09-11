# Notemesh
Smart class notes with doubt-resolution anchored to specific lines — plus a confusion heatmap showing where students get stuck. MERN stack.
# 📝 NoteMesh

**Class notes with doubts anchored to the exact line they're about — not lost in a WhatsApp group chat.**

NoteMesh is a MERN-stack platform where students write or upload notes, raise doubts directly on the paragraph they're confused about, and answer each other's doubts. Over time, every topic builds its own searchable doubt archive — and a **confusion heatmap** shows exactly which part of a topic trips students up the most.

---

## 💡 The problem

Class notes and doubts live scattered across WhatsApp groups, Google Docs, and physical notebooks. When a student gets stuck, they either ask in a group chat that scrolls away in five minutes, or give up. The same doubt gets re-asked by every new batch of students because nothing is ever recorded against the actual content it's about.

## ✅ The solution

- Notes are broken into **blocks** (paragraphs), each with a stable ID.
- A doubt is raised **on a specific block**, not posted into a generic thread.
- Answers are upvoted, so the best explanation rises to the top.
- A **Confusion Heatmap** aggregates doubt counts per block, so anyone opening a note can instantly see which lines cause the most confusion — no need to scroll through a chat history.

```
Topic: Binary Search Trees

Line 12 (deletion case)   ████████░░  82% of doubts land here
Line 7  (insertion)       ███░░░░░░░  30%
Line 20 (balancing)       ██████░░░░  61%
```

---

## ✨ Features

- 🔐 JWT-based authentication (signup/login, bcrypt-hashed passwords)
- 📄 Notes organized by subject → chapter → topic
- 🧩 Auto-splitting of notes into blocks for stable doubt-anchoring
- ❓ Doubts tied to a specific block, not a floating chat
- 💬 Threaded, upvotable answers — best explanation floats to the top
- 🔥 Confusion Heatmap — per-block doubt density, visualized as an overlay
- 🔎 Search notes by title, subject, chapter, or topic

---

## 🛠 Tech stack

| Layer      | Tech                                  |
|------------|----------------------------------------|
| Frontend   | React, React Router, Axios             |
| Backend    | Node.js, Express                       |
| Database   | MongoDB, Mongoose                      |
| Auth       | JWT, bcrypt                            |

---

## 📁 Project structure

```
notemesh/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/          # User, Note, Doubt, Answer
│   ├── controllers/     # auth, note (+ heatmap), doubt, answer
│   ├── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.js
        ├── pages/        # Login, Signup, Dashboard, CreateNote, NoteView
        ├── components/   # DoubtPanel, Heatmap
        └── App.js
```

---

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone and set up the backend
```bash
git clone https://github.com/<your-username>/notemesh.git
cd notemesh/backend
npm install
cp .env.example .env
```
Edit `.env` and set:
```
MONGO_URI=mongodb://127.0.0.1:27017/notemesh
JWT_SECRET=<any long random string>
```
Start the API:
```bash
npm run dev
```
Runs on `http://localhost:5000`. Verify with `GET /api/health`.

### 2. Set up the frontend
In a second terminal:
```bash
cd notemesh/frontend
npm install
npm start
```
Runs on `http://localhost:3000`.

### 3. Try it out
1. Sign up for an account.
2. Click **New Note**, fill in subject/chapter/topic, and write a few paragraphs separated by blank lines.
3. Open the note and click any paragraph — a doubt panel opens beneath it.
4. Ask a doubt, then answer/upvote it (use a second account to simulate a classmate).
5. Refresh the note — the block gets a light red tint. Add more doubts to the same block and watch the tint deepen relative to the rest of the note — that's the confusion heatmap in action.

---

## 🗺 Roadmap

- [ ] Rich text editor for notes (currently plain text split on blank lines)
- [ ] Role-based permissions (student / senior / tutor)
- [ ] Real-time updates via Socket.io
- [ ] Image/file attachments in notes
- [ ] Full-text search across doubt archive

---

## 📄 License

MIT
