import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Statistic } from 'semantic-ui-react';

import { IRootReducerState } from '../store/configureStore';
import { increaseCounter, IExampleAction } from '../actions/example.action';

export interface IExampleComponentProps {
    counter: number;
    handleCounterIncrement: (increaseBy: number) => void;
}

class ExampleComponent extends React.Component<IExampleComponentProps> {
    private counterSubscription: NodeJS.Timeout | undefined;

    componentDidMount() {
        this.counterSubscription = setInterval(() => {
            this.props.handleCounterIncrement(1);
        }, 2000);
    }

    componentWillUnmount() {
        if (this.counterSubscription) {
            clearInterval(this.counterSubscription);
        }
    }

    render() {
        const { counter } = this.props;

        return (
            <Statistic>
                <Statistic.Value>{counter}</Statistic.Value>
                <Statistic.Label>Counts</Statistic.Label>
            </Statistic>
        );
    }
}

const mapStateToProps = (state: IRootReducerState) => {
    return {
        counter: state.example.counter
    };
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<IRootReducerState, {}, IExampleAction>
) => {
    return {
        handleCounterIncrement: dispatch(increaseCounter)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);
