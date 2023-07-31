import './App.css';
import {marked} from 'marked';
import store, {showMarkdown} from "./redux";
import {connect} from "react-redux";
import {Provider} from "react-redux";
import React, {useState} from "react";

const App = (props) => {

	const html = marked(props.text, {
		breaks: true
	})
	const createHtml = () => {
		return {__html: html}
	}

	const handleChange = (event) => {
		props.handlePreviewText(event.target.value)
	}

	const [fullScreen, setFullScreen] = useState(
		{ editorSize: true, reviewerSize: true}
	)

	const maximizeEditor = (boolean) => {
		setFullScreen(
			{reviewerSize: true, editorSize: boolean}
		)
	}

	const maximizePreviewer = (boolean) => {
		setFullScreen(
			{reviewerSize: boolean, editorSize: true}
		)
	}

	console.log(fullScreen.editorSize);

	return (
		<div>
			{fullScreen.reviewerSize &&
				<section className="editorBlock">
					<div className="toolbar">
						<i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
						Editor
						{fullScreen.editorSize ?
							<i className="fa fa-arrows-alt" onClick={() => maximizeEditor(false)}></i> :
							<i className="fa fa-compress" onClick={() => maximizeEditor(true)}></i>}
					</div>
					<textarea id="editor"
					          onKeyUp={handleChange}
					          defaultValue={props.text}
					          className={!fullScreen.editorSize && "maximize"}
					/>
				</section>
			}
			{fullScreen.editorSize &&
				<section className="previewWrap">
					<div className="toolbar">
						<i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
						Preview
						{fullScreen.reviewerSize ?
							<i className="fa fa-arrows-alt" onClick={() => maximizePreviewer(false)}></i> :
							<i className="fa fa-compress" onClick={() => maximizePreviewer(true)}></i>}
					</div>
					<div id="preview" dangerouslySetInnerHTML={createHtml()} >
					</div>
				</section>
			}
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

const Container = connect(mapStateToProps, mapDispatchToProps)(App)

const AppWrapper = () => {
	return (
	<Provider store={store}>
		<Container/>
	</Provider>
	)
}

export default AppWrapper