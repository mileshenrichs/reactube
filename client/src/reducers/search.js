export default function searchReducer(state = {}, action) {
  switch(action.type) {

    case 'SEARCH_FULFILLED':
      return {
        ...state,
        results: action.payload
      }
    
    default:
      return state
  }
}