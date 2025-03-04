import * as React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import SearchPaneView from '../components/SearchPaneView';

const PANES = [
    {
        menuItem: { key: 'all', icon: 'list', content: 'All Restaurents' },
        render: () => <SearchPaneView />
    }
];

function HomeContainer() {
    return (
        <Container fluid className="pt-10 pb-10 pl-5 pr-5 sm-pl-1 sm-pr-1">
            <Tab menu={{ secondary: true, pointing: true }} panes={PANES} />
        </Container>
    );
}

export default HomeContainer;
