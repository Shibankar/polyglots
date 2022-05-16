import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Admin from './components/admin/Admin';
import User from './components/user/User';

function App() {
    return (
        <main>
            <BrowserRouter>
            <Routes>
                <Route path="" element={<User />} exact />
                <Route path="/admin" element={<Admin/>} />
            </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App;
