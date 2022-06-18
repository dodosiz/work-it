import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import "uuid";
import { usersReducer } from "../../data/users/users";
import { notificationsReducer } from "../../data/notifications/notifications";
import { tasksReducer } from "../../data/tasks/tasks";
import { AppState } from "../../data/store";
import { Provider } from "react-redux";
import { TaskForm } from "./task-form";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { filterReducer } from "../../data/filter/filter";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("taskId"),
}));

const preloadedState: AppState = {
	notifications: { message: undefined },
	tasksState: { tasks: [], taskFormOpened: false, taskFormMode: "edit" },
	usersState: {
		users: [
			{
				id: "user1",
				firstName: "Alejandro",
				lastName: "Matthews",
				role: "Project manager",
			},
			{
				id: "user2",
				firstName: "Mai",
				lastName: "Yoder",
				role: "UI/UX designer",
			},
			{
				id: "user3",
				firstName: "Wade",
				lastName: "Delgado",
				role: "Marketing",
			},
		],
		userFormOpened: true,
		userIdToEdit: undefined,
	},
	filterState: {},
};

describe("Task form component:", () => {
	test("create a new task", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer,
				tasksState: tasksReducer,
				notifications: notificationsReducer,
				filterState: filterReducer,
			},
			preloadedState,
		});
		render(
			<Provider store={store}>
				<TaskForm />
			</Provider>
		);
		userEvent.type(screen.getByLabelText("Title:"), "Create web app.");
		userEvent.type(
			screen.getByLabelText("Description:"),
			"Create a web app with React."
		);
		fireEvent.change(screen.getByTestId("assignee"), {
			target: { value: "user2" },
		});
		userEvent.click(screen.getByRole("button", { name: "Save" }));
		expect(store.getState().tasksState.tasks).toEqual([
			{
				id: "taskId",
				assignee: {
					firstName: "Mai",
					id: "user2",
					lastName: "Yoder",
					role: "UI/UX designer",
				},
				dateFinished: undefined,
				description: "Create a web app with React.",
				title: "Create web app.",
			},
		]);
		expect(store.getState().notifications.message).toBe(
			"Created task: Create web app."
		);
	});
	test("task opened in read only mode", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer,
				tasksState: tasksReducer,
				notifications: notificationsReducer,
				filterState: filterReducer,
			},
			preloadedState: {
				...preloadedState,
				tasksState: {
					...preloadedState.tasksState,
					taskFormMode: "readonly",
					clickedTask: {
						id: "task1",
						assignee: {
							id: "user2",
							firstName: "John",
							lastName: "Doe",
							role: "Developer",
						},
						title: "Plan the requirements for the next release.",
						dateFinished: undefined,
						description: "",
					},
				},
			},
		});
		const editor = render(
			<Provider store={store}>
				<TaskForm />
			</Provider>
		);
		expect(editor.container).toMatchSnapshot();
	});
});
