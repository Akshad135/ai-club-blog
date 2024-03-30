import Home from "./Components/Elements/Home";
import Headers from "./Components/Elements/Headers";
import Login from "./Components/Elements/Login";
import Dashboard from "./Components/Elements/Dashboard";
import CreateBlog from "./Components/Elements/CreateBlog"; // Import CreateBlog component
import Error from "./Components/Error";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateBlog />} />{" "}
        {/* Add route for CreateBlog */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
