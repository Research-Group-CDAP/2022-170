import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Matrics, Pods } from "./pages";

const PageRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/matrics" element={<Matrics />} />
          <Route path="/pods" element={<Pods />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageRoutes;
