import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-xl bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Login (placeholder)</h2>
      <p className="text-sm text-gray-600 mb-4">We'll wire OTP authentication.For now this is a placeholder.</p>
      <div className="flex gap-2">
        <Link to="/upload" className="px-3 py-2 bg-indigo-600 text-white rounded">Go to Upload (dev)</Link>
      </div>
    </div>
  );
}
