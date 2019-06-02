import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// store를 생성하는 함수를 정의

export function configureStore() {

    // 사용할 미들웨어 추가
    const middleware = applyMiddleware(thunk);

    // 리덕스 DevTool이 있을 경우 compose 사용
    // 없을 경우 그냥 middleware만 추가
    const composed = window.__REDUX_DEVTOOLS_EXTENSION__ ?
        compose(
            middleware,
            window.__REDUX_DEVTOOLS_EXTENSION__()
        ) :
        middleware

    return createStore(combineReducers({

    }), composed)

}