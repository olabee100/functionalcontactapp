import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './Components/Contacts/Contacts';
import AddContact from './Components/Contacts/AddContact';
import EditContact from './Components/Contacts/EditContact';
import Header from './Components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from './context';

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header branding="Contacts Manager1" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/contact/add" element={<AddContact />} />
              <Route path="/contact/edit/:id" element={<EditContact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
