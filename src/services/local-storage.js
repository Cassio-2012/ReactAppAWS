export default class LocalStorageService {

    static putItem(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static getItem(chave) {
        const item = localStorage.getItem(chave);
        return JSON.parse(item);
    }

    static removeItem(chave) {
        localStorage.removeItem(chave);
    }

    static removeAll() {
        localStorage.removeItem('usuario_atual');
        localStorage.removeItem('_darkmode');
    }    

}