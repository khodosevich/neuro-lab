import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/authMiddleware.ts';

type Message = {
	id?: number;
	chat_id: string;
	sender: 'user' | 'bot';
	text: string;
	timestamp: string;
	model_id?: number;
};

type ChatState = {
	messages: Message[];
};

const initialState: ChatState = {
	messages: [],
};

export const sendUserMessage = createAsyncThunk(
	'chat/sendUserMessage',
	async (message: Omit<Message, 'id' | 'timestamp'>, { rejectWithValue }) => {
		try {
			const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			const response = await api.post('/chat/messages', { ...message, timestamp });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to save message');
		}
	}
);

export const saveBotMessage = createAsyncThunk(
	'chat/saveBotMessage',
	async (message: Omit<Message, 'id' | 'timestamp'>, { rejectWithValue }) => {
		try {
			const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			const response = await api.post('/chat/messages', { ...message, timestamp });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to save bot message');
		}
	}
);

export const loadChatMessages = createAsyncThunk(
	'chat/loadChatMessages',
	async (chatId: string, { rejectWithValue }) => {
		try {
			const response = await api.get(`/chat/messages?chat_id=${chatId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to load messages');
		}
	}
);

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		clearChat: (state) => {
			state.messages = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendUserMessage.fulfilled, (state, action: PayloadAction<Message>) => {
				state.messages.push(action.payload);
			})
			.addCase(saveBotMessage.fulfilled, (state, action: PayloadAction<Message>) => {
				state.messages.push(action.payload);
			})
			.addCase(loadChatMessages.fulfilled, (state, action) => {
				state.messages = action.payload;
			})
	},
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;