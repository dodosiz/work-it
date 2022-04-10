import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { AppState } from "../store";
import { User } from "../users/users";

export interface TasksState {
	tasks: Task[];
	taskFormOpened: boolean;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	assignee: User | undefined;
	dateFinished: string | undefined;
}

interface CreateTaskPayload {
	title: string;
	description: string;
	assignee: User | undefined;
}

const initialState: TasksState = {
	tasks: [],
	taskFormOpened: false,
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		createTask: (state, action: PayloadAction<CreateTaskPayload>) => {
			state.tasks.push({
				id: v4(),
				dateFinished: undefined,
				...action.payload,
			});
		},
		openTaskForm: (state) => {
			state.taskFormOpened = true;
		},
		closeTaskForm: (state) => {
			state.taskFormOpened = false;
		},
	},
});

export const { createTask, openTaskForm, closeTaskForm } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export const tasksSelector = (state: AppState) => state.tasksState.tasks;
export const taskFormOpenedSelector = (state: AppState) =>
	state.tasksState.taskFormOpened;
