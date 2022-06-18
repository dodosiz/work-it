import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { AppState } from "../store";
import { User } from "../users/users";

export interface TasksState {
	tasks: Task[];
	taskFormOpened: boolean;
	taskFormMode: "readonly" | "edit";
	clickedTask?: Task;
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

interface EditTaskPayload extends CreateTaskPayload {
	id: string;
}

interface FinishTaskPayload {
	taskId: string;
}

interface DeleteTaskPayload {
	taskId: string;
}

interface OpenTaskFormPayload {
	taskFormMode: "readonly" | "edit";
	clickedTask?: Task;
}

const initialState: TasksState = {
	tasks: [],
	taskFormOpened: false,
	taskFormMode: "readonly",
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
		editTask: (state, action: PayloadAction<EditTaskPayload>) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.tasks.splice(index, 1, {
				...action.payload,
				dateFinished: undefined,
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
		openTaskForm: (state, action: PayloadAction<OpenTaskFormPayload>) => {
			state.taskFormOpened = true;
			state.taskFormMode = action.payload.taskFormMode;
			state.clickedTask = action.payload.clickedTask;
		},
		closeTaskForm: (state) => {
			state.taskFormOpened = false;
			state.taskFormMode = "readonly";
			state.clickedTask = undefined;
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
	editTask,
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
export const clickedTaskSelector = (state: AppState) =>
	state.tasksState.clickedTask;
export const taskFormModeSelector = (state: AppState) =>
	state.tasksState.taskFormMode;
