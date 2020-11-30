import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.jikan.moe/v3",
})

export async function searchAnime(query, page){
    let result = await api.get('/search/anime', {params: {q: query, page: page}})
    return result.data
}

export async function getTopAnime(page){
    let result = await api.get('/top/anime/' + page, {params: {}})
    return result.data
}

export async function getAnimeById(id){
    let result = await api.get('/anime/' + id, {params: {}})
    return result.data
}