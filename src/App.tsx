import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegistrationPage from "./pages/RegistrationPage"
import EventPage from "./pages/EventPage"
import CreateEventPage from "./pages/CreateEventPage"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"

const App  = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/events/:id" element={<EventPage/>} />
        <Route path="/events/new" element={<CreateEventPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App