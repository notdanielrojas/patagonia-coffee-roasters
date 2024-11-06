// Habilita el modo "cliente" en Next.js, necesario para componentes que dependen de funciones específicas del cliente.
"use client";

// Importa las dependencias necesarias de React.
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define una interfaz para representar un usuario.
interface User {
  id: number; // Identificador único del usuario.
  email: string; // Correo electrónico del usuario.
}

// Define una interfaz para el contexto de usuario, que contiene el usuario actual y una función para actualizarlo.
interface UserContextType {
  user: User | null; // Estado del usuario, puede ser un usuario o null si no hay sesión activa.
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Función para actualizar el estado del usuario.
}

// Crea un contexto para el usuario, inicializándolo como null.
const UserContext = createContext<UserContextType | null>(null);

// Define el proveedor del contexto de usuario, que permite que los componentes hijos accedan al usuario actual.
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Crea el estado del usuario usando useState, inicializado como null.
  const [user, setUser] = useState<User | null>(null);

  // useEffect se ejecuta una vez al montar el componente para verificar si hay un token en localStorage.
  useEffect(() => {
    // Obtiene el token de localStorage.
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Extrae y decodifica la parte del payload del token.
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        // Convierte el payload decodificado en un objeto JSON.
        const userInfo = JSON.parse(decodedPayload);

        // Si el objeto contiene los datos de usuario necesarios, actualiza el estado del usuario.
        if (userInfo && userInfo.id && userInfo.email) {
          setUser(userInfo);
        } else {
          // Lanza un error si la información de usuario no es válida.
          throw new Error("Invalid user information");
        }
      } catch (error) {
        // Muestra un mensaje de error si hay un problema al decodificar el token y establece el usuario como null.
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente.

  // Retorna el proveedor del contexto, permitiendo que los componentes hijos accedan al usuario y a la función para actualizarlo.
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Define un hook personalizado para acceder al contexto de usuario.
export const useUser = () => {
  // Usa useContext para obtener el contexto de usuario.
  const context = useContext(UserContext);
  if (!context) {
    // Lanza un error si el hook se usa fuera de un UserProvider.
    throw new Error("useUser must be used within a UserProvider");
  }
  // Retorna el contexto si está disponible.
  return context;
};
