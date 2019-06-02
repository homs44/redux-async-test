import axios from 'axios';
import { createAction, handleActions } from 'redux-actions'

const GET_ARTICLE_LIST_REQUEST = 'GET_ARTICLE_LIST_REQUEST';
const GET_ARTICLE_LIST_SUCCESS = 'GET_ARTICLE_LIST_SUCCESS';
const GET_ARTICLE_LIST_FAILED = 'GET_ARTICLE_LIST_FAILED';

const getArticleListRequest = createAction(GET_ARTICLE_LIST_REQUEST);
const getArticleListSuccess = createAction(GET_ARTICLE_LIST_SUCCESS);
const getArticleListFailed = createAction(GET_ARTICLE_LIST_FAILED);

export function getArticleList() {
    return (dispatch) => {
        dispatch(getArticleListRequest())
        axios.get('https://us-central1-react-board-99650.cloudfunctions.net/articles')
            .then((response) => {
                return response.data;
            }).then((data) => {
                dispatch(getArticleListSuccess({ data: data }));
            }).catch((error) => {
                console.log(error);
                dispatch(getArticleListFailed({ error: new Error('get article list failed') }))
            })
    }
}

//delete
const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
const DELETE_ARTICLE_FAILED = 'DELETE_ARTICLE_FAILED';

const deleteArticleRequest = createAction(DELETE_ARTICLE_REQUEST);
const deleteArticleSuccess = createAction(DELETE_ARTICLE_SUCCESS);
const deleteArticleFailed = createAction(DELETE_ARTICLE_FAILED);

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


const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    list: [],
    error: null,
}

export default handleActions({
    GET_ARTICLE_LIST_REQUEST: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: true,
            isSuccess: false,
            isFailed: false,
        })
    },
    GET_ARTICLE_LIST_SUCCESS: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess: true,
            isFailed: false,
            list: [...payload.data]
        })
    },
    GET_ARTICLE_LIST_FAILED: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess: false,
            isFailed: true,
            error: payload.error
        })
    },
    DELETE_ARTICLE_REQUEST: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: true,
            isSuccess: false,
            isFailed: false,
        })
    },
    DELETE_ARTICLE_SUCCESS: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess: true,
            isFailed: false,
        })
    },
    DELETE_ARTICLE_FAILED: (state, { payload }) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess: false,
            isFailed: true,
            error: payload.error
        })
    }
}, initialState)

// export default function articleListReducer(state = initialState, { type, payload }) {
//     switch (type) {
//         case GET_ARTICLE_LIST_REQUEST:
//             return Object.assign({}, state, {
//                 isLoading: true,
//                 isSuccess: false,
//                 isFailed: false,
//             })
//         case GET_ARTICLE_LIST_SUCCESS:
//             return Object.assign({}, state, {
//                 isLoading: false,
//                 isSuccess: true,
//                 isFailed: false,
//                 list: [...payload.data]
//             })
//         case GET_ARTICLE_LIST_FAILED:
//             return Object.assign({}, state, {
//                 isLoading: false,
//                 isSuccess: false,
//                 isFailed: true,
//                 error: payload.error
//             })
//         case DELETE_ARTICLE_REQUEST:
//             return Object.assign({}, state, {
//                 isLoading: true,
//                 isSuccess: false,
//                 isFailed: false,
//             })
//         case DELETE_ARTICLE_SUCCESS:
//             return Object.assign({}, state, {
//                 isLoading: false,
//                 isSuccess: true,
//                 isFailed: false,
//             })
//         case DELETE_ARTICLE_FAILED:
//             return Object.assign({}, state, {
//                 isLoading: false,
//                 isSuccess: false,
//                 isFailed: true,
//                 error: payload.error
//             })
//         default:
//             return state;
//     }
// }
