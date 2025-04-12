export default function SearchBar({ search, setSearch }) {
    return (
      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded shadow-sm"
      />
    );
  }
  