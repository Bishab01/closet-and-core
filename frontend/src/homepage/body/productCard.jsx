function Productcard(){
    return(
        <div className="flex flex-col rounded-2xl border-black border-2 hover:shadow-xl w-70 h-120">
            <div className="h-[50%] border-b-2 w-full overflow-hidden">
                <img 
                    alt="image here" 
                    className="hover:scale-105 object-contain"
                />
            </div>

        </div>
    )
}

export default Productcard