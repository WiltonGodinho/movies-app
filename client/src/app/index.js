import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesEdit, MoviesDetail, MoviesListMaterial } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MoviesListMaterial} />
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesEdit} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesEdit}
                />
                <Route path="/movies/detail/:id" exact component={MoviesDetail} />
                <Route path="/movies/listM" exact component={MoviesListMaterial} />
            </Switch>
        </Router>
    )
}

export default App
