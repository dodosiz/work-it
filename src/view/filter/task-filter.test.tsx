import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Provider } from "react-redux";
import { filterReducer } from "../../data/filter/filter";
import { notificationsReducer } from "../../data/notifications/notifications";
import { AppState } from "../../data/store";
import { tasksReducer } from "../../data/tasks/tasks";
import { usersReducer } from "../../data/users/users";
import { TaskFilter } from "./task-filter";
import { fireEvent, render, screen } from "@testing-library/react";

const preloadedState: AppState = {
	notifications: { message: undefined },
	tasksState: { tasks: [], taskFormOpened: false, taskFormMode: "readonly" },
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
		],
		userFormOpened: true,
		userIdToEdit: undefined,
	},
	filterState: {},
};

const reducer = {
	usersState: usersReducer,
	tasksState: tasksReducer,
	notifications: notificationsReducer,
	filterState: filterReducer,
};

describe("Task filter tests:", () => {
	let store: Store<AppState, AnyAction>;
	beforeEach(() => {
		store = configureStore({
			reducer,
			preloadedState,
		});
	});
	test("search by title then remove filter", () => {
		render(
			<Provider store={store}>
				<TaskFilter />
			</Provider>
		);
		userEvent.type(screen.getByTestId("title-search"), "a title");
		userEvent.click(screen.getByRole("button", { name: "Search" }));
		expect(store.getState().filterState).toEqual({
			appliedFilter: {
				taskTitle: "a title",
			},
		});
		// remove filter by deleting the input
		userEvent.clear(screen.getByTestId("title-search"));
		expect(store.getState().filterState).toEqual({
			appliedFilter: undefined,
		});
	});
	test("search by assignee", () => {
		render(
			<Provider store={store}>
				<TaskFilter />
			</Provider>
		);
		fireEvent.change(screen.getByTestId("assignee-search"), {
			target: { value: "user2" },
		});
		userEvent.click(screen.getByRole("button", { name: "Search" }));
		expect(store.getState().filterState).toEqual({
			appliedFilter: {
				taskTitle: "",
				userId: "user2",
			},
		});
	});
});
