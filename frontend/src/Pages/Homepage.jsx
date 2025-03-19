import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleSignDocumentClick = () => {
    if (!token) {
      alert("You must be logged in to sign a document!");
      navigate("/login"); // Redirect to login page
    } else {
      navigate("/sign-document"); // Redirect to sign document page
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-green-300 text-black py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Secure Digital Signatures</h1>
        <p className="text-lg mb-6">
          Sign and verify documents online with ease and security.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
          >
            Get Started
          </button>
          <button
            onClick={handleSignDocumentClick}
            className="bg-gray-900 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700"
          >
            Sign Document
          </button>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-gray-900 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 mt-2"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">1. Upload Document</h3>
            <p className="text-gray-600 mt-2">
              Choose your document to sign securely.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">2. Sign Digitally</h3>
            <p className="text-gray-600 mt-2">
              Use your secure key to sign the document.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">3. Download & Verify</h3>
            <p className="text-gray-600 mt-2">
              Save your signed document or verify an existing one.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 mt-20 text-white text-center py-4">
        <p>© 2025 Digital Signature App. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
