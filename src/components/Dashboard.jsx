import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import { getUsers, deleteUser } from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleDelete = (username) => {
    deleteUser(username);
    setUsers(users.filter(u => u.username !== username));
  };

  const filtered = users
    .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map(user => (
          <UserCard key={user.username} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
