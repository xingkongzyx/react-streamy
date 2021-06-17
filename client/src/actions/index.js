import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	DELETE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
} from './types';
import streams from '../apis/streams';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

// make network request to api server and save the new
// created stream to the server.
export const createStream = (formValues) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const response = await streams.post('/streams', {...formValues, userId});
		dispatch({
			type: CREATE_STREAM,
			payload: response.data,
		});
	};
};

// action creator to fetch all streams from api server
export const fetchStreams = () => {
	return async (dispatch) => {
		const response = await streams.get('/streams');
		dispatch({ type: FETCH_STREAMS, payload: response.data });
	};
};

// action creator to fetch one specific stream using the id from api server
export const fetchStream = (id) => {
	return async (dispatch) => {
		const response = await streams.get(`/streams/${id}`);
		dispatch({ type: FETCH_STREAM, payload: response.data });
	};
};

// action creator to delete one specific stream using the id from api server
export const deleteStream = (id) => {
	return async (dispatch) => {
		await streams.delete(`/streams/${id}`);
		dispatch({ type: DELETE_STREAM, payload: id });
	};
};

// action creator to update one specific stream using the id from api server
export const editStream = (id, formValues) => {
	return async (dispatch) => {
		const response = await streams.put(`/streams/${id}`, formValues);
		dispatch({ type: EDIT_STREAM, payload: response.data });
	};
};

