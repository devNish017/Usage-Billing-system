import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;