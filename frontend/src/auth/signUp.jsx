import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

    //object to hold form data
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const [msg,setMsg]=useState("");
    const [msgType, setMsgType] = useState(""); // success or error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;

    //copies the initial formData object and updated the field(name) with the new value
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        //prevents form submission by default and allows us to handle it with our own logic
        e.preventDefault();

        //basic form validation
        if (!formData.fname.trim()) {
            setMsg("First name is required.");
            setMsgType("error");
            return;
        }

        if (!formData.lname.trim()) {
            setMsg("Last name is required.");
            setMsgType("error");
            return;
        }

        if (!formData.email.trim()) {
            setMsg("Email is required.");
            setMsgType("error");
            return;
        }

        if (!formData.password.trim()) {
            setMsg("Password is required.");
            setMsgType("error");
            return;
        }

        if (!nameRegex.test(formData.fname)){
            setMsg("First name must contain only letters.");
            setMsgType("error");
            return;
        }

        if (!nameRegex.test(formData.lname)){
            setMsg("Last name must contain only letters.");
            setMsgType("error");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setMsg("Invalid email format.");
            setMsgType("error");
            return;
        }

        if (formData.password.length < 8) {
            setMsg("Password must be at least 8 characters.");
            setMsgType("error");
            return;
        }

        setMsg("");

        try 
        {
            const response = await fetch("http://localhost/onlineStore/backend/api/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setMsg(data.message);
                setMsgType("success");
            } 
            else {
                setMsg(data.message);
                setMsgType("error");
            }

            setFormData({
                fname: "",
                lname: "",
                email: "",
                password: ""
            });

        } 
        
        catch (error) {
            console.error(error);
            setMsg("Failed to connect to the server.");
            setMsgType("error");
        }
    };

    return (
        <div>
            <h1>Registration Form</h1>

            <form onSubmit={handleSubmit}>
                First Name:
                <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                /><br/>

                Last Name:
                <input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                /><br/>

                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                /><br/>

                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /><br/>

                {msg && 
                    <p className={`${msgType==='success'?"text-green-500":"text-red-500"}`}>
                        {msg}
                    </p>
                }

                <input type="submit" value="Register"/><br/>
            </form>

            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}

export default Signup;