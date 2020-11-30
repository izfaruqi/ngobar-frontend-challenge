import React, { useState, useEffect } from 'react'
import MovieList from './MovieList'
import SearchBar from './SearchBar'
import MainFooter from './MainFooter'
import { searchMovieTMDB } from '../search'

const App = () => {
    useEffect(() => {
        searchMovieTMDB("") // Get weekly trends on startup.
    })

    return (
        <div className="ui container">
            <h1 style={{marginTop: 40, textAlign: 'center'}}>MyMovieList</h1>
            <div style={{marginTop: 50}}></div>
            <SearchBar></SearchBar>
            <div style={{marginTop: 50}}></div>
            <div style={{minHeight: "60vh"}}><MovieList></MovieList></div>
            <MainFooter></MainFooter>
        </div>
    )
}

export default App;