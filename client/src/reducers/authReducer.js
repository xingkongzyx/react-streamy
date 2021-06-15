import {SIGN_IN, SIGN_OUT} from "../actions/types"

// 用于初始化state object
const INITIAL_STATE = { isSignedIn: null, userId: null };

// 记录用户是否登录，确保authentication status对于其他component也方便使用
const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null };
		default:
			return state;
	}
};
export default authReducer;