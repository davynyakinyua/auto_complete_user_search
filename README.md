Markdown
# Real-Time User Search Application

[✨ **View Live Demo**](https://autocomleteusersearch.netlify.app/)

A clean, production-ready React application that fetches user data from an API, manages asynchronous loading and error states with a retry mechanism, and provides lightning-fast real-time filtering with edge-case handling.

Built as part of a technical evaluation to showcase React fundamentals, side-effect management, and robust UI state flow.

---

## 🚀 Features

- **Real-Time Search Filtering:** Instantly filters through user names and emails as you type.
- **Robust Edge-Case Handling:** 
  - Case-insensitive matching (`"JOHN"`, `"John"`, and `"john"` all match).
  - Whitespace trimming (prevents false empty states from accidental trailing or leading spaces).
  - Graceful "No user found" feedback when search results are empty.
- **Asynchronous Lifecycle & Cleanup:** 
  - Uses `AbortController` to cleanly cancel pending fetch requests and prevent memory leaks or state updates on unmounted components.
- **Error Handling & Retry Flow:** 
  - Catches network failures cleanly and presents a user-friendly error state with an interactive **Try again** button.

---

## 🛠️ Technical Implementation Highlights

- **Derived State:** Filters the user list directly during the render cycle rather than keeping redundant synchronization states, keeping the code DRY and eliminating synchronization bugs.
- **Modern React Hooks:** Leverages `useState` for state management and `useEffect` for handling side effects and cleanup workflows.

---

## 📋 Component Architecture & Control Flow

[ App Component Mounts ]
│
├──> Fetch Users API Call (with AbortController)
│         ├──> Success ──> Set Users State ──> Display User List
│         └──> Failure ──> Catch Error ──────> Display Error & Retry Button
│
└──> User Typing (onChange)
└──> Compute Derived filteredUsers (case-insensitive & trimmed)
├──> If match found ──> Render list items
└──> If 0 results ───> Render "No user found" message


---

## ⚙️ Getting Started & Local Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:davynyakinyua/auto_complete_user_search.git
   cd auto_complete_user_search.git
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open your browser and navigate to the local URL provided by Vite (usually http://localhost:5173).

🌐 API Reference
This app fetches mock user data from JSONPlaceholder:

Endpoint: https://jsonplaceholder.typicode.com/users

Data Extracted: User id, name, and email.