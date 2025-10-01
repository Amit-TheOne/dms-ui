# Document Management System (DMS) - UI

A modern web-based Document Management System (DMS) built with React, Redux Toolkit, TypeScript, and Tailwind CSS. This application allows users to securely upload, search, preview, and download single documents as well as multiple documents in zip format.

## Features

- **User Authentication**: Login via mobile number and OTP verification.
- **Document Upload**: Upload PDF and image files with metadata (like category, subcategory, date, remarks, tags, and more).
- **Tag Suggestions**: Smart tag input with suggestions fetched from the backend.
- **Document Search**: Search documents by category, subcategory, date range, tags, and keywords.
- **Preview & Download**: Preview PDF/images in-browser and download single or multiple documents (ZIP).
- **Responsive UI**: Built with Tailwind CSS for a clean and responsive design.


## Tech Stack

- **Frontend Framework:** React 19 (with Vite)
- **State Management:** Redux Toolkit & React-Redux
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **PDF Preview:** react-pdf
- **File Handling:** file-saver, jszip


## Setup Instructions
### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v22 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Clone the Repository

```sh
git clone https://github.com/Amit-TheOne/dms-ui.git
cd dms-ui
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Environment Configuration

Create a `.env` file in the project root with the following content:

```
VITE_API_BASE_URL=https://apis.allsoft.co/api/documentManagement
```

### 5. Running the Application (Development)

```sh
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in the terminal).

### 6. Building for Production

```sh
npm run build
```

### 7. Linting

```sh
npm run lint
```


## Folder Structure
```
.
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components (TagInput, PreviewModal, etc.)
│   ├── lib/                # API configuration (Axios instance)
│   ├── pages/              # Page components (Home, Login, Upload, Search)
│   ├── redux/              # Redux Toolkit slices and store
│   ├── utils/              # Utility functions (download, etc.)
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind CSS imports
├── .env                    # Environment variables
├── package.json            # Project metadata and scripts
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```


## API Endpoints
The frontend expects the following backend endpoints :

- `/generateOTP` (POST): Generate OTP for login
- `/validateOTP` (POST): Validate OTP and receive token
- `/saveDocumentEntry` (POST): Upload document (multipart/form-data)
- `/searchDocumentEntry` (POST): Search documents
- `/documentTags` (POST): Fetch tag suggestions


## Notes
- **Authentication**: After OTP validation, a token is stored in `localStorage` and attached to all subsequent API requests.
- **File Types Supported**: PDFs and Images only.
- **Tag Suggestions**: As you type in the tag input, suggestions are fetched from the backend.
- **Download**: You can download individual files or all search results as a ZIP archive.


## Author
Amit Dewangan

- For any questions, please open an issue or contact the maintainer.
