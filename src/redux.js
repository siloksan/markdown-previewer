import {placeholder} from "./placeholder";
import {createStore} from 'redux'

const MARKDOWN = 'MARKDOWN'

export const showMarkdown = (text) => {
	return {
		type: MARKDOWN,
		text
	}
}

const markdownReducer = (state = { text: placeholder }, action) => {
	switch (action.type) {
		case MARKDOWN:
			return Object.assign({}, state, { text: action.text });
		default:
			return state
	}
}

const store = createStore(markdownReducer)

export default store