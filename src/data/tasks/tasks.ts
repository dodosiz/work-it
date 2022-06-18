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

interface FinishTaskPayload {
	taskId: string;
}

interface DeleteTaskPayload {
	taskId: string;
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
		finishTask: (state, action: PayloadAction<FinishTaskPayload>) => {
			const task = state.tasks.find(
				(task) => task.id === action.payload.taskId
			);
			if (task) {
				task.dateFinished = new Date().toLocaleDateString();
			}
		},
		openTaskForm: (state) => {
			state.taskFormOpened = true;
		},
		closeTaskForm: (state) => {
			state.taskFormOpened = false;
		},
		deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.taskId
			);
			state.tasks.splice(index, 1);
		},
	},
});

export const {
	createTask,
	openTaskForm,
	closeTaskForm,
	finishTask,
	deleteTask,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export const tasksSelector = (mode: "todo" | "done") => {
	return (state: AppState) => {
		const tasksByMode = state.tasksState.tasks.filter((task) =>
			mode === "todo" ? !task.dateFinished : task.dateFinished
		);
		const appliedFilter = state.filterState.appliedFilter;
		if (appliedFilter) {
			return tasksByMode.filter((task) => {
				const taskTitle = task.title.toLowerCase();
				const descriptionMatches =
					appliedFilter.taskTitle && appliedFilter.taskTitle !== ""
						? taskTitle.includes(appliedFilter.taskTitle.toLowerCase())
						: true;
				const assigneeMatches = appliedFilter.userId
					? task.assignee?.id === appliedFilter.userId
					: true;
				return descriptionMatches && assigneeMatches;
			});
		} else {
			return tasksByMode;
		}
	};
};
export const finishedTasksSelector = (state: AppState) =>
	state.tasksState.tasks.filter((task) => task.dateFinished !== undefined);
export const taskFormOpenedSelector = (state: AppState) =>
	state.tasksState.taskFormOpened;
