// 为了code reuse，创建这个component用于展示form相关的逻辑
// StreamCreate && StreamEdit都将用到它

import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	// 	辅助renderInput function显示error
	renderErrors(meta) {
		const { error, touched } = meta;
		// 如果用户已经touch了input并且确实存在error，则显示给user
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = (formProps) => {
		const { label, input, meta } = formProps;
		return (
			<div>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderErrors(meta)}
			</div>
		);
	};

	// 	redux-form中的handleSubmit处理完表格提交后调用的callback function
	// 	参数为提交时表格内输入的values,我们不再需要event object
	onFormSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div className="field">
				<form
					className="ui form error"
					onSubmit={this.props.handleSubmit(this.onFormSubmit)}
				>
					<Field name="title" 
						component={this.renderInput} 
						label="Enter Title" />
					<Field
						name="description"
						component={this.renderInput}
						label="Enter Description"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

// 处理表格提交时的validation
const validate = (formValues) => {
	const errors = {};
	// 	如果title为空
	if (!formValues.title) errors.title = 'You must enter a title';
	// 	如果description为空
	if (!formValues.description) errors.description = 'You must enter a description';
	// 	最后返回errors object(可能为空或者包含对应的error)
	return errors;
};

// wire up redux-form with the component
// 这样component的props中便会自动包含很多相关的属性
// 注意第一个function的所有参数都以key-value形式在{ form: 'streamForm' }出现
export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);