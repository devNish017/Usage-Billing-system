import { useState } from "react";
import { createUser } from "../api/api.js";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createUser({
        name,
        email
      });

      console.log(data);

      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-5 rounded">
        Create User
      </button>
    </form>
  );
};

export default UserForm;