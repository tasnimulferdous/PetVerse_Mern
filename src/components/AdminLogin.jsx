import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    if (username === "admin" && password === "admin123") {
      onLogin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input type="text" placeholder="Username" className="mb-3 w-full p-2 border rounded"
          value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="mb-4 w-full p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
