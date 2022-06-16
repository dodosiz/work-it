import { filterReducer, removeFilter, setFilter } from "./filter";

describe("Filter reducer", () => {
	test("set filter", () => {
		const nextState = filterReducer(
			{},
			setFilter({ taskTitle: "title", userId: "user1" })
		);
		expect(nextState).toEqual({
			appliedFilter: {
				taskTitle: "title",
				userId: "user1",
			},
		});
	});
	test("remove filter", () => {
		const nextState = filterReducer(
			{
				appliedFilter: {
					taskTitle: "title",
					userId: "user1",
				},
			},
			removeFilter()
		);
		expect(nextState).toEqual({
			appliedFilter: undefined,
		});
	});
});
