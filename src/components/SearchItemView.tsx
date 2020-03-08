import * as React from 'react';
import { ISearchItem } from '../models/SearchItem';
import { Grid, Icon, Header } from 'semantic-ui-react';

export interface ISearchItemViewProps {
    searchItem: ISearchItem;
    onViewClose: () => void;
}

function SearchItemView(props: ISearchItemViewProps) {
    const { searchItem } = props;

    return (
        <Grid className="pl-2 pr-2">
            <Grid.Row>
                <Grid.Column>
                    <Header as="h3" floated="left" className="m-0 p-0">
                        {searchItem.name}
                    </Header>
                    <Header
                        as="h4"
                        floated="right"
                        textAlign="right"
                        className="m-0 p-0"
                    >
                        <Icon
                            name="times circle outline"
                            onClick={props.onViewClose}
                        />
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <p>Here comes some description</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default SearchItemView;
