import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css";
import ComplaintForm from "./ComplaintForm";
import Practice from "./Practice";
function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <NavLink to="/">ComplaintForm</NavLink>
            </li>
            <li>
              <NavLink to="/practice">Formik Practice</NavLink>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<ComplaintForm />}></Route>
          <Route path="/practice" element={<Practice />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
