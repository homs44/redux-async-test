import axios from 'axios';

export function getArticleListAPI() {
    return axios.get('https://us-central1-react-board-99650.cloudfunctions.net/articles')
        .then((response) => {
            return response.data;
        })
}

export function deleteArticleAPI(id) {
    return Promise.resolve('delete').then(() => {
        return id
    })
}