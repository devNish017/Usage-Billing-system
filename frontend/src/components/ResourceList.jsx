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
    <div>
      <h2>Resources</h2>

      {resources.map((resource) => (
        <div key={resource._id}>
          <p>Name: {resource.name}</p>
          <p>Capacity: {resource.capacity}</p>
          <p>First Hour: ₹{resource.firstHourRate}</p>
          <p>Additional Hour: ₹{resource.additionalHourRate}</p>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;