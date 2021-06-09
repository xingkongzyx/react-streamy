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
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};

	renderAuthButton() {
		if (this.state.isSignedIn === null) return null;
		else if (this.state.isSignedIn === false)
			return (
				<button className="ui red google button">
					<i className="google icon" />Sign In
				</button>
			);
		else {
			return (
				<button className="ui red google button">
					<i className="google icon" />Sign Out
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

export default GoogleAuth;