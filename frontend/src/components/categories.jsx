import { useCategories } from "../hooks/useCategories";

function Categories({ selectedCategory, setSelectedCategory, products }) {
    const { categories } = useCategories();
    const categoryList = categories.filter(category =>
        products.some(product => product.cat_id === category.cat_id)
    );

    return(
        <div className="responsiveM">
            <button
                onClick={()=>setSelectedCategory("all")}
                className={`categoryButton lowercase text-sm tracking-wider shadow-xs
                    ${
                        selectedCategory === "all"
                        ? 'bg-green-900 text-white shadow-green-950'
                        : 'border-gray-300 border bg-white/70 hover:shadow-gray-300 hover:border-gray-400'
                    }
                `}
            >
                all
            </button>
            {
                categoryList.map((category)=>
                <button
                    key={category.cat_id}
                    onClick={()=>setSelectedCategory(category.cat_name)}
                    className={`categoryButton lowercase text-sm tracking-wider shadow-xs
                        ${
                            selectedCategory === category.cat_name 
                            ? 'bg-green-900 text-white shadow-green-950'
                            : 'border-gray-300 border bg-white/70 hover:shadow-gray-300 hover:border-gray-400'
                        }
                    `}
                >
                    {category.cat_name}
                </button>
                )
            }
        </div>
    )
}

export default Categories;