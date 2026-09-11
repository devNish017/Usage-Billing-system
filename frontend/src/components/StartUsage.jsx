import { useEffect, useState } from "react";
import {
  getUsers,
  getResources,
  startUsage
} from "../api/api";

const StartUsage = () => {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);

  const [userId, setUserId] = useState("");
  const [resourceId, setResourceId] = useState("");

  const fetchData = async () => {
    try {
      const userData = await getUsers();
      const resourceData = await getResources();

      setUsers(userData.users);
      setResources(resourceData.resources);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStart = async (e) => {
    e.preventDefault();

    try {
      const data = await startUsage({
        userId,
        resourceId
      });

      console.log(data);

      setUserId("");
      setResourceId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-5">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Start Usage
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Select a user and resource to start a new usage session.
        </p>
      </div>

      <form onSubmit={handleStart} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User
          </label>

          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a user</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resource
          </label>

          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a resource</option>

            {resources.map((resource) => (
              <option key={resource._id} value={resource._id}>
                {resource.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!userId || !resourceId}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-md transition"
          >
            Start Usage
          </button>
        </div>

      </form>
    </div>
  );
};

export default StartUsage;