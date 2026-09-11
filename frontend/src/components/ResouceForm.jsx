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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Resource name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <input
        type="number"
        placeholder="First hour rate"
        value={firstHourRate}
        onChange={(e) => setFirstHourRate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Additional hour rate"
        value={additionalHourRate}
        onChange={(e) => setAdditionalHourRate(e.target.value)}
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 ml-5 rounded">
        Create Resource
      </button>
    </form>
  );
};

export default ResourceForm;