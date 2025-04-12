export default function UserCard({ user, onDelete }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-sm text-gray-600">📍 {user.location}</p>
        <p className="text-sm">📝 Blogs written: {user.blogCount}</p>
        <button onClick={() => onDelete(user.username)} className="mt-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    );
  }

