import {
	addUser,
	closeUserForm,
	deleteUser,
	openUserForm,
	usersReducer,
	UsersState,
} from "./users";
import "uuid";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("userId"),
}));

const initialState: UsersState = {
	users: [],
	userFormOpened: false,
};

describe("Users reducer:", () => {
	test("initial state", () => {
		const nextState = usersReducer(undefined, { type: "" });
		expect(nextState).toEqual({ users: [], userFormOpened: false });
	});
	test("add a user", () => {
		const nextState = usersReducer(
			initialState,
			addUser({
				firstName: "Tom",
				lastName: "Johnson",
				role: "project manager",
			})
		);
		expect(nextState.users).toEqual([
			{
				id: "userId",
				firstName: "Tom",
				lastName: "Johnson",
				role: "project manager",
			},
		]);
	});
	test("open the user form", () => {
		const nextState = usersReducer(initialState, openUserForm());
		expect(nextState.userFormOpened).toBeTruthy();
	});
	test("close the user form", () => {
		const nextState = usersReducer(
			{ ...initialState, userFormOpened: true },
			closeUserForm()
		);
		expect(nextState.userFormOpened).toBeFalsy();
	});
	test("delete a user", () => {
		const nextState = usersReducer(
			{
				users: [
					{
						firstName: "Max",
						lastName: "Ben",
						role: "front end delveloper",
						id: "1",
					},
					{
						firstName: "George",
						lastName: "Markson",
						role: "designer",
						id: "2",
					},
					{
						firstName: "Mike",
						lastName: "Madisson",
						role: "back end delveloper",
						id: "3",
					},
				],
				userFormOpened: false,
			},
			deleteUser({ id: "2" })
		);
		expect(nextState.users).toEqual([
			{
				firstName: "Max",
				lastName: "Ben",
				role: "front end delveloper",
				id: "1",
			},
			{
				firstName: "Mike",
				lastName: "Madisson",
				role: "back end delveloper",
				id: "3",
			},
		]);
	});
});
