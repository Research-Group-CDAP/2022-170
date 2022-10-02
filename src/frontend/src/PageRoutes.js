import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Containers, Home, Matrics, Pods } from "./pages";

const PageRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matrics" element={<Matrics />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/containers" element={<Containers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
