import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
	users: User[];
}

interface User {
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
