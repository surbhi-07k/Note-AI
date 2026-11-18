import { Routes, Route } from "react-router-dom";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
    return (
        <>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <Notes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes/:id"
                    element={
                        <ProtectedRoute>
                            <NoteDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
};

export default App;