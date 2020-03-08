import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Form, Icon, Input, Select, Button, Label } from 'semantic-ui-react';

import { ISearchRequest } from '../models/SearchRequest';
import { IRootReducerState } from '../store/configureStore';
import { ISearchAction, fetchItems } from '../actions/search.action';

const SELECT_YEARS = [
    { key: 'undefined', text: 'Select', value: '' },
    { key: '2012', text: '2012', value: '2012' },
    { key: '2013', text: '2013', value: '2013' },
    { key: '2014', text: '2014', value: '2014' },
    { key: '2015', text: '2015', value: '2015' },
    { key: '2016', text: '2016', value: '2016' },
    { key: '2017', text: '2017', value: '2017' },
    { key: '2018', text: '2018', value: '2018' },
    { key: '2019', text: '2019', value: '2019' }
];

const SELECT_COUNTRIES = [
    { key: 'undefined', text: 'Select', value: '' },
    { key: 'Myanmar', text: 'Myanmar', value: 'Myanmar' },
    { key: 'Singapore', text: 'Singapore', value: 'Singapore' },
    { key: 'SG', text: 'SG', value: 'SG' },
    { key: 'Taiwan', text: 'Taiwan', value: 'Taiwan' },
    { key: 'China', text: 'China', value: 'China' },
    { key: 'Malaysia', text: 'Malaysia', value: 'Malaysia' },
    { key: 'JPN', text: 'JPN', value: 'JPN' },
    { key: 'Thailand', text: 'Thailand', value: 'Thailand' },
    { key: 'Japan', text: 'Japan', value: 'Japan' },
    { key: 'South Korea', text: 'South Korea', value: 'South Korea' },
    { key: 'USA', text: 'USA', value: 'USA' },
    { key: 'Indonesia', text: 'Indonesia', value: 'Indonesia' },
    { key: 'Hong Kong', text: 'Hong Kong', value: 'Hong Kong' }
];

export interface ISearchFormProps {
    isSearching: boolean;
    handleSearch: (searchRequest: ISearchRequest) => void;
}

function SearchForm(props: ISearchFormProps) {
    const { isSearching } = props;

    const [variety, setVariety] = React.useState('');
    const [year, setYear] = React.useState('');
    const [country, setCountry] = React.useState('');

    const handleFormSubmit = () => {
        props.handleSearch({ variety, year, country });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Field inline width={4}>
                    <Input
                        label="Variety"
                        placeholder="Chicken/Noodles/Instant.."
                        value={variety}
                        onChange={event => setVariety(event.target.value)}
                    />
                </Form.Field>
                <Form.Field inline width={4}>
                    <label>Year it top: </label>
                    <Select
                        placeholder="Select"
                        value={year}
                        onChange={(event, option) =>
                            setYear(option.value ? option.value.toString() : '')
                        }
                        options={SELECT_YEARS}
                    />
                </Form.Field>
                <Form.Field inline width={4}>
                    <label>Country: </label>
                    <Select
                        placeholder="Select"
                        value={country}
                        onChange={(event, option) =>
                            setCountry(
                                option.value ? option.value.toString() : ''
                            )
                        }
                        options={SELECT_COUNTRIES}
                    />
                </Form.Field>
                <Form.Button
                    type="button"
                    basic
                    className="sm-mt-1"
                    onClick={() => {
                        setVariety('');
                        setYear('');
                        setCountry('');
                    }}
                >
                    <Icon name="erase" />
                    Clear
                </Form.Button>
                <Form.Button
                    type="submit"
                    basic
                    color="blue"
                    disabled={isSearching}
                    className="sm-mt-1"
                >
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
