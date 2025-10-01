import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-400 px-2">
        <h1 className="text-4xl md:text-5xl text-center font-extrabold mt-10 md:mt-5 lg:-mt-16 mb-5 text-indigo-800 drop-shadow-lg">
          Document Management System
        </h1>
        <h2 className="text-center text-base sm:text-xl md:text-2xl font-medium text-indigo-900 mb-4 tracking-wide">
          Secure, smart, and simple way to manage documents online
        </h2>
        <p className="text-center text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
          <span className="block font-semibold text-blue-700 mb-1">
            👉🏻 Securely upload, search, preview, and download your documents with ease.
          </span>
          <span className="block text-blue-700 font-medium">
            👉🏻 Designed for individuals and teams who value efficiency and security.
          </span>
        </p>

        <button
          className="mb-8 px-10 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-600 transition text-lg tracking-wide"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        {/* Features Section */}
        <div className="mt-4 w-full max-w-5xl mx-auto p-4 sm:p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            <div className="flex items-center gap-3 bg-indigo-50/80 rounded-lg shadow-sm px-4 py-3 sm:px-6 sm:py-4 border border-indigo-100 min-w-[180px] justify-center">
              <span className="text-2xl">🔒</span>
              <span className="font-semibold text-indigo-700">Secure OTP Login</span>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50/80 rounded-lg shadow-sm px-4 py-3 sm:px-6 sm:py-4 border border-indigo-100 min-w-[180px] justify-center">
              <span className="text-2xl">📤</span>
              <span className="font-semibold text-indigo-700">File Upload with metadata</span>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50/80 rounded-lg shadow-sm px-4 py-3 sm:px-6 sm:py-4 border border-indigo-100 min-w-[180px] justify-center">
              <span className="text-2xl">🔍</span>
              <span className="font-semibold text-indigo-700">Search, Preview & Download</span>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50/80 rounded-lg shadow-sm px-4 py-3 sm:px-6 sm:py-4 border border-indigo-100 min-w-[180px] justify-center">
              <span className="text-2xl">🏷️</span>
              <span className="font-semibold text-indigo-700">Smart Tag Suggestions</span>
            </div>
          </div>
        </div>
      </div>
  );
}
