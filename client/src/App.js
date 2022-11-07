import React, { useContext } from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { Routes, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { Context } from "./context/Context"

const App = () => {
  //after login
  const { user } = useContext(Context)
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter />} />
        <Route path="/post/:id" element={<DetailsPages />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
