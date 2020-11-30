import store from './state/store'
import { setLoadingMovieDetail, setMovieDetailData, setMovieDetailVisibilty } from './state/rootActions'
import { getMovieById } from './apis/tmdb'
import { getAnimeById } from './apis/jikan'

export async function openMovieDetailModal(id, type){
    store.dispatch(setMovieDetailData({movieDetail: {}, type: null})) // Empty previous movie detail data before opening modal.
    
    store.dispatch(setMovieDetailVisibilty(true))
    store.dispatch(setLoadingMovieDetail(true))

    const movieDetail = type == "TMDB"? await getMovieById(id) : await getAnimeById(id)
    store.dispatch(setMovieDetailData({movieDetail: movieDetail, type: type}))

    store.dispatch(setLoadingMovieDetail(false))
}