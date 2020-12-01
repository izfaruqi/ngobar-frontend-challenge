import React, { useState, useRef } from 'react'
import { Form, Radio, Popup } from 'semantic-ui-react'
import { searchMovieTMDB, searchMovieJikan } from '../search'

const SearchBar = (props) => {
    const [query, setQuery] = useState("")
    const [isMovie, setIsMovie] = useState(true)
    const [searchWarning, setSearchWarning] = useState(false)
    const inputRef = useRef()

    const search = async (query) => {
        if(query.length < 3 && !isMovie){
            setSearchWarning(true)
            setTimeout(() => setSearchWarning(false), 2000)
            return
        }
        if(isMovie){
            await searchMovieTMDB(query)
        } else {
            await searchMovieJikan(query)
        }
    }

    return (
        <div className="ui grid">
            <div className="ui row centered">
                <div className="ui action input focus" style={{marginRight: 10, width: '80%'}}>
                    <input ref={inputRef} onChange={(e) => setQuery(e.target.value)} onKeyUp={(e) => { if(e.key == 'Enter'){ search(query) } }} 
                        placeholder={isMovie? "Search movies..." : "Search anime..."}></input>
                    <button className="ui button primary" onClick={() => search(query)} >Search</button>
                </div>

                <Form style={{textAlign: 'left'}}>
                    <Form.Field>
                        <Radio
                            label="Movies"
                            value={true}
                            checked={isMovie}
                            onChange={() => setIsMovie(true)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label="Anime"
                            value={false}
                            checked={!isMovie}
                            onChange={() => setIsMovie(false)}
                            />
                    </Form.Field>
                </Form>

                <Popup
                    context={inputRef}
                    content="Anime search queries must be at least 3 characters long."
                    position="bottom left"
                    open={searchWarning}
                    />
            </div>
        </div>
    )
}

export default SearchBar