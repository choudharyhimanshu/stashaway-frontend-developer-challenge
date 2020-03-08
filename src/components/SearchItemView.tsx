import * as React from 'react';
import { ISearchItem } from '../models/SearchItem';
import { Grid, Icon, Header, Label, Rating } from 'semantic-ui-react';

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
                        {searchItem.variety}
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
                    {searchItem.topRank && searchItem.topYear && (
                        <Label
                            basic
                            size="large"
                            color="blue"
                            className="mb-3"
                            icon
                        >
                            <Icon name="trophy" />
                            {searchItem.topYear}
                            <Label.Detail>#{searchItem.topRank}</Label.Detail>
                        </Label>
                    )}

                    <div className="mb-2">
                        <strong>Country: </strong>
                        <Icon name="map marker alternate" />
                        {searchItem.country}
                    </div>
                    <div className="mb-2">
                        <strong>Style: </strong>
                        {searchItem.style}
                    </div>
                    <div className="mb-2">
                        <strong>Brand: </strong>
                        <Icon name="tag" />
                        {searchItem.brand}
                    </div>
                    <div className="mb-2">
                        <strong>Rating: </strong>
                        {searchItem.stars && (
                            <Rating
                                disabled
                                icon="star"
                                defaultRating={searchItem.stars}
                                maxRating={5}
                            />
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default SearchItemView;
