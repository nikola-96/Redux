const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First Redux action"
    }
}
function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}
const initialState = {
    numberOfCakes: 10
}
const initialCakeState = {
    numberOfCakes: 10
}
const initialIceCreamState = {
    numberOfIceCreams: 20
}
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCakes: state.numberOfCakes - 1
        }
        default: return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numberOfIceCreams: state.numberOfIceCreams - 1
        }
        default: return state

    }
}
const rootReducers = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducers)
console.log('Initial state', store.getState())
store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
