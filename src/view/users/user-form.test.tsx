import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../../data/users/users";
import { Provider } from "react-redux";
import { UserForm } from "./user-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "uuid";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("userId"),
}));

describe("User form component:", () => {
	test("create a new user", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer,
			},
		});
		render(
			<Provider store={store}>
				<UserForm />
			</Provider>
		);
		userEvent.type(screen.getByLabelText("First name:"), "Thomas");
		userEvent.type(screen.getByLabelText("Last name:"), "Edison");
		userEvent.type(screen.getByLabelText("Role:"), "developer");
		userEvent.click(screen.getByRole("button", { name: "Save" }));
		expect(store.getState()).toEqual({
			usersState: {
				userFormOpened: false,
				users: [
					{
						id: "userId",
						firstName: "Thomas",
						lastName: "Edison",
						role: "developer",
					},
				],
			},
		});
	});
	test("click on cancel", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer,
			},
			preloadedState: {
				usersState: {
					users: [],
					userFormOpened: true,
					userIdToEdit: undefined,
				},
			},
		});
		render(
			<Provider store={store}>
				<UserForm />
			</Provider>
		);
		userEvent.click(screen.getByRole("button", { name: "Cancel" }));
		expect(store.getState().usersState.userFormOpened).toBeFalsy();
	});
	test("update a user", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer,
			},
			preloadedState: {
				usersState: {
					users: [
						{
							id: "1",
							firstName: "Geo",
							lastName: "Example",
							role: "Dev",
						},
					],
					userFormOpened: true,
					userIdToEdit: "1",
				},
			},
		});
		render(
			<Provider store={store}>
				<UserForm />
			</Provider>
		);
		userEvent.type(screen.getByLabelText("First name:"), "rge");
		userEvent.type(screen.getByLabelText("Role:"), "eloper");
		userEvent.click(screen.getByRole("button", { name: "Save" }));
		expect(store.getState()).toEqual({
			usersState: {
				userFormOpened: false,
				userIdToEdit: undefined,
				users: [
					{
						id: "1",
						firstName: "George",
						lastName: "Example",
						role: "Developer",
					},
				],
			},
		});
	});
});
