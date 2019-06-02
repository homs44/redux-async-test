import axios from 'axios';

const GET_ARTICLE_LIST_REQUEST = 'GET_ARTICLE_LIST_REQUEST';
const GET_ARTICLE_LIST_SUCCESS = 'GET_ARTICLE_LIST_SUCCESS';
const GET_ARTICLE_LIST_FAILED = 'GET_ARTICLE_LIST_FAILED';

function getArticleListRequest() {
    return {
        type: GET_ARTICLE_LIST_REQUEST,
        payload: null,
    }
}
function getArticleListSuccess(data) {
    return {
        type: GET_ARTICLE_LIST_SUCCESS,
        payload: {
            data: data
        },
    }
}
function getArticleListFailed(error) {
    return {
        type: GET_ARTICLE_LIST_FAILED,
        payload: {
            error: error
        },
    }
}

export function getArticleList() {
    return (dispatch) => {
        dispatch(getArticleListRequest())
        axios.get('https://us-central1-react-board-99650.cloudfunctions.net/articles')
            .then((response) => {
                return response.data;
            }).then((data) => {
                dispatch(getArticleListSuccess(data));
            }).catch((error) => {
                console.log(error);
                dispatch(getArticleListFailed(new Error('get article list failed')))
            })
    }
}


//delete
const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
const DELETE_ARTICLE_FAILED = 'DELETE_ARTICLE_FAILED';

function deleteArticleRequest() {
    return {
        type: DELETE_ARTICLE_REQUEST,
        payload: null,
    }
}
function deleteArticleSuccess(deletedId) {
    return {
        type: DELETE_ARTICLE_SUCCESS,
        payload: {
            deletedId: deletedId
        },
    }
}
function deleteArticleFailed(error) {
    return {
        type: DELETE_ARTICLE_FAILED,
        payload: {
            error: error
        },
    }
}

export function deleteArticle(id) {
    return (dispatch) => {
        dispatch(deleteArticleRequest())
        Promise.resolve('delete')
            .then((result) => {
                // result === 'delete'
                dispatch(deleteArticleSuccess(id))
            })
            .catch((error) => {
                dispatch(deleteArticleFailed(new Error('delete article failed')))
            })
    }
}
//update

//add

export default function articleListReducer(state = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    list: [],
    erorr: null,
}, { type, payload }) {
    switch (type) {
        case GET_ARTICLE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_ARTICLE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: [...payload.data]
            })
        case GET_ARTICLE_LIST_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: payload.error
            })
        case DELETE_ARTICLE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case DELETE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case DELETE_ARTICLE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: payload.error
            })
        default:
            return state;
    }
}
