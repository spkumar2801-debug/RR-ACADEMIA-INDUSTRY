import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { Home } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <Logo variant="mark" size="lg" />
        <div className="text-6xl font-extrabold font-cinzel text-[#0B132B]">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600">
          The requested page could not be located. It may have been moved or updated.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/"
            className="bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] px-6 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
