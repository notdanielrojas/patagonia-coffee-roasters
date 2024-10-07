"use client";

/* import { getCoffee } from "../api/coffeeAPI"; */

const getCoffee = async (id: number): Promise<any> => {
  const res = await fetch(`https://fake-coffee-api.vercel.app/api/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log("hola soy el" + data);
  return data;
};

export const Hola = () => {
  const consola = async () => {
    console.log("cualquier cosa");
    await getCoffee(1);
  };

  return (
    <>
      <div>Hola</div>
      <button onClick={()=> {getCoffee(1)}}>Prueba</button>
    </>
  );
}
