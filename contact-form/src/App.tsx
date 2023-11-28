import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Error from "./Error";
import Login from "./Login";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import Test from "./Test";
import NavigationMenu from "./NavigationMenu";

function App() {
  const [contacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<NavigationMenu />} />
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
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
