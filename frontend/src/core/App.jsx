import Header from "../homepage/head/header"
import {Outlet} from "react-router-dom"

function Homepage(){
    return(
        <div className="mainBg">
            <div className="flex flex-col h-full">
                <Header/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Homepage