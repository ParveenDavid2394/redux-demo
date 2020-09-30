// this example shows async actions using Redux

// import necessary files
const redux = require('redux')
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default

// create apply middleware reference 
const applyMiddleware = redux.applyMiddleware

// create createStore reference
const createStore = redux.createStore

// create initial state
const initialState = {
    loading: false,
    users: [],
    error:''
}

// create action constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// create action creators
const fetchUsersRequest = () =>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSucess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// create reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    
        default:
            return state
    }
}

// action creator to fetch data
const fetchUser = ()=>{
    return function (dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            // response.data is the array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSucess(users))
        })
        .catch(error =>{
            // error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

// create store 
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// subscribe store to a console.log
store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUser())
