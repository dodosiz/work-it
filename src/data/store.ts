import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, UsersState } from "./users/users";

export interface AppState {
	usersState: UsersState;
}

export const store = configureStore({
	reducer: {
		usersState: usersReducer,
	},
});
