import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

export default function App() {

  return (
     <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <header className="bg-white border-b">
        <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold">DMS — Document Manager</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/login" className="hover:font-bold">Login</Link>
            <Link to="/upload" className="hover:font-bold">Upload</Link>
            <Link to="/search" className="hover:underline">Search</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

      <footer className="bg-white border-t">
        <div className="w-full mx-auto px-4 py-3 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} DMS — Document Manager by Amit Dewangan
        </div>
      </footer>
    </div>
  )
}
