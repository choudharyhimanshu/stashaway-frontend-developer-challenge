import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Icon, Responsive } from 'semantic-ui-react';

const Navbar = () => {
    return (
        <Menu fixed="top">
            <Container fluid>
                <Responsive as={Menu.Item} {...Responsive.onlyComputer}>
                    <Icon name="code" color="blue" />
                    <strong>FOOBAR</strong>
                </Responsive>
                <Link className="item" to="/">
                    <Icon name="home" />
                    Home
                </Link>
                <Link className="item" to="/example">
                    <Icon name="star outline" />
                    Example
                </Link>
                <Link className="item" to="/search">
                    <Icon name="search" />
                    Search
                </Link>
                <Responsive
                    as={Menu.Item}
                    position="right"
                    {...Responsive.onlyComputer}
                >
                    <Icon name="info" />
                    About
                </Responsive>
            </Container>
        </Menu>
    );
};

export default Navbar;
