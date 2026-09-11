
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
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Users
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Users registered in the billing system.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">
            No users found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Registered User
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="text-sm text-gray-800 mt-1">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

