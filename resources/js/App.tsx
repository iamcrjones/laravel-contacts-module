import "./bootstrap";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contacts from "./pages/Contacts/Contacts";

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <header className="bg-white shadow-sm p-4">
                    <nav className="container mx-auto flex justify-between items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold text-blue-600"
                        >
                            CRM App
                        </Link>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    to="/contacts"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Contacts
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/contacts" element={<Contacts />} />

                        {/* TODO: Add Not Found Page */}
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                    </Routes>
                </main>

                <footer className="bg-white shadow-sm p-4 text-center text-gray-500 text-sm mt-8">
                    <p>
                        &copy; {new Date().getFullYear()} Cameron Jones. All
                        rights reserved.
                    </p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
