
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';
import createLogger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';


import thunkMiddleware from 'redux-thunk' 




// Remember that all actions that are dispatched pass through our middleware before they run through the reducer. 
// Normally, our reducer expects an action to be a plain JavaScript object with some identifying type field. 
// However, thunk middleware will give us a powerful new ability: instead of dispatching an action object, 
// we can dispatch a new function! 

// When the thunkMiddleware sees that we've dispatched a function instead of a regular object, it will say:

// Hmm, it looks like whoever dispatched this function is trying to do something asynchronous - 
// I'll take this function they've given me and instead of giving it to the reducer, 
// I'll invoke it here and pass the store's dispatch method to it, 
// so that whenever that side effect completes or the async action resolves, 
// they can use it to dispatch a new action with whatever data they get. 
// (And just for good measure, I'll give them the store's getState method as well).

// What a useful piece of middleware! 
// Now we have a place for all of our side effects and AJAX requests - async action creators!

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({lyrics: lyricsReducer, player: playerReducer}), composeEnhancers(applyMiddleware(thunkMiddleware, createLogger())));
