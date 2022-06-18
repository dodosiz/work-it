import * as React from "react";
import { tasksReducer } from "../../data/tasks/tasks";
import { TasksList } from "./tasks-list";
import { render, screen } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { usersReducer } from "../../data/users/users";
import { notificationsReducer } from "../../data/notifications/notifications";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { filterReducer } from "../../data/filter/filter";

const preloadedState = {
	notifications: undefined,
	tasksState: {
		taskFormOpened: false,
		tasks: [
			{
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
			{
				id: "task2",
				assignee: {
					id: "user1",
					firstName: "Alejandro",
					lastName: "Matthews",
					role: "Project manager",
				},
				title: "Meet with the stakeholders to discuss the new requirements.",
				dateFinished: undefined,
				description: "",
			},
			{
				id: "task3",
				assignee: {
					id: "user2",
					firstName: "John",
					lastName: "Doe",
					role: "Developer",
				},
				title: "Fix the production bugs",
				dateFinished: "2020-01-01",
				description: "",
			},
			{
				id: "task4",
				assignee: {
					id: "user2",
					firstName: "John",
					lastName: "Doe",
					role: "Developer",
				},
				title: "Develop the landing page.",
				dateFinished: "2020-02-13",
				description: "",
			},
		],
	},
	usersState: {
		userFormOpened: false,
		userIdToEdit: undefined,
		users: [
			{
				id: "user1",
				firstName: "Alejandro",
				lastName: "Matthews",
				role: "Project manager",
			},
			{
				id: "user2",
				firstName: "John",
				lastName: "Doe",
				role: "Developer",
			},
		],
	},
	filterState: {},
};

const reducer = {
	usersState: usersReducer,
	notifications: notificationsReducer,
	tasksState: tasksReducer,
	filterState: filterReducer,
};

describe("Tasks list:", () => {
	let store: EnhancedStore;
	beforeEach(() => {
		store = configureStore({
			reducer,
			preloadedState,
		});
	});
	test("todo list", () => {
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
		expect(screen.queryAllByTestId("check-task3").length).toBe(0);
		expect(screen.queryAllByTestId("check-task4").length).toBe(0);
	});
	test("done list", () => {
		const doneList = render(
			<Provider store={store}>
				<TasksList mode={"done"} />
			</Provider>
		);
		// in the snapshot we can see the tasks are ordered by date
		expect(doneList.container).toMatchSnapshot();
	});
	test("check tasks", async () => {
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
		userEvent.click(screen.getByTestId("check-box-task1"));
		await new Promise((r) => setTimeout(r, 2000));
		expect(screen.queryAllByTestId("check-task1").length).toBe(0);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
	});
	test("with applied title filter", async () => {
		store = configureStore({
			reducer,
			preloadedState: {
				...preloadedState,
				filterState: {
					appliedFilter: {
						taskTitle: "Stakeholders",
					},
				},
			},
		});
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(0);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
		expect(screen.queryAllByTestId("check-task3").length).toBe(0);
		expect(screen.queryAllByTestId("check-task4").length).toBe(0);
	});
	test("with applied user filter", async () => {
		store = configureStore({
			reducer,
			preloadedState: {
				...preloadedState,
				filterState: {
					appliedFilter: {
						userId: "user2",
					},
				},
			},
		});
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(0);
		expect(screen.queryAllByTestId("check-task3").length).toBe(0);
		expect(screen.queryAllByTestId("check-task4").length).toBe(0);
	});
	test("delete a task", () => {
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		// before the delete
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
		userEvent.click(screen.getByTestId("delete-button-task2"));
		// after the delete
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(0);
	});
});
