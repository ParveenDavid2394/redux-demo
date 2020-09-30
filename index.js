/*
    Tutorial on Redux

    Redux is a predictable state container for Javascript Apps
        - it is for Javascript apps
            -> Redux is not tied to react
            -> can use Redux with React, Angular, Vue and even Vanilla JS
            -> Redux is a library for JS applications

        - it is a state container
            -> Redux store the state of the application
            -> Consider a react app - state of a component
            -> State of an app is the state represented by all the individual components of that app
            -> Redux will store and manage the application state

        - it is predictable
            -> the state of the application can change
            -> in Redux, all state transition are explicit and it is possible to keep track of them
            -> the changes to the application's state becomes predictable

        - helps to manage the state of the application in a predictable way
        - need to use react-redux library that will help redux and react to bind together

    Three Core Concepts of Redux
        -> Store (the cake shop)
            - holds the state of the application
            - one store for the entire application
            - responsibility
                -> holds application state
                -> allows access to state via getState()
                -> allows state to be updated via dispatch(action)
                -> register listeners via subscribe(listener)
                -> handles unregistering of listeners via the function returned by subscribe(listener)

        -> Action (the intention to buy a cake)
            - describes what happened
            - describes the changes in the state of application 
            - the only way your application can interact with the store
            - carry some information from your app to the redux store
            - plain JS object
            - have a 'type' property that indicates the type of action being performed
            - the 'type' property is typically defined as string constants

        -> Reducer (the shopkeeper)
            - ties the store and actions together
            - carries out state transition depending on the action
            - specify how the app's state changes in response to actions sent to the stores
            - function that accept state and action as arguments and returns the next state of the application

    Three Principles of Redux
        1) The state of your whole application is stored in an object tree within a single store
            - maintain our application stage in a single object which would be managed by Redux Store
            E.g: 
            {
                numberOfCakes:10
            }

        2) The only way to change the state is to emit an action, an object describing what happened
            - to update the state of your app, you need to let Redux know about that with an action
            - not allowed to directly update the state object
            - action is a read-only
            E.g: let reducer know about our action - BUY_CAKE
            {
                type: BUY_CAKE
            }

        3) To specify how the state tree is transformed by actions, you write pure reducers
            - reducer - (previousState, action) => newState
            E.g: 
                const reducer = (state,action) =>{
                    switcH(action.type){
                        case: BUY_CAKE 
                        return {
                            numberOfCakes: state.numberOfCakes - 1
                        }
                    }
                }



 */

// import redux file
const redux = require('redux')

// createStore
const createStore = redux.createStore

// use this to enable to use more than 1 reducer
const combineReducers = redux.combineReducers

// create Action string constant
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

// create Action object using Action creator function
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
    }
}

// create initialState
// const initialState = {
//     numberOfCakes:10,
//     numberOfIceCreams: 20
// }

const initialCakeState = {
    numberOfCakes: 10
}

const initialIceCreamState = {
    numberOfIceCreams: 20
}

// create reducer function
// const reducer = (state=initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numberOfCakes: state.numberOfCakes -1
//             }
        
//         case BUY_ICE_CREAM:
//             return {
//                 ...state,
//                 numberOfIceCreams: state.numberOfIceCreams - 1
//             }
    
//         default:
//             return state;
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }

        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }

        default:
            return state;
    }
}

// combine reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// create store
// const store = createStore(reducer)
const store = createStore(rootReducer)
console.log('Initial state: ', store.getState())
const unsubscribe = store.subscribe(()=> console.log('Updated State: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
