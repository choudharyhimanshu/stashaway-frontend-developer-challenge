import * as React from 'react';

import ExampleComponent from '../components/ExampleComponent';
import { Container } from 'semantic-ui-react';

class ExampleContainer extends React.Component {
    render() {
        return (
            <Container className="pt-10 pb-10" textAlign="center">
                <ExampleComponent />
            </Container>
        );
    }
}

export default ExampleContainer;
