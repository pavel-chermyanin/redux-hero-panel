const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filteredLoadingStatus: 'idle',
    activeFilter: 'all',
    // filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: action.payload,
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        
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
        case 'HERO_DELETE':

            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }
        
        default: return state
    }
}

export default reducer;