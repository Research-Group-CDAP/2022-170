import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Matrics} from "./pages";

const PageRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path="/matrics"
						element={<Matrics />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
