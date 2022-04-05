import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdd,
    heroDelete
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, {
    [heroesFetching]: state => { state.heroesLoadingStatus = 'loading' },
    [heroesFetched]: (state, action) => {
        state.heroesLoadingStatus = 'idle';
        state.heroes = action.payload;
    },
    [heroesFetchingError]: (state,) => { state.heroesLoadingStatus = 'error' },
    [heroAdd]: (state, action) => { state.heroes.push(action.payload) },
    [heroDelete]: (state, action) => {
        state.heroes = state.heroes.filter(item => item.id !== action.payload)
    }
},
    [],
    state => state
)

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroAdd, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(heroDelete, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {});
// })

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'idle',
//                 heroes: action.payload,
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }

//         case 'HERO_DELETE':

//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         case 'HERO_ADD':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }

//         default: return state
//     }
// }

// export default heroes;