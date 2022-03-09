import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../data/users";
import { Provider } from "react-redux";
import { CreateUserForm } from "./create-user-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Create user form component:", () => {
	test("create a new user", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer
			}
		});
		render(<Provider store={store}>
			<CreateUserForm />
		</Provider>);
		userEvent.type(screen.getByLabelText("Name:"), "Thomas");
		userEvent.type(screen.getByLabelText("Role:"), "developer");
		userEvent.click(screen.getByRole("button", {name: "Submit"}));
		expect(store.getState()).toEqual({
			usersState: {
				users: [{name: "Thomas", role: "developer"}]
			}
		});
	});
});
