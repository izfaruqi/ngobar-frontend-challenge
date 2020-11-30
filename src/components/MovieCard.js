import React from 'react'
import RatingStar from './RatingStar'

const MovieCard = (props) => {
    return (
        <div className="ui card" style={{}}>
            <div className="image">
                <img src={props.coverUrl}></img>
            </div>
            <div className="content">
                <div className="header">
                    <p>{props.title}</p>
                </div>
                <div className="meta">
                    <span>{props.year}</span>
                    <span>&#8226;</span>
                    <RatingStar rating={props.rating} rateCount={props.rateCount} />
                </div>
                <div className="description">
                    <p style={{textAlign: 'left'}}>{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard