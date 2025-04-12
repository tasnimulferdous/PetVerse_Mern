export const getUsers = async () => {
    return [
      { username: "alice", location: "New York", blogCount: 3 },
      { username: "bob", location: "California", blogCount: 5 },
      { username: "carol", location: "Texas", blogCount: 1 }
    ];
  };
  
  export const deleteUser = async (username) => {
    console.log(`Deleted user: ${username}`);
  };
  