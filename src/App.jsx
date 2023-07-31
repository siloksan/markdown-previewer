import './App.css';
import {marked} from 'marked';
import * as DOMPurify from 'dompurify';
import {useState} from "react";
import store, {showMarkdown} from "./redux";
import {connect} from "react-redux";
import {Provider} from "react-redux";
import React from "react";

const App = (props) => {

	const html = marked(props.text, {
		breaks: true
	})
	const createHtml = () => {
		return {__html: html}
	}

	const hide = true
	return (
		<div>
			<section className="editorBlock">
				<div className="toolbar">
					<i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
					Editor
					{hide ?
						<i className="fa fa-arrows-alt"></i> :
						<i className="fa fa-compress"></i>}
				</div>
				<textarea id="editor" onKeyUp={props.handleChange}>{props.text}</textarea>
			</section>
			<section className="previewWrap">
				<div className="toolbar">
					<i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
					Preview
					{hide ?
						<i className="fa fa-arrows-alt"></i> :
						<i className="fa fa-compress"></i>}
				</div>
				<div id="preview" dangerouslySetInnerHTML={createHtml()}>
				</div>
			</section>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { text: state.text }
}

const mapDispatchToProps = (dispatch) => {
	return {
		handlePreviewText: (text) => {
			dispatch(showMarkdown(text))
		}
	}
}

class ClassApp extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChange = (event) => {
		this.props.handlePreviewText(event.target.value)
	}
	render() {
		return (<App handleChange={this.handleChange} text={this.props.text}/>)
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ClassApp)

const AppWrapper = () => {
	return (
	<Provider store={store}>
		<Container/>
	</Provider>
	)
}

export default AppWrapper