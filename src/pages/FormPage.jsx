// pages/FormPage.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toast";

import { api } from "../service/axios";

export default function FormPage() {
  const info = {
    event: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    branch: "",
    amount: "",
    provider: "",
  };
  // const provider = [
  //   { provider: "MTN", code: "mtn" },
  //   { provider: "Telecel (formerly Vodafone)", code: "vod" },
  //   { provider: "Airtel/Tigo", code: "airtel" },
  // ];

  const [data, setData] = useState(info);
  const [event, setEvent] = useState([]);

  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("pay", data);
    const text = !res.data.message ? "complete payment" : res.data.message;
    toast.success(`${text}`);
    const nothing = !res.data.message ? null : res.data.message;

    if (res.status === 201) toast.success(`${res.data.message}`);
    if (res.status === 200) toast.error(`${nothing}`);
    setData(info);

    if (res.data.paymentUrl) {
      window.location.href = res.data.paymentUrl;
    }
  };

  useEffect(() => {
    api.get("events").then((res) => setEvent(res.data));
  }, []);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          onChange={(e) => handleChange(e)}
          name="event"
          className="rounded-2xl border p-2"
          required
          defaultValue=""
        >
          <option value={""} disabled>
            Select event *
          </option>
          {event.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>

        <label>First Name *</label>

        <input
          type="text"
          name="first_name"
          placeholder="First name"
          value={data.first_name}
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Last Name *</label>

        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          value={data.last_name}
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Email *</label>

        <input
          type="text"
          name="email"
          placeholder="email "
          value={data.email}
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Phone *</label>

        <input
          type="text"
          name="phone"
          placeholder="Contact "
          value={data.phone}
          onChange={(e) => handleChange(e)}
          className="w-full"
          required
        />

        <label>Branch *</label>

        <input
          type="text"
          name="branch"
          placeholder="Branch name"
          value={data.branch}
          onChange={(e) => handleChange(e)}
          required
        />
        <p>
          For <strong>free event</strong>, live the following empty. Inputting a
          value will initialize transaction.
        </p>
        <label>Registration fee</label>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={data.amount}
          onChange={(e) => handleChange(e)}
        />

        {/* <select
          onChange={(e) => handleChange(e)}
          name="provider"
          className="rounded-2xl border p-2 mt-5"
        >
          <option>Select network </option>
          {provider.map((p, i) => (
            <option value={p.code} key={i}>
              {p.provider}
            </option>
          ))}
        </select> */}
        <button type="submit" className="border mt-5">
          Register
        </button>
      </form>
    </div>
  );
}
