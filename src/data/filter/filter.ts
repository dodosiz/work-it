import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
	appliedFilter?: Filter;
}

interface Filter {
	userId?: string;
	taskTitle?: string;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setFilter: (state, action: PayloadAction<Filter>) => {
			state.appliedFilter = action.payload;
		},
		removeFilter: (state) => {
			state.appliedFilter = undefined;
		},
	},
});

export const { setFilter, removeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
