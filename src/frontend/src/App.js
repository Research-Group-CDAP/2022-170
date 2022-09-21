import './styles/App.css'
import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-white">
          Artificial Intelligence Based Centralized Resource Management
          Applications for Distributed Systems
        </h1>
      </div>
      <div className="flex justify-center">
        <h3 className="text-2xl text-white">2022-170</h3>
      </div>
     <PageRoutes />
    </div>
  )
}

export default App
