import ApiCalls from './apiCalls'

class UsuarioCalls extends ApiCalls{

    constructor() {
        super('/user')
    }

    cadastrar(usuario) {
        return this.post('/cadastro', usuario)
    }

    autenticar(credentials) {
        return this.post('/login', credentials);
    }

    sair() {
        return this.get('/logoff')
    }

}
export default UsuarioCalls