import {
	addNotification,
	clearNotification,
	notificationsReducer,
} from "./notifications";

describe("Notifications reducer:", () => {
	test("add notification", () => {
		const nextState = notificationsReducer(
			{ message: undefined },
			addNotification({ message: "new notification" })
		);
		expect(nextState).toEqual({ message: "new notification" });
	});
	test("remove notification", () => {
		const nextState = notificationsReducer(
			{ message: "new notification" },
			clearNotification()
		);
		expect(nextState).toEqual({ message: undefined });
	});
});
