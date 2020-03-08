import * as React from 'react';
import { Card } from 'semantic-ui-react';

import { ISearchItem } from '../models/SearchItem';

export interface ISearchCardProps {
    searchItem: ISearchItem;
    onItemSelect: (selectedItem: ISearchItem) => void;
    isSelected: boolean;
}

function SearchCard(props: ISearchCardProps) {
    return (
        <Card
            onClick={() => props.onItemSelect(props.searchItem)}
            {...(props.isSelected && { color: 'blue' })}
            link
            fluid
        >
            <Card.Content>
                <Card.Header>{props.searchItem.name}</Card.Header>
                <Card.Meta>A sub title</Card.Meta>
                <Card.Description>Here goes some Description</Card.Description>
            </Card.Content>
            <Card.Content extra>Extra Content</Card.Content>
        </Card>
    );
}

export default SearchCard;
