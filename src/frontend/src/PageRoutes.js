import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Matrics, Pods } from "./pages";

const PageRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matrics" element={<Matrics />} />
          <Route path="/pods" element={<Pods />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
