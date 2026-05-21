// pages/Admin.jsx
import { useEffect, useState } from "react";
import { api } from "../service/axios";
import { Link } from "react-router-dom";

export default function Events() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("events").then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-full mt-5 touch-auto overflow-auto">
      <div className="w-4xl">
        {data === null ? (
          <p>No Event</p>
        ) : (
          <div className="w-full">
            <table className="table-auto w-full">
              <thead>
                <tr id="thead">
                  <th>Event</th>
                  <th>Location</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((d) => (
                  <tr id="tdata" key={d._id}>
                    <td id="data">{d.name}</td>
                    <td id="data">{d.location}</td>
                    <td id="data">{new Date(d.date).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
