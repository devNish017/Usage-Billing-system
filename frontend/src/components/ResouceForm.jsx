import { useState } from "react";
import { createResource } from "../api/api";

const ResourceForm = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [firstHourRate, setFirstHourRate] = useState("");
  const [additionalHourRate, setAdditionalHourRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createResource({
        name,
        capacity: Number(capacity),
        firstHourRate: Number(firstHourRate),
        additionalHourRate: Number(additionalHourRate)
      });

      console.log(data);

      setName("");
      setCapacity("");
      setFirstHourRate("");
      setAdditionalHourRate("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Add Resource
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Create a resource with its capacity and hourly pricing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resource name
          </label>

          <input
            type="text"
            placeholder="Meeting Room A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capacity
          </label>

          <input
            type="number"
            placeholder="3"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First hour rate
            </label>

            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 text-sm">
                ₹
              </span>

              <input
                type="number"
                placeholder="30"
                value={firstHourRate}
                onChange={(e) => setFirstHourRate(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional hour rate
            </label>

            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 text-sm">
                ₹
              </span>

              <input
                type="number"
                placeholder="10"
                value={additionalHourRate}
                onChange={(e) => setAdditionalHourRate(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            Add Resource
          </button>
        </div>

      </form>
    </div>
  );
};

export default ResourceForm;