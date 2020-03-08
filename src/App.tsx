import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TOAST_CONFIG } from './constants';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/common/Navbar';

import './css/helper.css';
import './App.css';

class App extends React.Component<{}> {
    constructor(props: {}) {
        super(props);

        toast.configure(TOAST_CONFIG);
    }

    componentDidMount() {
        toast.info('Welcome to Top Ramen Restaurents!');
    }

    render() {
        return (
            <HashRouter>
                <Navbar />

                <Switch>
                    <Route exact path="/" component={HomeContainer} />

                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
