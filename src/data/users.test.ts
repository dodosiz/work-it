import { addUser, usersReducer, UsersState } from "./users";

describe("Users reducer:", () => {
	test("initial state", () => {
		const nextState = usersReducer(undefined, {type: ""});
		expect(nextState).toEqual({users: []});
	});
	test("add a user", () => {
		const initialState: UsersState = {
			users: []
		};
		const nextState = usersReducer(
			initialState,
			addUser({name: "Tom", role: "project manager"}));
		expect(nextState).toEqual({
			users: [{name: "Tom", role: "project manager"}]
		});
	});
});
