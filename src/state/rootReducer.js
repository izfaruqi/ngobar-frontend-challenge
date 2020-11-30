const initialState = {
    search: {
        movies: [],
        query: "",
        isMovie: true,
        isLoading: false,
        isNotEmpty: false,
        isFirstSearched: true,
        fullScreenMessage: "",
        currentPage: 1,
        totalPages: 1
    },
    movieDetail: {
        isOpen: false,
        isLoading: false,
        type: 'TMDB',
        movie: {}
    }
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case "REFRESH_SEARCH_RESULT":
            let isNotEmpty
            if(action.payload.movies.length > 0){
                isNotEmpty = true
            } else {
                isNotEmpty = false
            }
            return {
                ...state,
                search: {
                    ...state.search,
                    ...action.payload,
                    isNotEmpty: isNotEmpty,
                    isFirstSearched: false
                }
            }
        case "SET_LOADING_SEARCH":
            return {
                ...state,
                search: {
                    ...state.search,
                    isLoading: action.payload
                }
            }
        case "SET_FULL_SCREEN_MESSAGE_SEARCH":
            return {
                ...state,
                search: {
                    ...state.search,
                    fullScreenMessage: action.payload
                }
            }
        case "SET_MOVIE_DETAIL_VISIBILITY":
            return {
                ...state,
                movieDetail: {
                    ...state.movieDetail,
                    isOpen: action.payload
                }
            }
        case "SET_LOADING_MOVIE_DETAIL":
            return {
                ...state,
                movieDetail: {
                    ...state.movieDetail,
                    isLoading: action.payload
                }
            }
        case "SET_MOVIE_DETAIL_DATA":
            return {
                ...state,
                movieDetail: {
                    ...state.movieDetail,
                    type: action.payload.type,
                    movie: action.payload.movieDetail
                }
            }
        default:
            return state
    }
};

export default rootReducer;