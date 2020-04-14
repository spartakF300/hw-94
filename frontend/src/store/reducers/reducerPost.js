import {
    CREATE_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS, FETCH_TAGS_SUCCESS,
    MODAL_STATE_EDIT
} from "../actions/actionsPost";

const initialState = {
    post: [],
    loading: false,
    error: null,
    modal:false,
    tags: []
};
const reducerPost = (state = initialState,action)=>{
    switch (action.type) {
        case FETCH_POST_REQUEST:
            return{...state,loading:true};
        case FETCH_POST_SUCCESS:
            return{...state, post:action.data,loading:false};
        case FETCH_POST_FAILURE:
            return{...state,error:action.error,loading: false};
        case CREATE_POST_SUCCESS:
            return{...state, loading:false};
        case MODAL_STATE_EDIT :
            return {...state,modal: !state.modal};
        case FETCH_TAGS_SUCCESS:
            return {...state, tags: action.tags};
        default:return  state
    }
};
export default reducerPost;