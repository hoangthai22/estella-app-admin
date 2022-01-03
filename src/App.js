import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import ModalDisalbe from "./components/Modal/ModalDisalbe";
import HomePage from "./pages/HomePage";
import 'antd/dist/antd.css'; 

function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
        </Routes>
      
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
