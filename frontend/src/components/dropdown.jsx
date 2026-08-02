function DropDown({items}){
    return(
        <select className="pl-2 pr-1 py-0.5">
            {items.map((item) => (
                <option 
                    key={item} 
                    value={item}
                >
                    {item}
                </option>
            ))}
        </select>
    )
}

export default DropDown;