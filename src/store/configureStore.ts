import {
    createStore,
    applyMiddleware,
    combineReducers,
    Middleware
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import searchReducer, { ISearchReducerState } from '../reducers/search.reducer';

export interface IRootReducerState {
    search: ISearchReducerState;
}

const middlewares: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
        createLogger({
            collapsed: true
        })
    );
}

const store = createStore(
    combineReducers<IRootReducerState>({
        search: searchReducer
    }),
    applyMiddleware(...middlewares)
);

export default store;
