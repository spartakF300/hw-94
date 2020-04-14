import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const MODAL_STATE_EDIT = 'MODAL_STATE_EDIT';
export const fetchPostRequest = ()=>({type:FETCH_POST_REQUEST});
export const fetchPostSuccess = data=>({type:FETCH_POST_SUCCESS,data});
export const fetchPostFailure = error=>({type:FETCH_POST_FAILURE,error});
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const createPostSuccess = ()=>({type:CREATE_POST_SUCCESS});

export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});

export const fetchPost = (data)=>{
    return async dispatch =>{
        try{
            dispatch(fetchPostRequest());
            await  axiosApi.post('/post',data);
            dispatch(createPostSuccess());
            dispatch(push('/'))
        }catch (e) {
            dispatch(fetchPostFailure(e));
        }

    }
};
export const getPost = (id)=>{
    console.log('get')
    let url = '/post';
    if (id){
        url +='?user='+ id
    }
 return async dispatch =>{
     try{
         dispatch(fetchPostRequest());
         const response = await axiosApi.get(url);
         dispatch(fetchPostSuccess(response.data));
     }catch (e) {
         dispatch(fetchPostFailure(e))
     }
 }
};
export const modalState = ()=>({type:MODAL_STATE_EDIT});

export const fetchTags = () => {
    return async dispatch => {
        const response = await axiosApi.get('/post/tags');

        dispatch(fetchTagsSuccess(response.data));
    }
};
