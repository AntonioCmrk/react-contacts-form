import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Error from "./Error";
import Login from "./Login";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const [contacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<Home contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path="/contact-info"
            element={
              <ContactInfo contacts={contacts} setContacts={setContacts} />
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
