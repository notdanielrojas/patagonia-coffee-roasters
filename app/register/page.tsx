import React, { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const registerUser = async (user: { name: string; last_name: string; email: string; password: string }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error creando usuario");
      }
      console.log("Usuario registrado:", data);
    } catch (error: any) {
      console.error("Error registrando el usuario:", error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Name'
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type='text'
        placeholder='Last Name'
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <input
        type='email'
        placeholder='Email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type='password'
        placeholder='Password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button type='submit'>Register</button>
    </form>
  );
}
