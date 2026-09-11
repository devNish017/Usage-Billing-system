import { useEffect, useState } from "react";
import { getActiveUsages,stopUsage } from "../api/api";

const ActiveUsage = () => {
  const [usages, setUsages] = useState([]);

  const fetchActiveUsages = async () => {
    try {
      const data = await getActiveUsages();

      console.log("ACTIVE USAGES:", data);

      setUsages(data.usages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStop = async (usageId) => {
  try {
    const data = await stopUsage(usageId);

    console.log("STOP RESPONSE:", data);

    fetchActiveUsages();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchActiveUsages();
  }, []);

  return (
    <div>
      <h2>Active Usages</h2>

      {usages.map((usage) => (
        <div key={usage._id}>
          <p>User ID: {usage.userId}</p>
          <p>Resource ID: {usage.resourceId}</p>
          <p>Start Time: {usage.startTime}</p>

         <button onClick={() => handleStop(usage._id)}>
  Stop Usage
</button>
        </div>
      ))}
    </div>
  );
};

export default ActiveUsage;