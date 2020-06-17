const redux = require('redux')
const createStore = redux.createStore
const applayMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    errors: ''
}
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {

    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSucces = (users) => {

    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = errors => {

    return {
        type: FETCH_USERS_FAILURE,
        payload: errors
    }
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: actions.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                users: [],
                errors: actions.payload

            }
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const users = response.data.map((user) => user.id)
                dispatch(fetchUsersSucces(users))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}
const store = createStore(reducer, applayMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())