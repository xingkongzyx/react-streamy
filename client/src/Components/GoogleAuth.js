import React from 'react';

class GoogleAuth extends React.Component {
	// 	用于记录authentication状态，并通过更新它从而rerender component
	state = { isSignedIn: null };
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
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					// 	添加了一个event listener，在authentication状态发生变化时被调用
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	// 用于在sign in状态发生变动时update state从而使整个component rerender，从而
	// 更新页面button的显示
	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
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
		if (this.state.isSignedIn === null) return null;
		else if (this.state.isSignedIn === false)
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

export default GoogleAuth;