import { searchMovies, getTrendingMovies } from './apis/tmdb'
import store from './state/store'
import { refreshSearchResult, setLoadingSearch, setFullScreenMessage } from './state/rootActions'

function cleanupMovieList(rawList){
    return rawList.map(res =>  {
        return {
            id: res.id,
            coverUrl: (res.poster_path == null)? "https://via.placeholder.com/342x470":"https://image.tmdb.org/t/p/w342" + res.poster_path,
            title: res.title,
            year: (res.release_date)? res.release_date.substring(0, 4) : "? ? ? ?",
            rating: res.vote_average,
            rateCount: res.vote_count,
            desc: (res.overview.length <= 350)? res.overview : res.overview.substring(0, 200) + "..."
        }
    })
}

export async function searchMovieTMDB(query, page = 1){
    store.dispatch(setLoadingSearch(true))    

    // If query is empty, return (weekly) trending.
    let searchResult = (query != "")? await searchMovies(query, page) : await getTrendingMovies(query, page)
    searchResult['results'].sort((a, b) => b.popularity - a.popularity)

    let movies = cleanupMovieList(searchResult['results'])

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