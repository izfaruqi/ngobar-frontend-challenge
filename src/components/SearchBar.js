import React, { useState } from 'react'
//import { Popup, Label } from 'semantic-ui-react'
import { searchMovieTMDB } from '../search'

const SearchBar = (props) => {
    const [query, setQuery] = useState("")

    const search = async (query) => {
        await searchMovieTMDB(query)
    }

    return (
        <div className="ui grid">
            <div className="ui row centered">
                <div className="ui action input focus" style={{marginRight: 10, width: '80%'}}>
                    <input onChange={(e) => setQuery(e.target.value)} onKeyUp={(e) => { if(e.key == 'Enter'){ search(query) } }} placeholder="Search movies..."></input>
                    <button className="ui button primary" onClick={() => search(query)} >Search</button>
                </div>
                {/*
                    <Popup content="TODO: Settings" position="bottom left" on='click' pinned
                        trigger={
                            <button className="ui button icon"><i class="cog icon"></i></button>
                        } />
                */}
            </div>
        </div>
    )
}

export default SearchBar