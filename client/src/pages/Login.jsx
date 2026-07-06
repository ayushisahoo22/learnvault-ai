import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleLogin=(e)=>{
        e.preventDefault();
        localStorage.setItem(
            "token",
            "dummyToken"
        );
        const user=JSON.parse(
            localStorage.getItem("user")
        );
        navigate("/");
    }
    return(
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">
                <h2 className="flex justify-center text-3xl text-white mb-6">Welcome Back</h2>
                 <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4"
                >

                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="p-3 rounded-lg bg-slate-800 text-white"
                    />

                    <button
                    className="bg-purple-600 p-3 rounded-lg text-white hover:bg-purple-700"
                    >
                        Login
                    </button>
                    <p
                    className="text-gray-400 mt-4 cursor-pointer"
                    onClick={()=>navigate("/register")}
                    >
                        Create account
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;