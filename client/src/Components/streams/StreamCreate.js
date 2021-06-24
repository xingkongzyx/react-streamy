import React from 'react';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
	// 	redux-form中的handleSubmit处理完表格提交后调用的callback function
	// 	参数为提交时表格内输入的values,我们不再需要event object
	onCreateFormSubmit = (formValues) => {
		
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div>
				<h3>Edit Form</h3>
				<StreamForm onSubmit={this.onCreateFormSubmit}></StreamForm>
			</div>
		);
	}
}

// Wire up the connect function with the component
export default connect(null, { createStream })(StreamCreate);