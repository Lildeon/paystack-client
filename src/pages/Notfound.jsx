// pages/Success.jsx
import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <div>
      <h1> Page Not found</h1>
      <Link to="/" className="text-2xl">
        Go back
      </Link>
    </div>
  );
}
