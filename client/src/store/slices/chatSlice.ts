import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Message = {
	sender: 'user' | 'bot';
	text: string;
	timestamp: string;
};
type ChatState = {
	messages: Message[];
};

const initialState: ChatState = {
	messages: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addUserMessage: (state, action: PayloadAction<string>) => {
			state.messages.push({
				sender: 'user',
				text: action.payload,
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			});
		},
		addBotMessage: (state, action: PayloadAction<string>) => {
			state.messages.push({
				sender: 'bot',
				text: action.payload,
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			});
		},
		setMessages: (state, action: PayloadAction<Message[]>) => {
			state.messages = action.payload;
		},
		clearChat: (state) => {
			state.messages = [];
		},
	}
});

export const { addUserMessage, addBotMessage, setMessages, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
