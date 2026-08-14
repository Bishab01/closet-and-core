import tShirt from "../assets/images/t-shirt.JPG"
import hat from "../assets/images/hat.JPG"
import shoes from "../assets/images/shoes.JPG"

const cartItems = [
    {
        id: 1,
        category: "Clothing",
        productName: "Round Neck Cotton T-shirt",
        productPrice: 450,
        image: tShirt,
        quantity: 1,
        size: {id: 1, name: "S"},
        color: { id: 1, name: "Bone White", hex: "#f2efe9"},
    },
    {
        id: 2,
        category: "Headwear",
        productName: "C Embroidered Baseball Cap",
        productPrice: 561,
        image: hat,
        quantity: 1,
        size: {id: 1, name: "S"},
        color: { id: 1, name: "Charcoal Black", hex: "#1f2421" },
    },
    {
        id: 3,
        category: "Footwear",
        productName: " Sneakers",
        productPrice: 1299,
        image: shoes,
        quantity: 1,
        size: {id: 1, name: "S"},
        color: { id: 1, name: "Charcoal Black", hex: "#1f2421" },
    },
   
];

export default cartItems