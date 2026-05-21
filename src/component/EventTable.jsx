import React from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";

export const EventTable = ({ data }) => {
  return (
    <div className="w-full touch-auto overflow-auto">
      <table className="table-auto w-4xl">
        <thead>
          <tr id="thead">
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr id="tdata" key={d._id}>
              <td>{d.name}</td>
              <td className="">{d.location}</td>
              <td className="">{new Date(d.date).toDateString()}</td>
              <td>
                <Link to={`/${d.name}/edit`}>Edit</Link>
              </td>
              <td className="p-2">
                <Delete id={`${d._id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
