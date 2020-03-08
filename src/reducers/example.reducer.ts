import { IExampleAction, EExampleActionType } from '../actions/example.action';

export interface IExampleReducerState {
    counter: number;
}

const defaultState = { counter: 0 };

function ExampleReducer(
    state: IExampleReducerState = defaultState,
    action: IExampleAction
) {
    if (action.data) {
        switch (action.type) {
            case EExampleActionType.INCREMENT:
                return {
                    ...state,
                    counter: state.counter + action.data.changeBy
                };
            case EExampleActionType.DECREMENT:
                return {
                    ...state,
                    counter: state.counter - action.data.changeBy
                };
            default:
                return state;
        }
    } else {
        return state;
    }
}

export default ExampleReducer;
