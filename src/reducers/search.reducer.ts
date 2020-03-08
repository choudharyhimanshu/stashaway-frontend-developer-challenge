import { ISearchItem } from '../models/SearchItem';
import { ISearchAction, ESearchActionType } from '../actions/search.action';

export interface ISearchReducerState {
    isLoading: boolean;
    results?: ISearchItem[];
    errorMessage?: string;
}

const defaultState: ISearchReducerState = {
    isLoading: false
};

function SearchReducer(
    state: ISearchReducerState = defaultState,
    action: ISearchAction
) {
    switch (action.type) {
        case ESearchActionType.FETCHING:
            return {
                isLoading: true,
                results: undefined,
                errorMessage: ''
            };
        case ESearchActionType.SUCCESS:
            return {
                isLoading: false,
                results: action.data.searchResults,
                errorMessage: ''
            };
        case ESearchActionType.ERROR:
            return {
                isLoading: false,
                results: undefined,
                errorMessage: action.data.errorMessage
            };
        default:
            return state;
    }
}

export default SearchReducer;
