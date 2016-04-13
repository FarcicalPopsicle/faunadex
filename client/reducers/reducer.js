// Map is almost just like a normal object but it is immutable
// by nature.  Using these objects prevents us from mutating the
// state accidentally.
import {Map, List} from 'immutable';

// Helper function for below

function signInAttempt(state, action) {
  // ideally below I would somehow change the path to only show the encounter
  console.log('sign in attempted');
  return state; //must ALWAYS return state
}

function signUpAttempt(state, action) {
  // ideally below I would somehow change the path to only show the encounter
  console.log('sign up attempted');
  return state; //must ALWAYS return state, or state will become undefined
}

function createNewEncounter(state, action) {

  console.log('new encounter created');
  return state;
}

// This is what does the heavy lifting, based on the action that the
// reducer receives, it does something based on that.  Remember, this
// must be a Pure Function.
export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
    case 'CHANGE_USER_NAME':
      return state.merge({'user': {username: action.username}});
    case 'GO_TO_ENCOUNTER':
      return state.merge({'encounter': action.encounter});
    case 'SIGN_IN_ATTEMPT':
      return signInAttempt(state, action);
    case 'SIGN_UP_ATTEMPT':
      return signUpAttempt(state, action);
    case 'CREATE_NEW_ENCOUNTER':
      return createNewEncounter(state, action);
  }
  console.log('New State Is: ', state);
  window.state = state;
  return state;
}

