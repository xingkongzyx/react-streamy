import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions/';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onEditFormSubmit = (formValues) => {
		console.log(formValues);
		this.props.editStream(this.props.match.params.id, formValues)
	}

	render() {
		if (this.props.selectedStreamById)
			return (
				<div>
					<h3>Edit Stream</h3>
					<StreamForm
						onSubmit={this.onEditFormSubmit}
						initialValues={_.pick(this.props.selectedStreamById, [
							'title',
							'description',
						])}
					></StreamForm>
				</div>
			);
		return <div>Loading ...</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	const selectedStreamById = state.streams[ownProps.match.params.id];
	return { selectedStreamById };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);