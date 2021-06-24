import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	// 	检查现在登录的user的userId与创建当前stream的user的userId
	// 	是否一样，如果是则允许当前user进行edit和delete操作
	renderEditAndDeleteButtons(stream) {
		if (this.props.currentLoggedUserId === stream.userId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" 
						to={`/streams/edit/${stream.id}`}>
						Edit
					</Link>
					<Link className="ui button negative"
						to={`/streams/delete/${stream.id}`}>
						Delete
					</Link>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{this.renderEditAndDeleteButtons(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link className="header" 
							to={`/streams/${stream.id}`}>{stream.title}</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	// 	根据user是否登录判断是否显示"create stream button"
	renderCreateButton() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		// console.log('component render');
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreateButton()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// console.log('state render', state);
	// 	把state object中的stream object中的所有values
	//  转换为array并传入component
	// 	同时将目前登录的user的userId传入component，方便
	// 	根据id的匹配在对应stream右边显示edit/delete buttons
	return {
		streams: Object.values(state.streams),
		currentLoggedUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);