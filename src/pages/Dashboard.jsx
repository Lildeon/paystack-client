import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../service/axios";
import { Search } from "../component/Search";
import BarAreaChart from "../component/BarAreaChart";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [people, setPeople] = useState([]);
  const [stats, setStats] = useState([]);
  const [total, setTotal] = useState(people.length);
  const [filter, setFilter] = useState("");
  const [unique, setUnique] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [hasMore, setHasmore] = useState();
  const disableNext = hasMore === true ? false : true;

  let n = 1;
  let arr = [];
  while (n <= totalPages) {
    arr.push(n);
    n++;
  }

  const { id } = useParams();

  useEffect(() => {
    api.get(`event/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  useEffect(() => {
    api
      .get(`people/${id}?page=${page}&limit=10&filter=${filter}`)
      .then((res) => {
        (setPeople(res.data.data),
          setTotalPages(res.data.totalPages),
          setHasmore(res.data.hasMore),
          setStats(res.data.stats),
          setTotal(res.data.totalDocument),
          setUnique(res.data.unique));
      });
  }, [id, page, filter]);

  return (
    <div className="h-full mx-5">
      <p className="text-lg min-[360px]:text-2xl font-bold">Dashboard</p>
      <div className="flex justify-between text-lg min-[360px]:text-2xl font-bold mt-5">
        <p>{data.name}</p>
        <p>{new Date(data.date).toDateString()}</p>
        <p>{data.location}</p>
      </div>

      <div className="flex mt-5 max-[400px]:flex-wrap gap-5">
        <div className="w-full">
          <Search />
        </div>

        <div className="">
          <select
            className="border rounded-2xl h-10 "
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
      </div>
      <div>
        <Link
          to={`/${id}/people`}
          className="text-lg min-[360px]:text-2xl font-bold hover:underline"
        >
          All Registerant
        </Link>
      </div>

      <div className="w-full flex flex-wrap gap-5 justify-between mt-10">
        <p id="event">People {total}</p>
        <p id="event">Paid</p>
        <p id="event">Pending</p>
        <p id="event">Branches {unique.length}</p>
      </div>
      <div className="mt-5 touch-auto overflow-auto w-full">
        <div className="w-5xl">
          <BarAreaChart data={stats} />
        </div>
      </div>

      <div className="mt-5 w-full touch-auto overflow-auto sm:block">
        {people.length > 0 ? (
          <table className="table-auto w-4xl">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Branch</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {people.map((pupil) => (
                <tr key={pupil._id} className="p-2">
                  <td>{pupil.fullname}</td>
                  <td>{pupil.email}</td>
                  <td>{pupil.event}</td>
                  <td>{pupil.branch}</td>
                  <td>{pupil.phone}</td>
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
          disabled={disableNext}
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
      <Link className="mt-5 block" to={"/admin"}>
        Back
      </Link>
    </div>
  );
};
export default Dashboard;
