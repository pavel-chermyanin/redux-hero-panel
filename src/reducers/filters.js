const initialState = {
    filters: [],
    filteredLoadingStatus: 'idle',
    activeFilter: 'all',
}

const filters = (state = initialState, action) => {
    switch (action.type) {

        case 'FILTERS_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
            }

        default: return state
    }
}

export default filters;