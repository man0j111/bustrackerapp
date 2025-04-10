import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PassengerMap from "./components/PassengerMap";
import DriverMap from "./components/DriverMap";
import SignUp from "./components/signup";

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/passenger" element={<PassengerMap />} />
        <Route path="/driver" element={<DriverMap />} />
      </Routes>
    // </Router>
  );
}

export default App;
