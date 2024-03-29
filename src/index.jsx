import React from 'react';
import ReactDOM from 'react-dom';

import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer: moviesApp });


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';


// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>

        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);