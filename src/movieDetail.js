import store from './state/store'
import { setLoadingMovieDetail, setMovieDetailData, setMovieDetailVisibilty } from './state/rootActions'
import { getMovieById } from './apis/tmdb'

export async function openMovieDetailModal(id){
    store.dispatch(setMovieDetailData({})) // Empty previous movie detail data before opening modal.
    
    store.dispatch(setMovieDetailVisibilty(true))
    store.dispatch(setLoadingMovieDetail(true))

    const movieDetail = await getMovieById(id)
    store.dispatch(setMovieDetailData(movieDetail))

    store.dispatch(setLoadingMovieDetail(false))
}