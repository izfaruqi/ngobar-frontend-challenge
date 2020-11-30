import React from 'react'
import { connect } from 'react-redux'
import RatingStar from './RatingStar'
import { Modal, Transition, Dimmer, Loader, Button, Icon, Image, Label, Container, Segment } from 'semantic-ui-react'
import { setMovieDetailVisibilty } from '../state/rootActions'

const mapStateToProps = state => {
    return { movieDetail: state.movieDetail }
}

const MovieDetail = (props) => {

    let backdropImg, posterImg
    // If image is not provided, use a placeholder image.

    if(props.movieDetail.type === "TMDB"){
        backdropImg = props.movieDetail.movie.backdrop_path ? ("https://image.tmdb.org/t/p/w1280" + props.movieDetail.movie.backdrop_path) : "https://via.placeholder.com/1280x720"
        posterImg = props.movieDetail.movie.poster_path ? ("https://image.tmdb.org/t/p/w342" + props.movieDetail.movie.poster_path) : "https://via.placeholder.com/342x513"
    } else {
        let ytId
        if(props.movieDetail.movie.trailer_url != null){
            if(props.movieDetail.movie.trailer_url.includes("youtube.com")){
                ytId = props.movieDetail.movie.trailer_url.substring(30, 41)
                console.log(ytId)
            }
        }
        backdropImg = ytId ? (`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`) : "https://via.placeholder.com/1280x720"
        posterImg = props.movieDetail.movie.image_url ? props.movieDetail.movie.image_url : "https://via.placeholder.com/342x513"
    }
    
    const summary = () => {
        if(props.movieDetail.type === "TMDB" && props.movieDetail.movie.overview != null){
            return props.movieDetail.movie.overview
        } else if(props.movieDetail.type === "Jikan" && props.movieDetail.movie.synopsis != null){
            return props.movieDetail.movie.synopsis
        }
    }

    const producers = () => {
        if(props.movieDetail.type === "TMDB"){
            return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {props.movieDetail.movie.production_companies && props.movieDetail.movie.production_companies.map(company => {
                            if (company.logo_path) {
                                return (<Label color="white" image style={{ display: 'inline-block', marginBottom: 4, marginRight: 4, marginLeft: 0 }}>
                                    {<Image style={{ padding: "3px 0px 3px 3px" }} src={"https://image.tmdb.org/t/p/w185" + company.logo_path}></Image>}
                                    {company.name}
                                </Label>)
                            } else {
                                return (<Label color="white" style={{ display: 'inline-block', marginBottom: 4, marginRight: 4, marginLeft: 0 }}>
                                    {company.name}
                                </Label>)
                            }
                        })}
                    </div>
        } else if(props.movieDetail.type === "Jikan"){
            return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {props.movieDetail.movie.studios && props.movieDetail.movie.studios.map(company => 
                            <Label color="white" style={{ display: 'inline-block', marginBottom: 4, marginRight: 4, marginLeft: 0 }}>
                                {company.name}
                            </Label>)}
                    </div>
        }
    }

    const release_rating = () => {
        if(props.movieDetail.type === "TMDB"){
            return <div><span>{props.movieDetail.movie.release_date? props.movieDetail.movie.release_date:"? ? ? ?"}</span><span>&nbsp;&#8226;&nbsp;</span><RatingStar rating={props.movieDetail.movie.vote_average} rateCount={props.movieDetail.movie.vote_count} /></div>
        } else if(props.movieDetail.type === "Jikan"){
            return <div><span>{props.movieDetail.movie.premiered? props.movieDetail.movie.premiered : props.movieDetail.movie.aired.from.substring(0, 4)}</span><span>&nbsp;&#8226;&nbsp;</span><RatingStar rating={props.movieDetail.movie.score} rateCount={null} /></div>
        }
    }

    const runtime = () => {
        if(props.movieDetail.type === "TMDB"){
            return <div style={{marginBottom: 10}}>{props.movieDetail.movie.runtime && props.movieDetail.movie.runtime + " m (" + (Math.floor(props.movieDetail.movie.runtime/60.0) + " h and " + (Math.floor(props.movieDetail.movie.runtime % 60.0) + " m)"))}</div>
        } else if(props.movieDetail.type === "Jikan"){
            return <div style={{marginBottom: 10}}>{props.movieDetail.movie.duration && props.movieDetail.movie.episodes + ((props.movieDetail.movie.episodes != 1)? " episodes" : " episode") + " (" + props.movieDetail.movie.duration + ")"}</div>
        }
    }

    return(
        <Transition visible={props.movieDetail.isOpen} animation="scale" duration={200}>
            <Modal dimmer="blurring" open={props.movieDetail.isOpen} centered={false} onClose={() => props.dispatch(setMovieDetailVisibilty(false))}>
                <Dimmer active={props.movieDetail.isLoading} inverted>
                    <Loader inverted/>
                </Dimmer>
                
                {/* Backdrop and poster image. */}
                <Container style={{position: 'relative', zIndex: 2}}>
                    <Image style={{width: 150, objectFit: 'cover', position: 'absolute', zIndex: 2, bottom: -90, left: 40, boxShadow: "10px 15px 15px -10px rgba(0,0,0,0.5)", borderRadius: 5}} src={posterImg}></Image>
                    <Image style={{width: "100%", height: 200, objectFit: 'cover'}} src={backdropImg}></Image>
                </Container>

                <Modal.Content>
                    { !props.movieDetail.isLoading &&
                        <Container style={{ paddingLeft: 200, marginBottom: 15}}>
                            <h1>{props.movieDetail.movie.title}</h1>

                            {/* Release date and rating */}
                            {release_rating()}

                            {/* Runtime */}
                            {runtime()}
                            
                            {/* Companies */}
                            {producers()}

                            {/* Genres */}
                            <Segment>
                                <Label attached="top left">Genres</Label>
                                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {props.movieDetail.movie.genres && props.movieDetail.movie.genres.map(genre => 
                                        <Label style={{display: 'inline', marginBottom: 4, marginRight: 4, marginLeft: 0}}>{genre.name}</Label>
                                    )}
                                </div>
                            </Segment>
                            
                        </Container>
                    }

                    {/* Overview */}
                    <h4>{summary()}</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={() => props.dispatch(setMovieDetailVisibilty(false))}><Icon name="remove" /> Close</Button>
                </Modal.Actions>
            </Modal>    
        </Transition>
    )
}

export default connect(mapStateToProps)(MovieDetail)