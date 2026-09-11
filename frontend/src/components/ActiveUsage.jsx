import { useEffect, useState } from "react";
import { getActiveUsages, stopUsage } from "../api/api";

const ActiveUsage = () => {
  const [usages, setUsages] = useState([]);

  const fetchActiveUsages = async () => {
    try {
      const data = await getActiveUsages();

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
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Active Usages
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Currently active resource sessions.
        </p>
      </div>

      {usages.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500">
            No active usages at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usages.map((usage) => (
            <div
              key={usage._id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  Active Session
                </h3>

                <span className="text-xs font-medium bg-green-50 text-green-600 px-2.5 py-1 rounded">
                  Active
                </span>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    User
                  </span>

                  <span className="font-medium text-gray-800">
                    {usage.userId}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Resource
                  </span>

                  <span className="font-medium text-gray-800">
                    {usage.resourceId}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Started
                  </span>

                  <span className="font-medium text-gray-800">
                    {new Date(usage.startTime).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleStop(usage._id)}
                className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-md transition"
              >
                Stop Usage
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveUsage;