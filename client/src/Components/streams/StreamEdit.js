import React from 'react';
import { connect } from 'react-redux';
import {fetchStream} from "../../actions/"

class StreamEdit extends React.Component {
	componentDidMount(){
		this.props.fetchStream(this.props.match.params.id)
	}
	render() {
		if(this.props.selectedStreamById)
			return <div>{this.props.selectedStreamById.title}</div>;
		return <div>Loading ...</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const selectedStreamById = state.streams[ownProps.match.params.id];
	return { selectedStreamById };
};

export default connect(mapStateToProps, {fetchStream})(StreamEdit);


