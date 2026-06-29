# ONGC Portal

A hybrid portal for ONGC Dehradun with dashboard and multi-step submission form.

## Features

- **Login System**: Secure authentication with local storage persistence
- **Dashboard**: Overview with key metrics and quick actions
- **Multi-step Form Wizard**: Step-by-step submission process with auto-save
- **Submissions Management**: View all submissions in a table
- **Excel Export**: Export submissions to Excel using SheetJS
- **Responsive Design**: Works on all screen sizes

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite
- Tailwind CSS
- React Router
- SheetJS (xlsx)

### Backend
- Node.js with Express
- TypeScript
- SheetJS (xlsx)
- CORS

## Getting Started

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

## Usage

1. Open the frontend in your browser (default: http://localhost:5173)
2. Log in with any credentials (demo mode)
3. Use the dashboard to manage submissions
4. Submit new forms using the multi-step wizard
5. Export submissions to Excel from the View Submissions page
