import { useEffect, useState } from "react";
import { getResources } from "../api/api";

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const data = await getResources();

      setResources(data.resources);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Resources
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Available resources and their pricing details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {resource.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Shared Resource
                </p>
              </div>

              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded">
                Active
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Capacity
                </span>

                <span className="font-medium text-gray-800">
                  {resource.capacity} users
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  First hour
                </span>

                <span className="font-medium text-gray-800">
                  ₹{resource.firstHourRate}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Additional hour
                </span>

                <span className="font-medium text-gray-800">
                  ₹{resource.additionalHourRate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;