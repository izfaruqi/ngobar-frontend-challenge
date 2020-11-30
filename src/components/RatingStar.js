import React from 'react'

const RatingStar = (props) => {
    const rating = Math.round(parseFloat(props.rating)/2)
    let ratingStars = []
    for(let i = 1; i <= 5; i++) {
        if(i <= rating){
            ratingStars.push(<span style={{margin: 0, color: "#ebaa06"}}>&#9733;</span>)
        } else {
            ratingStars.push(<span style={{margin: 0, color: "#d0d0d0"}}>&#9733;</span>)
        }
    }
    
    return(
        <span>
            {props.rating + "/10"}&nbsp;&nbsp;{ratingStars}&nbsp;&nbsp;{`(${props.rateCount})`}
        </span>
    )
}

export default RatingStar