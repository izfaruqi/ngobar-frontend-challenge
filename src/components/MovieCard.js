import React, { useState } from 'react'
import RatingStar from './RatingStar'

const MovieCard = (props) => {
    const [hover, setHover] = useState(false)
    const hoverStyle = "0 1px 14px 8px #d4d4d5"
    return (
        <div className="ui card" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{
            cursor: 'pointer',
            boxShadow: hover && hoverStyle
        }}>
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