import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Loader, Header, Icon, Modal } from 'semantic-ui-react';

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

function sortResults(results: ISearchItem[], sortBy: string) {
    return results.sort((a, b) => {
        return a[sortBy] && b[sortBy] ? a[sortBy] - b[sortBy] : 0;
    });
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
                <Grid.Column>
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
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as="h4">
                                            Total Results: {results.length}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    {sortResults(
                                        sortResults(results, 'topRank'),
                                        'topYear'
                                    ).map(result => (
                                        <Grid.Column
                                            mobile={16}
                                            tablet={8}
                                            computer={4}
                                            key={result.id}
                                            className="mb-2"
                                        >
                                            <SearchCard
                                                searchItem={result}
                                                onItemSelect={setSelectedItem}
                                                isSelected={
                                                    selectedItem?.id ===
                                                    result.id
                                                }
                                            />
                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
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
                    <Modal
                        centered
                        open
                        size="small"
                        closeOnDimmerClick
                        closeOnEscape
                        onClose={() => setSelectedItem(undefined)}
                    >
                        <Modal.Content>
                            <SearchItemView
                                searchItem={selectedItem}
                                onViewClose={() => setSelectedItem(undefined)}
                            />
                        </Modal.Content>
                    </Modal>
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
