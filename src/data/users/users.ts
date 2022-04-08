import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { v4 } from "uuid";

export interface UsersState {
	users: User[];
	userIdToEdit: string | undefined;
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

interface UpdateUserPayload {
	id: string;
	firstName: string;
	lastName: string;
	role: string;
}

interface UserIdPayload {
	id: string;
}

const initialState: UsersState = {
	users: [],
	userIdToEdit: undefined,
	userFormOpened: false,
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<AddUserPayload>) => {
			state.users.push({
				id: v4(),
				...action.payload,
			});
		},
		deleteUser: (state, action: PayloadAction<UserIdPayload>) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			state.users.splice(index, 1);
		},
		editUser: (state, action: PayloadAction<UserIdPayload>) => {
			state.userIdToEdit = action.payload.id;
		},
		updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			state.users.splice(index, 1, action.payload);
		},
		openUserForm: (state) => {
			state.userFormOpened = true;
		},
		closeUserForm: (state) => {
			state.userFormOpened = false;
		},
	},
});

export const {
	addUser,
	deleteUser,
	editUser,
	updateUser,
	openUserForm,
	closeUserForm,
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const usersSelector = (state: AppState) => state.usersState.users;
export const userFormOpenedSelector = (state: AppState) =>
	state.usersState.userFormOpened;
export const editedUserSelector = (state: AppState) => {
	return state.usersState.users.find(
		(u) => u.id === state.usersState.userIdToEdit
	);
};
