import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
// 	helper function that 辅助Field component把表格显示在screen上
// 	Field会给予这个function 默认参数 formProps,其中包含了value, event handlers等
	renderInput(formProps) {
		return(
			<div>		
				<label>{formProps.label}</label>
				<input {...formProps.input} />
			</div>) 
	}

// 	redux-form中的handleSubmit处理完表格提交后调用的callback function
// 	参数为提交时表格内输入的values,我们不再需要event object
	onFormSubmit(formValues){
		console.log("title", formValues.title);
		console.log("description", formValues.description);

	}
	
	render() {
		return (
			<div className="field">
				<form className="ui form" 
					onSubmit={this.props.handleSubmit(this.onFormSubmit)} >
					<Field name="title" component={this.renderInput} 
						label="Enter Title"/>
					<Field name="description" component={this.renderInput} 
						label="Enter Description"/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) =>{
	const errors = {};
	if(!formValues.title) errors.title = "You must enter a title";
	if(!formValues.description) errors.description = "You must enter a description";
	
	return errors
}

// wire up redux-form with the component
// 这样component的props中便会自动包含很多相关的属性
// 注意第一个function的所有参数都以key-value形式在{ form: 'streamCreate' }出现
export default reduxForm({ form: 'streamCreate' })(StreamCreate);