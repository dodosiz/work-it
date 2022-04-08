import { configureStore } from "@reduxjs/toolkit";
import * as React from "react";
import { Provider } from "react-redux";
import { usersReducer } from "../../data/users/users";
import { UsersList } from "./users-list";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const store = configureStore({
	reducer: {
		usersState: usersReducer,
	},
	preloadedState: {
		usersState: {
			users: [
				{
					id: "1",
					firstName: "George",
					lastName: "Daniels",
					role: "developer",
				},
				{
					id: "2",
					firstName: "Nick",
					lastName: "Gates",
					role: "graphic designer",
				},
			],
			userFormOpened: false,
			userIdToEdit: undefined,
		},
	},
});

describe("Users list component:", () => {
	test("snapshot test", () => {
		const component = render(
			<Provider store={store}>
				<UsersList />
			</Provider>
		);
		expect(component.container).toMatchSnapshot();
	});
	test("delete a user", () => {
		render(
			<Provider store={store}>
				<UsersList />
			</Provider>
		);
		userEvent.click(screen.getByTestId("delete-button-1"));
		expect(store.getState().usersState.users).toEqual([
			{
				id: "1",
				firstName: "George",
				lastName: "Daniels",
				role: "developer",
			},
		]);
	});
});
