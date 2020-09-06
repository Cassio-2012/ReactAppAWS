import ApiCalls from './apiCalls'

class PostCalls extends ApiCalls{

    constructor() {
        super('/post')
    }

    postar(body) {
        return this.post('/new', body)
    }

    autenticar(credentials) {
        return this.get('/load',);
    }


}
export default PostCalls