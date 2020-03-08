import * as React from 'react';
import { Card, Label, Icon, Rating } from 'semantic-ui-react';

import { ISearchItem } from '../models/SearchItem';

export interface ISearchCardProps {
    searchItem: ISearchItem;
    onItemSelect: (selectedItem: ISearchItem) => void;
    isSelected: boolean;
}

function SearchCard(props: ISearchCardProps) {
    const { searchItem, isSelected } = props;

    return (
        <Card
            onClick={() => props.onItemSelect(searchItem)}
            {...(isSelected && { color: 'blue' })}
            link
            fluid
        >
            <Card.Content>
                <Card.Header className="mb-1">{searchItem.variety}</Card.Header>
                <Card.Meta>{searchItem.style}</Card.Meta>
                <Card.Description>
                    <Icon name="map marker alternate" /> {searchItem.country}
                    <br />
                    <Rating
                        className="mt-2"
                        disabled
                        icon="star"
                        defaultRating={searchItem.stars}
                        maxRating={5}
                    />
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Label basic className="mr-1 mb-1">
                    <Icon name="tag" />
                    {searchItem.brand}
                </Label>
                {searchItem.topRank && searchItem.topYear && (
                    <Label basic color="blue">
                        <Icon name="trophy" />
                        {searchItem.topYear}
                        <Label.Detail>#{searchItem.topRank}</Label.Detail>
                    </Label>
                )}
            </Card.Content>
        </Card>
    );
}

export default SearchCard;
