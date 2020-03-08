import { Dispatch } from 'react';

export enum EExampleActionType {
    INCREMENT = 'EXAMPLE_INCREMENT',
    DECREMENT = 'EXAMPLE_DECREMENT',
    PROCESSING = 'EXAMPLE_PROCESSING'
}

export interface IExampleActionData {
    changeBy: number;
}

export interface IExampleAction {
    type: EExampleActionType;
    data?: IExampleActionData;
}

export const increaseCounter = (dispatch: Dispatch<IExampleAction>) => {
    return async (increaseBy: number) => {
        dispatch({ type: EExampleActionType.PROCESSING });
        setTimeout(
            () =>
                dispatch({
                    type: EExampleActionType.INCREMENT,
                    data: { changeBy: increaseBy }
                }),
            1000
        );
    };
};
