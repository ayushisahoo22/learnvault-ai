import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Register(){
    const navigate=useNavigate();
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    });
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
     const handleRegister=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                {
                    name: form.name,
                    email: form.email,
                    password: form.password
                }
            );

            alert(response.data.message);
            navigate("/login");
        }catch (error) {
            console.log(error);
            console.log(error.response);
            alert(
                error.response?.data?.message || "Registration Failed"
            );
        }
    }
    return(
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">
                <h2 className=" flex justify-center text-3xl text-white mb-6">
                    Create Account
                </h2>
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                    >

                    <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <button
                    className="bg-purple-600 p-3 rounded-lg text-white"
                    >
                        Register
                    </button>
                </form>
                <p
                className="text-gray-400 mt-4 cursor-pointer"
                onClick={()=>navigate("/login")}
                >
                    Already have account? Login
                </p>
            </div>
        </div>
    )
}

export default Register;