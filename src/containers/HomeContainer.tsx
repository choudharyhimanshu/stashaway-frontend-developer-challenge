import * as React from 'react';
import {
    Container,
    Header,
    Divider,
    Placeholder,
    Button
} from 'semantic-ui-react';

class HomeContainer extends React.Component {
    render() {
        return (
            <Container className="pt-10 pb-10">
                <Header as="h1" size="huge" className="pt-2">
                    Welcome, User!
                </Header>
                <Divider className="pb-2" />
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                <Button as="a" className="mt-2">
                    Read More
                </Button>
            </Container>
        );
    }
}

export default HomeContainer;
