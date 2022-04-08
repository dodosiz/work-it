import { configureStore } from "@reduxjs/toolkit";
import * as React from "react";
import { Provider } from "react-redux";
import { usersReducer } from "../../data/users";
import { UsersList } from "./users-list";
import {render} from "@testing-library/react";

describe("Users list component:", () => {
	test("displays a list of users", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer
			},
			preloadedState: {
				usersState: {
					users: [
						{id: "1", firstName: "George", lastName: "Daniels", role: "developer"},
						{id: "2", firstName: "Nick", lastName: "Gates", role: "graphic designer"}
					],
					userFormOpened: false
				}
			}
		});
		const component = render(<Provider store={store}>
			<UsersList />
		</Provider>,
		);
		expect(component.container).toMatchSnapshot();
	});
});
