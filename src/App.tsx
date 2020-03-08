import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TOAST_CONFIG } from './constants';
import ExampleContainer from './containers/ExampleContainer';
import HomeContainer from './containers/HomeContainer';
import SearchContainer from './containers/SearchContainer';
import Navbar from './components/common/Navbar';

import './css/helper.css';
import './App.css';

class App extends React.Component<{}> {
    constructor(props: {}) {
        super(props);

        toast.configure(TOAST_CONFIG);
    }

    componentDidMount() {
        toast.info('Welcome to FOOBAR!');
    }

    render() {
        return (
            <HashRouter>
                <Navbar />

                <Switch>
                    <Route exact path="/" component={HomeContainer} />
                    <Route exact path="/example" component={ExampleContainer} />
                    <Route exact path="/search" component={SearchContainer} />

                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
