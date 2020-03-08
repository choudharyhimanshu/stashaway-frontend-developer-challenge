import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Form, Icon, Input } from 'semantic-ui-react';

import { ISearchRequest } from '../models/SearchRequest';
import { IRootReducerState } from '../store/configureStore';
import { ISearchAction, fetchItems } from '../actions/search.action';

export interface ISearchFormProps {
    isSearching: boolean;
    handleSearch: (searchRequest: ISearchRequest) => void;
}

function SearchForm(props: ISearchFormProps) {
    const { isSearching } = props;

    const [name, setName] = React.useState('');

    const handleFormSubmit = () => {
        props.handleSearch({ name });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Field inline width={4}>
                    <Input
                        label="Name"
                        placeholder="Enter name to search.."
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Form.Field>
                <Form.Button disabled={isSearching} className="sm-mt-1">
                    <Icon name="search" />
                    Search
                </Form.Button>
            </Form.Group>
        </Form>
    );
}

const mapStateToProps = (state: IRootReducerState) => {
    return {
        isSearching: state.search.isLoading
    };
};

const mapDispatcherToProps = (
    dispatch: ThunkDispatch<IRootReducerState, {}, ISearchAction>
) => {
    return {
        handleSearch: dispatch(fetchItems)
    };
};

export default connect(mapStateToProps, mapDispatcherToProps)(SearchForm);
