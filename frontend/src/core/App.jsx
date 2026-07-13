import Header from "../homepage/head/header"
import Home from "../homepage/body/home"

function Homepage(){
    return(
        <div className="mainBg">
            <div className="flex flex-col h-full">
                <Header/>
                <Home/>
            </div>
        </div>
    )
}

export default Homepage