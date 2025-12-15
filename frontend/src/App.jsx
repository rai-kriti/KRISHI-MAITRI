import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ChatbotPage from "./pages/ChatbotPage";
import MSPPage from "./pages/MSPPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* 🔒 Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

       <Route
  path="/chatbot"
  element={
    <ProtectedRoute requireDashboardEntry={true}>
      <ChatbotPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/msp"
  element={
    <ProtectedRoute requireDashboardEntry={true}>
      <MSPPage />
    </ProtectedRoute>
  }
/>

    </BrowserRouter>
  );
}
