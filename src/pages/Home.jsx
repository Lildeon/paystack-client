// pages/Dashboard.jsx
import { useEffect, useState } from "react";

import { EventTable } from "../component/EventTable";

import { api } from "../service/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("events").then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-full h-full">
      <p className="text-lg min-[360px]:text-2xl font-bold">Manage Events</p>
      <div className="w-full rounded-2xl grid min-[500px]:grid-cols-2 md:grid-cols-3  justify-between gap-5">
        {data.map((d) =>
          data.length < 1 ? (
            <p>No event </p>
          ) : (
            <Link to={`/${d.name}/dashboard`} id="event" key={d._id}>
              {d.name}
            </Link>
          ),
        )}
      </div>

      <div className="w-fit mt-5 text-lg font-bold hover:underline">
        <Link to={"/create-event"}>Creat event</Link>
      </div>

      <div className="w-full mt-10">
        {data === null ? (
          <p>No Event</p>
        ) : (
          <div>
            <EventTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
