import { useEffect, useState } from "react";
import { getUsageHistory } from "../api/api";

const UsageHistory = () => {
  const [usages, setUsages] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getUsageHistory();

      setUsages(data.usages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Usage History
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Completed usage sessions and billing details.
        </p>
      </div>

      {usages.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500">
            No usage history available.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {usages.map((usage) => (
            <div
              key={usage._id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Usage Session
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Completed session
                  </p>
                </div>

                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded">
                  {usage.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-100 pt-4">

                <div>
                  <p className="text-xs text-gray-500">
                    User
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {usage.userId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Resource
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {usage.resourceId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Duration
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {usage.duration} hour(s)
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Bill
                  </p>

                  <p className="text-lg font-semibold text-blue-600 mt-0.5">
                    ₹{usage.bill}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">

                <div>
                  <p className="text-xs text-gray-500">
                    Start Time
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {new Date(usage.startTime).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    End Time
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {new Date(usage.endTime).toLocaleString()}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsageHistory;