import * as React from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Loader,
    Header,
    Icon,
    Responsive,
    Modal
} from 'semantic-ui-react';

import { ISearchItem } from '../models/SearchItem';
import { IRootReducerState } from '../store/configureStore';
import SearchForm from './SearchForm';
import SearchCard from './SearchCard';
import SearchItemView from './SearchItemView';

export interface ISearchPaneViewProps {
    isLoading: boolean;
    errorMessage: string;
    results?: ISearchItem[];
}

function SearchPaneView(props: ISearchPaneViewProps) {
    const { isLoading, errorMessage, results } = props;

    const [selectedItem, setSelectedItem] = React.useState<ISearchItem>();

    return (
        <Grid className="pt-2 pb-2">
            <Grid.Row>
                <Grid.Column>
                    <SearchForm />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column
                    mobile={16}
                    tablet={16}
                    widescreen={selectedItem ? 11 : 16}
                    computer={selectedItem ? 11 : 16}
                    largeScreen={selectedItem ? 11 : 16}
                    className="transition-width"
                >
                    {isLoading ? (
                        <Loader
                            active
                            inline="centered"
                            className="mt-10 mb-10"
                        >
                            Fetching results
                        </Loader>
                    ) : results ? (
                        results.length === 0 ? (
                            <Header
                                as="h3"
                                textAlign="center"
                                className="mt-10 mb-10"
                            >
                                <Icon name="warning" color="grey" />
                                No results found.
                            </Header>
                        ) : (
                            <Grid>
                                {results.map(result => (
                                    <Grid.Column
                                        mobile={16}
                                        tablet={8}
                                        computer={4}
                                    >
                                        <SearchCard
                                            key={result.id}
                                            searchItem={result}
                                            onItemSelect={setSelectedItem}
                                            isSelected={
                                                selectedItem?.id === result.id
                                            }
                                        />
                                    </Grid.Column>
                                ))}
                            </Grid>
                        )
                    ) : (
                        errorMessage && (
                            <Header
                                as="h2"
                                icon
                                textAlign="center"
                                className="mt-10 mb-10"
                            >
                                <Icon name="warning circle" color="grey" />
                                OOPS
                                <Header.Subheader>
                                    Error occurred while fetching results.
                                    <p>{errorMessage}</p>
                                </Header.Subheader>
                            </Header>
                        )
                    )}
                </Grid.Column>
                {selectedItem && (
                    <>
                        <Responsive
                            as={Modal}
                            maxWidth={991}
                            centered={false}
                            open
                        >
                            <Modal.Content>
                                <SearchItemView
                                    searchItem={selectedItem}
                                    onViewClose={() =>
                                        setSelectedItem(undefined)
                                    }
                                />
                            </Modal.Content>
                        </Responsive>
                        <Responsive
                            minWidth={992}
                            as={Grid.Column}
                            mobile={16}
                            tablet={16}
                            widescreen={5}
                            computer={5}
                            largeScreen={5}
                            className="animate-visibility sm-pt-5 sm-pb-5"
                        >
                            <SearchItemView
                                searchItem={selectedItem}
                                onViewClose={() => setSelectedItem(undefined)}
                            />
                        </Responsive>
                    </>
                )}
            </Grid.Row>
        </Grid>
    );
}

const mapStateToProps = (state: IRootReducerState) => {
    return {
        errorMessage: state.search.errorMessage
            ? state.search.errorMessage
            : '',
        ...state.search
    };
};

export default connect(mapStateToProps)(SearchPaneView);
