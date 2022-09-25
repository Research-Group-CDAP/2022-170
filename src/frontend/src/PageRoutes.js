import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Matrics, Pods , Registration } from "./pages";

const PageRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matrics" element={<Matrics />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/registration" element={<Registration />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
