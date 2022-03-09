import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { v4 } from "uuid";

export interface UsersState {
	users: User[];
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
	users: []
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
		}
	}
});

export const { addUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const usersSelector = (state: AppState) => state.usersState.users;
