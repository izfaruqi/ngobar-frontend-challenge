import React from 'react'
import MovieCard from './MovieCard'
import { Pagination, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from "react-redux";
import { changePage } from '../search'

const mapStateToProps = state => {
    return { search: state.search }
}

const MovieList = ({ search }) => {
    return (
        <div className="ui container grid">
            <div className="ui row centered">
                <div>
                    <Dimmer active={search.isLoading} inverted>
                        <Loader inverted content="Loading..." />
                    </Dimmer>
                    <div style={{display: search.fullScreenMessage? "" : "none"}}>
                        <h4>{search.fullScreenMessage}</h4>
                    </div>

                    <div className="ui four column stackable grid">
                        {search.movies.map(movie => (
                            <div className="column" key={movie.id}><MovieCard movie={movie}></MovieCard></div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="ui row centered" style={{ display: search.isNotEmpty ? "" : "none" }}>
                <Pagination style={{ marginBottom: 10, textAlign: 'center' }} boundaryRange={3} siblingRange={2} activePage={search.currentPage} totalPages={search.totalPages} onPageChange={(e, { activePage }) => changePage(activePage)} />
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(MovieList)