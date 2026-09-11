import { useEffect, useState } from "react";
import { getUsageHistory } from "../api/api";

const UsageHistory = () => {
  const [usages, setUsages] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getUsageHistory();

      console.log("USAGE HISTORY:", data);

      setUsages(data.usages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Usage History</h2>

      {usages.map((usage) => (
        <div key={usage._id}>
          <p>User ID: {usage.userId}</p>
          <p>Resource ID: {usage.resourceId}</p>
          <p>Start Time: {usage.startTime}</p>
          <p>End Time: {usage.endTime}</p>
          <p>Duration: {usage.duration} hour(s)</p>
          <p>Bill: ₹{usage.bill}</p>
          <p>Status: {usage.status}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default UsageHistory;