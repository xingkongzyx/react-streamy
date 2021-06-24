import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.fetchStream(id);
	}

	render() {
		if (!this.props.stream) return null;
		return (
			<div>
				<h1>{this.props.stream.title}</h1>
				<h5>{this.props.stream.description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);