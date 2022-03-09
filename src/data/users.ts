import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface UsersState {
	users: User[];
}

export interface User {
	name: string;
	role: string;
}

const initialState: UsersState = {
	users: []
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			state.users.push(action.payload);
		}
	}
});

export const { addUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const usersSelector = (state: AppState) => state.usersState.users;
