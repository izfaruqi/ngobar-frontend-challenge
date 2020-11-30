import { searchMovies, getTrendingMovies } from './apis/tmdb'
import { searchAnime, getTopAnime } from './apis/jikan'
import store from './state/store'
import { refreshSearchResult, setLoadingSearch, setFullScreenMessage } from './state/rootActions'

function cleanupMovieListTMDB(rawList){
    return rawList.map(res =>  {
        return {
            id: res.id,
            type: "TMDB",
            coverUrl: (res.poster_path == null)? "https://via.placeholder.com/342x470":"https://image.tmdb.org/t/p/w342" + res.poster_path,
            title: res.title,
            year: (res.release_date)? res.release_date.substring(0, 4) : "? ? ? ?",
            rating: res.vote_average,
            rateCount: res.vote_count,
            desc: (res.overview.length <= 200)? res.overview : res.overview.substring(0, 200) + "..."
        }
    })
}

function cleanupMovieListJikan(rawList){
    return rawList.map(res =>  {
        return {
            id: res.mal_id,
            type: "Jikan",
            coverUrl: (res.image_url == null)? "https://via.placeholder.com/342x470":res.image_url,
            title: res.title,
            airing: res.airing,
            episodes: res.episodes,
            //year: (res.release_date)? res.release_date.substring(0, 4) : "? ? ? ?",
            rating: res.score,
            desc: (res.synopsis.length <= 200)? res.synopsis : res.synopsis.substring(0, 200) + "..."
        }
    })
}

export async function searchMovieTMDB(query, page = 1){
    store.dispatch(setLoadingSearch(true))    

    // If query is empty, return (weekly) trending.
    let searchResult = (query != "")? await searchMovies(query, page) : await getTrendingMovies(page)
    searchResult['results'].sort((a, b) => b.popularity - a.popularity)

    let movies = cleanupMovieListTMDB(searchResult['results'])

    if(movies.length > 0){
        store.dispatch(setFullScreenMessage(""))
    } else {
        store.dispatch(setFullScreenMessage("Your search returened no results :("))
    }

    let cleanedSearchResult = {
        movies: movies,
        query: query,
        currentPage: searchResult['page'],
        totalPages: searchResult['total_pages']
    }

    store.dispatch(refreshSearchResult(cleanedSearchResult))
    store.dispatch(setLoadingSearch(false))
}

export async function changePageTMDB(page){
    const query = store.getState().search.query
    await searchMovieTMDB(query, page)
}

export async function searchMovieJikan(query, page = 1){
    store.dispatch(setLoadingSearch(true))    

    // If query is empty, return top anime.
    let searchResult = (query != "")? await searchAnime(query, page) : await getTopAnime(page)

    let movies = cleanupMovieListJikan(searchResult['results'])

    if(movies.length > 0){
        store.dispatch(setFullScreenMessage(""))
    } else {
        store.dispatch(setFullScreenMessage("Your search returened no results :("))
    }

    let cleanedSearchResult = {
        movies: movies,
        query: query,
        currentPage: page,
        totalPages: searchResult['last_page']
    }

    store.dispatch(refreshSearchResult(cleanedSearchResult))
    store.dispatch(setLoadingSearch(false))
}
