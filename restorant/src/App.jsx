import './App.css'
import {BrowserRouter, Routes,Route} from "react-router";
import OfficialWeb from "./components/OfficialWeb/OfficialWeb.jsx";
import Table from "./components/table/Table1.jsx";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OfficialWeb/>}/>
                <Route path="table/1" element={<Table/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;


