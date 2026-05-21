import React from "react";
import { api } from "../service/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toast";

const CreatEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    location: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await api.post("create-event", event);
    res.status === 201
      ? toast.success("Event created")
      : toast.error("Event exist");

    if (res.status === 201) {
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    }
  };
  return (
    <div>
      <p className="text-2xl font-bold">Create Event</p>
      <form onSubmit={handleCreate} className="flex flex-col gap-3">
        <label>Event name</label>
        <input
          placeholder="Title"
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Location/Venue</label>
        <input
          placeholder="Location/Venue"
          type="text"
          name="location"
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Date/Time</label>
        <input
          placeholder="Date"
          type="date"
          name="date"
          onChange={(e) => handleChange(e)}
          required
        />

        <button type="submit" className="border rounded-2xl">
          Create
        </button>
      </form>
      <Link className="mt-5 block border p-2 rounded-2xl" to={"/admin"}>
        Back
      </Link>
    </div>
  );
};

export default CreatEvent;
