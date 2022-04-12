import * as React from "react";
import { tasksReducer } from "../../data/tasks/tasks";
import { TasksList } from "./tasks-list";
import { render, screen } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { usersReducer } from "../../data/users/users";
import { notificationsReducer } from "../../data/notifications/notifications";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

describe("Tasks list:", () => {
	let store: EnhancedStore;
	beforeEach(() => {
		store = configureStore({
			reducer: {
				usersState: usersReducer,
				notifications: notificationsReducer,
				tasksState: tasksReducer,
			},
			preloadedState: {
				notifications: undefined,
				tasksState: {
					taskFormOpened: false,
					tasks: [
						{
							id: "task1",
							assignee: {
								id: "user1",
								firstName: "Alejandro",
								lastName: "Matthews",
								role: "Project manager",
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
							title:
								"Meet with the stakeholders to discuss the new requirements.",
							dateFinished: undefined,
							description: "",
						},
						{
							id: "task3",
							assignee: {
								id: "user1",
								firstName: "Alejandro",
								lastName: "Matthews",
								role: "Project manager",
							},
							title:
								"Meet with the stakeholders to discuss the new requirements.",
							dateFinished: "2020-01-01",
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
					],
				},
			},
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
	});
	test("done list", () => {
		render(
			<Provider store={store}>
				<TasksList mode={"done"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(0);
		expect(screen.queryAllByTestId("check-task2").length).toBe(0);
		expect(screen.queryAllByTestId("check-task3").length).toBe(1);
	});
	test("check tasks", async () => {
		render(
			<Provider store={store}>
				<TasksList mode={"todo"} />
			</Provider>
		);
		expect(screen.queryAllByTestId("check-task1").length).toBe(1);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
		userEvent.click(screen.getByTestId("check-task1"));
		await new Promise((r) => setTimeout(r, 2000));
		expect(screen.queryAllByTestId("check-task1").length).toBe(0);
		expect(screen.queryAllByTestId("check-task2").length).toBe(1);
	});
});
