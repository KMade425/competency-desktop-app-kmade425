# Competency Desktop App (CBT Prototype)

A cross-platform desktop **computer-based testing (CBT)** app built with **Electron**, for running practice and assessment exams offline.

## Features
- **Sign-in and user profiles:** login screen, dashboard, and profile page
- **Exam runner:** loads question sets from JSON and lets candidates move between questions with Next/Previous controls and a question-number navigator that highlights progress
- **Offline-first storage:** keeps data locally with **IndexedDB (Dexie)** and **SQLite (via Knex)**, so exams work without a network connection
- **Themed UI:** Bootstrap-based layout with separate styles for the dashboard, exam, and profile screens

## Tech stack
Electron · JavaScript · HTML/CSS · Bootstrap · Dexie (IndexedDB) · SQLite3 · Knex · electron-builder

## Run locally
```bash
npm install
npm run rebuild   # rebuilds sqlite3 for Electron
npm start
```

## Project structure
```
main.js               Electron main process
src/index.html        Sign-in
src/dashboard.html    Candidate dashboard
src/exam.html         Exam runner (src/js/exam.js)
src/profile.html      Profile
src/js/idb_service.js IndexedDB data layer (Dexie)
src/json/             Sample question bank
```

> Sample users in `src/file_system/` are test accounts only.

## My role
Sole developer: application architecture, UI, exam flow, and local data layer.
