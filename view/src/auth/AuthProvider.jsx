import React, { useContext, createContext, useState, useEffect } from "react";
import AuthResponse from "./types";

//Este componente validará si hay auntentificación o no para
//dejar pasar a las rutas que estan protegidas y dejar verlas.

const AuthContest = createContext({
  //Se crea un contexto para saber si el usuario esta autenticado o no
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }) {
  //Este componente se encarga de proveer el contexto a los componentes hijos
  //para saber si el usuario esta autenticado o no y asi poder mostrar las rutas protegidas

  const [isAuthenticated, setIsAuthenticated] = useState(false); //Se inicializa el estado de autenticación en falso
  const [accessToken, setAccessToken] = useState(""); //Se inicializa el estado del token de acceso en nulo

  function getAccessToken() {
    //Se obtiene el token de acceso
    return accessToken; //Se retorna el token de acceso
  }

  function getRefreshToken() {
    //Se obtiene el token de refresco
    const token = localStorage.getItem("token"); //Se obtiene el token de refresco del local storage
    if (token) {
      //Si el token de refresco existe
      const { refreshToken } = JSON.parse(token); //Se obtiene el token de refresco
      return refreshToken; //Se retorna el token de refresco
    }
  }

  function saveUser(userData = AuthResponse) {
    //Se guarda el usuario en el estado de autenticación
    setAccessToken(userData.body.accesToken); //Se guarda el token de acceso en el estado de autenticación

    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken)); //Se guarda el token de refresco en el local storage
    setIsAuthenticated(true); //Se cambia el estado de autenticación a verdadero
  }

  return (
    <AuthContest.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContest.Provider>
  );
}

export const useAuth = () => useContext(AuthContest); //Este hook se encarga de retornar el contexto de autenticación
