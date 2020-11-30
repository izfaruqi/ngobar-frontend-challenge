export function refreshSearchResult(payload){
    return { type: "REFRESH_SEARCH_RESULT", payload }
}

export function setLoadingSearch(payload){
    return { type: "SET_LOADING_SEARCH", payload }
}

export function setFullScreenMessage(payload){
    return { type: "SET_FULL_SCREEN_MESSAGE_SEARCH", payload }
}