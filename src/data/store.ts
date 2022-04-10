import { configureStore } from "@reduxjs/toolkit";
import { DATA } from "./mock-data";
import {
	notificationsReducer,
	NotificationsState,
} from "./notifications/notifications";
import { tasksReducer, TasksState } from "./tasks/tasks";
import { usersReducer, UsersState } from "./users/users";

export interface AppState {
	usersState: UsersState;
	notifications: NotificationsState;
	tasksState: TasksState;
}

export const store = configureStore({
	reducer: {
		usersState: usersReducer,
		tasksState: tasksReducer,
		notifications: notificationsReducer,
	},
	preloadedState: DATA,
});
