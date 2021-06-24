import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
	// 	确保component能够自己获得需要的数据
	componentDidMount() {
		// 		获取对应id的stream，以便在render中展示对应的title
		this.props.fetchStream(this.props.match.params.id);
	}

	// 	render delete & Cancel button
	renderActions() {
		const id = this.props.match.params.id;
		const actions = (
			<React.Fragment>
				<button className="ui primary button" 
					onClick={() => this.props.deleteStream(id)}>
					Delete
				</button>
				<Link className="ui button" to="/">
					Cancel
				</Link>
			</React.Fragment>
		);
		return actions;
	}

	// 根据stream是否为undefined确保在Modal显示的内容
	renderContent() {
		if (!this.props.stream) {
			return 'Loading';
		}
		return `Are you sure you want to delete the stream(title: ${this.props.stream.title})`;
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => {
					history.push('/');
				}}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);