import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { v4 } from "uuid";

export interface UsersState {
	users: User[];
	userFormOpened: boolean;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	role: string;
}

interface AddUserPayload {
	firstName: string;
	lastName: string;
	role: string;
}

const initialState: UsersState = {
	users: [],
	userFormOpened: false
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<AddUserPayload>) => {
			state.users.push({
				id: v4(),
				...action.payload
			});
		},
		openUserForm: (state) => {
			state.userFormOpened = true;
		},
		closeUserForm: (state) => {
			state.userFormOpened = false;
		}
	}
});

export const { addUser, openUserForm, closeUserForm } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const usersSelector = (state: AppState) => state.usersState.users;
export const userFormOpenedSelector = (state: AppState) => state.usersState.userFormOpened;
