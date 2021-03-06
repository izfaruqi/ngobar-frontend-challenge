import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export async function searchMovies(query, page){
    let result = await api.get('/search/movie', {params: {api_key: process.env.REACT_APP_TMDB_API_KEY, query: query, page: page}})
    return result.data
}

export async function getTrendingMovies(page){
    let result = await api.get('/trending/movie/week', {params: {api_key: process.env.REACT_APP_TMDB_API_KEY, page: page}})
    return result.data
}

export async function getMovieById(id){
    let result = await api.get('/movie/' + id, {params: {api_key: process.env.REACT_APP_TMDB_API_KEY}})
    return result.data
}
