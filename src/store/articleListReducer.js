
import { createAction, handleActions } from 'redux-actions'
import * as ActionTypes from './actionTypes'
import { pender } from 'redux-pender'
import * as ArticleServiceAPI from '../infra/api/ArticleServiceAPI'

export const getArticleList = createAction(ActionTypes.GET_ARTICLE_LIST, ArticleServiceAPI.getArticleListAPI);
export const deleteArticle = createAction(ActionTypes.DELETE_ARTICLE, ArticleServiceAPI.deleteArticleAPI);

const initialState = {
    list: [],
    error: null,
}
export default handleActions({
    ...pender({
        type: ActionTypes.GET_ARTICLE_LIST,
        // onPending: (state, {payload})=>{
        //     return state;
        // },
        onSuccess: (state, { payload }) => {
            return Object.assign({}, state, {
                list: payload,
            })
        },
        onFailure: (state, { payload }) => {
            return Object.assign({}, state, {
                error: payload,
            })
        }
    }),
    ...pender({
        type: ActionTypes.DELETE_ARTICLE,
    })
}, initialState)
