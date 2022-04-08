import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface NotificationsState {
	message: string | undefined;
}

interface AddNotificationPayload {
	message: string;
}

const initialState: NotificationsState = {
	message: undefined,
};

const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
			state.message = action.payload.message;
		},
		clearNotification: (state) => {
			state.message = undefined;
		},
	},
});

export const { addNotification, clearNotification } =
	notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;

export const notificationSelector = (state: AppState) =>
	state.notifications.message;
