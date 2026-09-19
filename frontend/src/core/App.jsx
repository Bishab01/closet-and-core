import Header from "../components/header"
import {Outlet} from "react-router-dom"
import { SearchContext } from "../context/SearchContext";
import { useState } from "react";

function App(){
    const [searchTerm, setSearchTerm] = useState("");
    
    return(
        <div className="mainBg">
            <div className="flex flex-col h-full">
                <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
                    <Header/>
                    <Outlet/>
                </SearchContext.Provider>
            </div>
        </div>
    )
}

export default App