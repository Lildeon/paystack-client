import React, { useEffect } from "react";
import { api } from "../service/axios";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toast";

const Editvent = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    api.get(`event/${id}`).then((res) => setData(res.data));
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await api.put(`edit-event/${id}`, data);

    res.status === 201
      ? toast.success(`${res.data.message}`)
      : toast.error(`${res.data.message}`);
    setTimeout(() => navigate("/admin"), 1000);
  };
  return (
    <div>
      <p className="text-2xl font-bold">Edit Event</p>
      <form onSubmit={handleEdit} className="flex flex-col gap-3">
        <label>Event name</label>
        <input
          placeholder="Title"
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          defaultValue={data.name}
          required
        />
        <label>Location/Venue</label>
        <input
          placeholder="Location/Venue"
          type="text"
          name="location"
          onChange={(e) => handleChange(e)}
          defaultValue={data.location}
          required
        />
        <label>Date</label>

        <input
          placeholder="Date"
          type="date"
          name="date"
          onChange={(e) => handleChange(e)}
          defaultValue={data.date}
          required
        />

        <button type="submit" className="border rounded-2xl">
          Save
        </button>
      </form>
      <Link className="mt-5 block border rounded-2xl p-2" to={"/admin"}>
        Back
      </Link>
    </div>
  );
};

export default Editvent;
