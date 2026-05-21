import { useEffect, useState } from "react";
import { api } from "../service/axios";
import { useDebouncedCallback } from "use-debounce";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState();
  const debounced = useDebouncedCallback(
    (value) => {
      setQuery(value);
    },

    300,
  );

  useEffect(() => {
    api.get(`search?query=${query}`).then((res) => setQueryResult(res.data));
  }, [query]);
  return (
    <div>
      <div>
        <input
          type="search"
          className="w-full"
          onChange={(e) => debounced(e.target.value, 1000)}
        />
      </div>
      <div className="touch-auto overflow-auto ">
        {queryResult ? (
          <table className="table-auto">
            <tbody>
              <tr className="p-2 flex flex-wrap gap-x-5">
                <td>{queryResult.fullname}</td>

                <td>{queryResult.email}</td>
                <td>{queryResult.event}</td>
                <td>{queryResult.branch}</td>
                <td>{queryResult.phone}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{queryResult?.text}</p>
        )}
      </div>
    </div>
  );
};
