import tShirt from "../assets/images/t-shirt.JPG"
import hat from "../assets/images/hat.JPG"
import shoes from "../assets/images/shoes.JPG"

const products = [
    {
        id: 1,
        category: "Clothing",
        productName: "Round Neck Cotton T-shirt",
        productPrice: 450,
        image: tShirt,
        description: "this is where the product description goes",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Charcoal Black", hex: "#1f2421" },
            { name: "Bone White", hex: "#f2efe9" },
            { name: "Olive Green", hex: "#4b5320" },
        ],
        stock: 20,
        material: "100% combed cotton, 180 GSM",
        care: "Machine wash cold, tumble dry low",
    },
    {
        id: 2,
        category: "Headwear",
        productName: "C Embroidered Baseball Cap",
        productPrice: 561,
        image: hat,
    },
    {
        id: 3,
        category: "Footwear",
        productName: " Sneakers",
        productPrice: 1299,
        image: shoes,
    },
    {
        id: 4,
        category: "Clothing",
        productName: "Round Neck Cotton T-shirt",
        productPrice: 450,
        image: tShirt,
    },
];

export default products