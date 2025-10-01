import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

export default function App() {

  return (
     <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <header className="bg-gradient-to-r from-violet-500 via-blue-400 to-indigo-400 shadow-md sticky top-0 z-20">
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
            DMS
            <span className="hidden sm:inline font-medium ml-2">- Document Manager</span>
          </Link>
            <nav className="flex gap-2 sm:gap-4 text-sm">
              <Link to="/login" className="px-3 py-1 rounded-full font-semibold text-white hover:bg-white/20 hover:text-white transition">Login</Link>
              <Link to="/upload" className="px-3 py-1 rounded-full font-semibold text-white hover:bg-white/20 hover:text-white transition">Upload</Link>
              <Link to="/search" className="px-3 py-1 rounded-full font-semibold text-white hover:bg-white/20 hover:text-white transition">Search</Link>
            </nav>
        </div>
      </header>

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-indigo-100 via-blue-100 to-violet-100 border-t border-indigo-300">
        <div className="w-full max-w-7xl mx-auto px-4 py-4 text-xs sm:text-sm text-indigo-700 text-center rounded-t-xl font-medium tracking-wide">
          <span className="inline-block mr-1">© {new Date().getFullYear()} </span>
          <span className="font-bold">DMS</span> — Document Manager by <span className="font-semibold">Amit Dewangan</span>
        </div>
      </footer>
    </div>
  )
}
