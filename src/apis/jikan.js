import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export async function searchAnime(query, page){
    console.log(process.env.REACT_APP_TMDB_API_KEY)
    let result = await api.get('/search/anime', {params: {api_key: process.env.REACT_APP_TMDB_API_KEY, query: query, page: page}})
    return result.data
}

export async function getTopAnime(page){
    console.log(process.env.REACT_APP_TMDB_API_KEY)
    let result = await api.get('/top/anime/' + page, {params: {api_key: process.env.REACT_APP_TMDB_API_KEY}})
    return result.data
}