import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//função que mapeia se a autenticação do usuário foi feita com sucesso
import { onAuthStateChanged } from "firebase/auth";

//hooks 
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication"; //importando o hoook de autenticação

//contexto

import { AuthProvider } from "./context/AuthContext";

//Páginas
import Home from "./pages/Home/Home";
import Abount from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";




function App() {

  const [user, setUser] = useState(undefined);

  const { auth } = useAuthentication();


  const loadingUser = user === undefined

  //função que realiza a captura do usuário caso tenha feito o login corretamente, esse user pode ser usado como contexto no projeto todo!
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }



  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Abount />} />
              <Route path="/search" element={<Search/>} />
              <Route path="/posts/:id" element={<Post/>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

            </Routes>
          </div>

          <Footer />

        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
