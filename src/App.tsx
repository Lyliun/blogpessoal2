import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/home";
import Navbar from "./components/navbar/Navbar";
import DeletarPostagem from "./components/postagem/deletarpostagem/DeletarPostagem";
import DeletarTema from "./components/tema/deletartema/DeletarTema"
import FormTema from "./components/tema/formatema/FormTema"
import ListaTema from "./components/tema/listatemas/ListaTemas"
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/footer/Footer"; 
import Cadastro from "./components/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListaPostagens from "./components/postagem/listapostagens/ListaPostagem";
import FormPostagem from "./components/postagem/formpostagem/FormPostagem";
import Perfil from "./pages/perfil/Perfil";
import { ToastContainer } from "react-toastify/unstyled";

function App() {
  return (
    <>
    <AuthProvider>
      <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/temas" element={<ListaTema />} />
          <Route path="/cadastrarTema" element={<FormTema />} />
          <Route path="/editarTema/:id" element={<FormTema />} />
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastrarPostagem" element={<FormPostagem />} />
          <Route path="/editarPostagem/:id" element={<FormPostagem />} />
          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;