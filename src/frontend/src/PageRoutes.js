import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Containers,
  Dependency,
  Home,
  Matrics,
  Overview,
  Pods,
  Services,
  Experiments,
  Predictions,
  UserInformation,
  UserLogin,
  Registration,
} from "./pages";

const PageRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matrics" element={<Matrics />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dependency" element={<Dependency />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/user" element={<UserInformation />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
