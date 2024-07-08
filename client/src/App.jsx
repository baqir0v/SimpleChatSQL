import { Route, Routes } from "react-router-dom"
import Message from "./pages/Message"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import Register from "./pages/Signup"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/chat/:id" element={<Message/>} />
      </Routes>
    </>
  )
}

export default App
