import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import * as React from "react";
import { Provider } from "react-redux";
import { usersReducer } from "../../data/users/users";
import { UsersList } from "./users-list";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Users list component:", () => {
	let store: EnhancedStore;
	let component: RenderResult;
	beforeEach(() => {
		store = configureStore({
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
		component = render(
			<Provider store={store}>
				<UsersList />
			</Provider>
		);
	});
	test("snapshot test", () => {
		expect(component.container).toMatchSnapshot();
	});
	test("delete a user", () => {
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
	test("edit a user", () => {
		userEvent.click(screen.getByTestId("edit-button-1"));
		expect(store.getState().usersState.userIdToEdit).toEqual("2");
	});
});
