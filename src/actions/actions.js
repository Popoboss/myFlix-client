export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export const setMovies = (value) => {
    return { type: SET_MOVIES, value };
}

export const setFilter = (value) => {
    return { type: SET_FILTER, value };
}