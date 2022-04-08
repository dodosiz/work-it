import { configureStore } from "@reduxjs/toolkit";
import { DATA } from "./mock-data";
import { usersReducer, UsersState } from "./users/users";

export interface AppState {
	usersState: UsersState;
}

export const store = configureStore({
	reducer: {
		usersState: usersReducer,
	},
	preloadedState: DATA,
});
