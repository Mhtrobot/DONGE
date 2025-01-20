import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import MakeGroup from "./Pages/MakeGroup";
import EditGroup from "./Pages/EditGroup";
import Profile from "./Pages/Profile";
import AddCost from "./Pages/AddCost";
import GroupPage from "./Pages/GroupPage";
import AddName from "./Pages/AddName";
import EditName from "./Pages/EditName";
import AddCard from "./Pages/addCard";
import Reports from "./Pages/Reports";
import Notifications from "./Pages/Notifications";

import LoginAdmin from "./Admin/LoginAdmin";
import AdminPage from "./Admin/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/MakeGroup" element={<MakeGroup />} />
          <Route path="/EditGroup" element={<EditGroup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AddCost" element={<AddCost />} />
          <Route path="/GroupPage" element={<GroupPage />} />
          <Route path="/AddName" element={<AddName />} />
          <Route path="/EditName" element={<EditName />} />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Reports" element={<Reports />} />

          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
