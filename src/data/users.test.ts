import { addUser, usersReducer, UsersState } from "./users";
import "uuid";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("userId")
}));

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
			addUser({firstName: "Tom", lastName: "Johnson", role: "project manager"}));
		expect(nextState).toEqual({
			users: [{id: "userId", firstName: "Tom", lastName: "Johnson", role: "project manager"}]
		});
	});
});
