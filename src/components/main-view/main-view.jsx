// main-view.jsx
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null
        };
    }

    // src/components/main-view/main-view.jsx
    getMovies(token) {
        axios.get('https://wlad-movie-app.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    //  src/components/main-view/main-view.jsx
    onLoggedIn(user) {
        this.setState({
            user
        });
    }



    // src/components/main-view/main-view.jsx
    getMovies(token) {
        axios.get('https://wlad-movie-app.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //  src/components/main-view/main-view.jsx

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }








    render() {
        const { movies, user } = this.state;

        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        </Row>
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/movies/:movieId" render={({ match }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                        </Col>
                    }} />

                </Row>
            </Router>
        );
    }
}