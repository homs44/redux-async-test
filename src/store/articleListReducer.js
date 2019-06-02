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
        default:
            return state;
    }
}
