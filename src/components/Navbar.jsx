import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-white shadow-sm fixed top-0 left-0">
      <h1 className="text-xl font-bold text-indigo-700">Donation Platform</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
          Home
        </Link>
        <Link to="/donate" className="text-gray-700 hover:text-indigo-600 font-medium">
          Donate
        </Link>
      </div>
    </nav>
  );
}
