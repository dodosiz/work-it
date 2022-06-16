import { configureStore } from "@reduxjs/toolkit";
import { filterReducer, FilterState } from "./filter/filter";
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
	filterState: FilterState;
}

export const store = configureStore({
	reducer: {
		usersState: usersReducer,
		tasksState: tasksReducer,
		notifications: notificationsReducer,
		filterState: filterReducer,
	},
	preloadedState: DATA,
});
