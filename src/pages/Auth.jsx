import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Auth() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    fetch("http://localhost:5050/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // getSetCookie: "true",
        // Credentials: "include",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data?.token)
      localStorage.setItem("token", data?.token);
      navigate("/");
    }); 
  }

  function signup(e) {
    e.preventDefault();
    const userDetail = { name, username, email, password };
    fetch("http://localhost:5050/api/user", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        getSetCookie: "true",
      },
      body: JSON.stringify(userDetail),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.statusText, res.json());
      })
      .then((res) => {
        console.log("Sign Up Successfull :", res);
      })
      .catch((err, res) => {
        console.log("Sign Up Error :", err, res);
      });
    setIsLoginPage(true);
  }

  return (
    <div>
      <form
        className="min-w-96 w-min gap-4 flex flex-col border-gray-300 bg-white rounded-xl p-2 shadow-gray-400 shadow-lg"
        onSubmit={isLoginPage ? login : signup}
      >
        <div className="relative w-full flex">
          <h1 className="text-xl font-bold w-full text-center pt-2">
            {isLoginPage ? "Login" : "Sign Up"}
          </h1>
          <div
            className="bg-gray-200 px-2 py-1 flex justify-center items-center rounded-xl text-xs absolute right-0 top-0 cursor-pointer"
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            {isLoginPage ? "Sign Up" : "Login"}
          </div>
        </div>
        <div className="w-full flex flex-col">
          {isLoginPage ? null : (
            <input
              type="text"
              placeholder="Enter Full name"
              value={name}
              className="p-2 outline-slate-500 rounded-md mb-1"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 outline-slate-500 rounded-md mb-1"
          />
          {isLoginPage ? null : (
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 outline-slate-500 rounded-md mb-1"
            />
          )}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className = "p-2 outline-slate-500 rounded-md mb-1"
            />
        </div>
        <button className="bg-gray-200 rounded-xl p-2 mb-2 hover:bg-slate-100">
          {isLoginPage ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
