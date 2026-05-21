import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../service/axios";

const All = () => {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [hasMore, setHasmore] = useState();
  const [unique, setUnique] = useState([]);

  const { id } = useParams();

  let n = 1;
  let arr = [];
  while (n <= totalPages) {
    arr.push(n);
    n++;
  }

  useEffect(() => {
    api
      .get(`people/${id}?page=${page}&limit=50&filter=${filter}`)
      .then((res) => {
        (setPeople(res.data.data),
          setTotalPages(res.data.totalPages),
          setHasmore(res.data.hasMore),
          setUnique(res.data.unique));
      });
  }, [id, page, filter]);
  return (
    <div>
      <h3 className="text-2xl font-bold">All Registerant</h3>
      <div className="mt-5 text-right">
        <select
          className="border rounded-2xl"
          onChange={(e) => {
            (setFilter(e.target.value), setPage(1));
          }}
          defaultValue={""}
        >
          <option value={""}>All</option>
          {unique.map((p, i) => (
            <option value={p} key={i}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5 w-full touch-auto overflow-auto sm:block">
        {people.length > 0 ? (
          <table className="table-auto w-5xl">
            <thead>
              <tr className="border border-gray-300">
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {people.map((pupil) => (
                <tr key={pupil._id} className="p-2 border border-gray-300">
                  <td>{pupil.fullname}</td>
                  <td>{pupil.email}</td>
                  <td>{pupil.event}</td>
                  <td>{pupil.branch}</td>
                  <td>{pupil.phone}</td>
                  <td>{new Date(pupil.createdAt).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Registerant</p>
        )}
      </div>
      <div className="flex gap-5 mt-5">
        <button
          className={page == 1 ? "hidden" : ""}
          onClick={() => {
            if (page == 1) {
              setPage(page);
            } else {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className={hasMore === true ? "" : "hidden"}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap space-x-1 gap-y-1">
        {arr.map((a, i) => (
          <button
            className={a == page ? "border-2 border-blue-900" : "border"}
            onClick={() => setPage(a)}
            key={i}
          >
            {a}
          </button>
        ))}
      </div>
      <Link className="mt-5 block" to={`/${id}/dashboard`}>
        Back
      </Link>
    </div>
  );
};

export default All;
