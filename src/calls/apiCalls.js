import axios from 'axios'

const httpBase = axios.create({
    baseURL: 'https://springbootappjdit.azurewebsites.net'
})

class ApiCalls {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    

    post(url, objeto){
        const defaultUrl = `${this.apiurl}${url}`
        return httpBase.post(defaultUrl, objeto);
    }

    put(url, objeto){
        const defaultUrl = `${this.apiurl}${url}`
        return httpBase.put(defaultUrl, objeto);
    }

    delete(url){
        const defaultUrl = `${this.apiurl}${url}`
        return httpBase.delete(defaultUrl);
    }

    get(url){
        const defaultUrl = `${this.apiurl}${url}`
        return httpBase.get(defaultUrl);
    }

}

export default ApiCalls