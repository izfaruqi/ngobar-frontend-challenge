import React from 'react'
import { connect } from 'react-redux'
import RatingStar from './RatingStar'
import { Modal, Transition, Dimmer, Loader, Button, Icon, Image, Label, Container, Segment } from 'semantic-ui-react'
import { setMovieDetailVisibilty } from '../state/rootActions'

const mapStateToProps = state => {
    return { movieDetail: state.movieDetail }
}

const MovieDetail = (props) => {
    const backdropImg = props.movieDetail.movie.backdrop_path ? ("https://image.tmdb.org/t/p/w1280" + props.movieDetail.movie.backdrop_path) : "https://via.placeholder.com/1280x720"
    const posterImg = props.movieDetail.movie.poster_path ? ("https://image.tmdb.org/t/p/w342" + props.movieDetail.movie.poster_path) : "https://via.placeholder.com/342x513"

    return(
        <Transition visible={props.movieDetail.isOpen} animation="scale" duration={200}>
            <Modal dimmer="blurring" open={props.movieDetail.isOpen} centered={false} onClose={() => props.dispatch(setMovieDetailVisibilty(false))}>
                <Dimmer active={props.movieDetail.isLoading} inverted>
                    <Loader inverted/>
                </Dimmer>
                
                <Container style={{position: 'relative', zIndex: 2}}>
                    <Image style={{width: 150, objectFit: 'cover', position: 'absolute', zIndex: 2, bottom: -90, left: 40, boxShadow: "10px 15px 15px -10px rgba(0,0,0,0.5)", borderRadius: 5}} src={posterImg}></Image>
                    <Image style={{width: "100%", height: 200, objectFit: 'cover'}} src={backdropImg}></Image>
                </Container>

                <Modal.Content>
                    { !props.movieDetail.isLoading &&
                        <Container style={{ paddingLeft: 200, marginBottom: 15}}>
                            <h1>{props.movieDetail.movie.title}</h1>
                            <div><span>{props.movieDetail.movie.release_date}</span><span>&nbsp;&#8226;&nbsp;</span><RatingStar rating={props.movieDetail.movie.vote_average} rateCount={props.movieDetail.movie.vote_count} /></div>
                            <div style={{marginBottom: 10}}>{props.movieDetail.movie.runtime && props.movieDetail.movie.runtime + " m (" + (Math.floor(props.movieDetail.movie.runtime/60.0) + " h and " + (Math.floor(props.movieDetail.movie.runtime % 60.0) + " m)"))}</div>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {props.movieDetail.movie.production_companies && props.movieDetail.movie.production_companies.map(company => {
                                    if(company.logo_path){
                                        return(<Label color="white" image style={{display: 'inline-block', marginBottom: 4, marginRight: 4, marginLeft: 0}}>
                                            {<Image style={{padding: "3px 0px 3px 3px"}} src={"https://image.tmdb.org/t/p/w185" + company.logo_path}></Image>}
                                            {company.name}
                                        </Label>)
                                    } else {
                                        return(<Label color="white" style={{display: 'inline-block', marginBottom: 4, marginRight: 4, marginLeft: 0}}>
                                            {company.name}
                                        </Label>)
                                    }
                                })}
                            </div>
                            <Segment>
                                <Label attached="top left">Genres</Label>
                                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {props.movieDetail.movie.genres && props.movieDetail.movie.genres.map(genre => <Label style={{display: 'inline', marginBottom: 4, marginRight: 4, marginLeft: 0}}>{genre.name}</Label>)}
                                </div>
                            </Segment>
                            
                        </Container>
                    }

                    <h4>{props.movieDetail.movie.overview && props.movieDetail.movie.overview}</h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={() => props.dispatch(setMovieDetailVisibilty(false))}><Icon name="remove" /> Close</Button>
                </Modal.Actions>
            </Modal>
        </Transition>
    )
}

export default connect(mapStateToProps)(MovieDetail)