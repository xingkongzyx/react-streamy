import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	// 	用于记录authentication状态，并通过更新它从而rerender component
	// 	为了数据在react端方便传递不再使用state记录authentication 状态
	//  state = { isSignedIn: null };
	componentDidMount() {
		// 		加载gapi需要的用到的部分的code
		window.gapi.load('client:auth2', () => {
			//      callback func,在code加载完后运行,用于register the client id;
			window.gapi.client
				.init({
					clientId:
						'487137633010-pq9ok0rf8904tpb3kljubtqfcp6ckgoe.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					// 	register the client完成后调用,因为返回的是promise,所以可以使用.then
					this.auth = window.gapi.auth2.getAuthInstance();
					// 	通过现有登录状态update state value
					// this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					// 	用于记录redux second render时authentication的状态
					this.onAuthChange(this.auth.isSignedIn.get());
					// 	添加了一个event listener，在authentication状态发生变化时被调用
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	// 用于在登录状态发生变化时调用action creator并dispatch到不同的
	// reducers从而改变store value
	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	// 	用于让用户点击signin button时登录促使用户登录
	onSignInClick = () => {
		this.auth.signIn();
	};
	// 	用于让用户点击signout button时登录促使用户登出
	onSignOutClick = () => {
		this.auth.signOut();
	};

	// 	根据authentication(this.state.isSignedIn)状态显示对应的button
	renderAuthButton() {
		if (this.props.isSignedIn === null) {return null}
		else if (this.props.isSignedIn === false)
			return (
				<button className="ui red google button" onClick={this.onSignInClick}>
					<i className="google icon" />
					Sign In
				</button>
			);
		else {
			return (
				<button className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);