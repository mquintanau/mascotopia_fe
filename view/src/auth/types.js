const AuthResponse = {
    body: {
        user: {},  //Se guarda el usuario en el estado de autenticación
        accesToken: '',  //Se inicializa el estado del token de acceso en nulo
        refreshToken: ''  //Se inicializa el estado del token de refresco en nulo
    }
}

export default AuthResponse;