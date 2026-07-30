import Header from "../components/header"
import {Outlet} from "react-router-dom"
import ProductDetail from "../pages/productDetail"

function App(){
    return(
        <div className="mainBg">
            <div className="flex flex-col h-full">
                {/* <Header/>
                <Outlet/> */}
                <ProductDetail/>
            </div>
        </div>
    )
}

export default App