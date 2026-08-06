function OptionsAvailable({values, selectedValue, setSelectedValue}){
    return(
            <div className="absolute top-full left-0 mt-2 z-100 flex flex-col w-30 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                {
                    values.map((value)=>(
                        <button
                            key={value.id}
                            className={`p-3 text-sm
                                ${
                                    selectedValue.id === value.id
                                    ? "bg-green-900 text-white"
                                    : "bg-gray-50"
                                }`
                            }
                        >
                            {value.name}
                        </button>
                    ))
                }
            </div>
    )
}

export default OptionsAvailable;