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
    console.log("USERS:", userData);

    const resourceData = await getResources();
    console.log("RESOURCES:", resourceData);

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
    <div>
      <h2>Start Usage</h2>

      <form onSubmit={handleStart}>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
        >
          <option value="">Select Resource</option>

          {resources.map((resource) => (
            <option key={resource._id} value={resource._id}>
              {resource.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Start Usage
        </button>
      </form>
    </div>
  );
};

export default StartUsage;