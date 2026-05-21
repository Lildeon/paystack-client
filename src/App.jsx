import { Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import Notound from "./pages/Notfound";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Layout from "./component/Layout";
import CreatEvent from "./pages/CreatEvent";
import Editevent from "./pages/Editevent";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./component/AdminLayout";
import All from "./pages/All";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<FormPage />} />
        <Route path="/" element={<Events />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/create-event" element={<CreatEvent />} />
        <Route path="/*" element={<Notound />} />
        <Route path="/:id/edit" element={<Editevent />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/:id/dashboard" element={<Dashboard />} />
        <Route path="/:id/people" element={<All />} />
      </Route>
    </Routes>
  );
}

export default App;
