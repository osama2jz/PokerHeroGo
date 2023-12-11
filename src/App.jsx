import "./App.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import CustomAppShell from "./components/layout/app-shell";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Drop from "./pages/Drop";
import Live from "./pages/Live";
import Claimed from "./pages/Claimed";
import Users from "./pages/Users";
import OfferTypes from "./pages/Offers";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Coupons from "./pages/Coupons";
import Signin from "./pages/Siginin";
import Company from "./pages/Companies";
import ViewDrops from "./pages/Drop/ViewDrops";
import Scheduled from "./pages/Scheduled";
import Requests from "./pages/Requests";
import DropHistory from "./pages/DropHistory";
import DropRequests from "./pages/DropRequests";
import Tutorials from "./pages/Tutorials";
import Advertisements from "./pages/Advertisement";
import SocialMediaLinks from "./pages/SocialMediaLinks";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<CustomAppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-drop" element={<Drop />} />
            <Route path="/drop" element={<ViewDrops />} />
            <Route path="/scheduled" element={<Scheduled />} />
            <Route path="/live" element={<Live />} />
            <Route path="/drop-history" element={<DropHistory />} />
            <Route path="/drop-requests" element={<DropRequests />} />
            <Route path="/claimed" element={<Claimed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Company />} />
            <Route path="/offers" element={<OfferTypes />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/advertisements" element={<Advertisements />} /> 
            <Route path="/social-media-links" element={<SocialMediaLinks />} /> 
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
