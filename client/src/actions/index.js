import {SIGN_IN, SIGN_OUT} from "./types"
import streams from "../apis/streams"

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

// make network request to api server and save the new
// created stream to the server.
export const createStream = (formValues) =>{
	return async(dispatch)=>{
		streams.post("/streams", formValues)
	}
}

