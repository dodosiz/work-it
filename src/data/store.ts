import { configureStore } from "@reduxjs/toolkit";
import { DATA } from "./mock-data";
import {
	notificationsReducer,
	NotificationsState,
} from "./notifications/notifications";
import { usersReducer, UsersState } from "./users/users";

export interface AppState {
	usersState: UsersState;
	notifications: NotificationsState;
}

export const store = configureStore({
	reducer: {
		usersState: usersReducer,
		notifications: notificationsReducer,
	},
	preloadedState: DATA,
});
