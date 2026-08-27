function Categories({ categories, selectedCategory, setSelectedCategory }) {
    const categoryList = categories && categories.length ? categories : ["All"];

    return(
        <div className="responsiveM">
            {
                categoryList.map((category)=>
                <button
                    key={category}
                    onClick={()=>setSelectedCategory(category)}
                    className={`categoryButton lowercase text-sm tracking-wider shadow-xs
                        ${
                            selectedCategory === category 
                            ? 'bg-green-900 text-white shadow-green-950'
                            : 'border-gray-300 border bg-white/70 hover:shadow-gray-300 hover:border-gray-400'
                        }
                    `}
                >
                    {category}
                </button>
                )
            }
        </div>
    )
}

export default Categories;