import { configureStore } from "@reduxjs/toolkit";
import * as React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { usersReducer } from "../data/users";
import { Users } from "./users";

describe("Users component:", () => {
	test("displays a list of users", () => {
		const store = configureStore({
			reducer: {
				usersState: usersReducer
			},
			preloadedState: {
				usersState: {
					users: [
						{name: "George", role: "developer"},
						{name: "Nick", role: "graphic designer"}
					]
				}
			}
		});
		const component = renderer.create(
			<Provider store={store}>
				<Users />
			</Provider>
		);
		expect(component).toMatchSnapshot();
	});
});
