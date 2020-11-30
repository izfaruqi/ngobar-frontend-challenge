import React, { useState } from 'react'
import { connect } from 'react-redux'
import { openMovieDetailModal } from '../movieDetail'
import RatingStar from './RatingStar'
import { Label } from 'semantic-ui-react'

const MovieCard = (props) => {
    const [hover, setHover] = useState(false)
    const hoverStyle = "0 1px 14px 8px #d4d4d5"

    return (
        <div className="ui card" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{
            cursor: 'pointer',
            boxShadow: hover && hoverStyle
            }} onClick={() => openMovieDetailModal(props.movie.id, props.movie.type)}>
            <div className="image">
                <img src={props.movie.coverUrl}></img>
            </div>
            <div className="content">
                <div className="header">
                    <p>{props.movie.title}</p>
                </div>
                <div className="meta">
                    {props.movie.year && <span>{props.movie.year}</span>}
                    {props.movie.year && <span>&#8226;</span>}
                    <RatingStar rating={props.movie.rating} rateCount={props.movie.rateCount} />
                </div>
                <div className="description">
                    <p style={{textAlign: 'left'}}>{props.movie.desc}</p>
                    {props.movie.airing != null && 
                        <div style={{marginTop: 25}}>
                        {props.movie.airing &&
                            <Label size="tiny" color="green" attached="bottom left">AIRING</Label>
                        }
                        {!props.movie.airing &&
                            <Label size="tiny" color="blue" attached="bottom left">COMPLETED</Label>
                        }
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(MovieCard)