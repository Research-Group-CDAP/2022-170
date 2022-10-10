import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Containers, Home, Matrics, Overview, Pods, Services } from "./pages";
import Experiments from "./pages/Experiments";

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
          <Route path="/experiments" element={<Experiments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
