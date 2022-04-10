import "uuid";
import { User } from "../users/users";
import {
	closeTaskForm,
	createTask,
	openTaskForm,
	tasksReducer,
	TasksState,
} from "./tasks";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("taskId"),
}));

const initialState: TasksState = {
	tasks: [],
	taskFormOpened: false,
};

const mockUser: User = {
	id: "userId",
	firstName: "Max",
	lastName: "Example",
	role: "Developer",
};

describe("Tasks reducer:", () => {
	test("add a task", () => {
		const nextState = tasksReducer(
			initialState,
			createTask({
				assignee: mockUser,
				description: "Task description",
				title: "Title",
			})
		);
		expect(nextState.tasks).toEqual([
			{
				id: "taskId",
				title: "Title",
				description: "Task description",
				assignee: mockUser,
				dateFinished: undefined,
			},
		]);
	});
	test("open the task form", () => {
		const nextState = tasksReducer(initialState, openTaskForm());
		expect(nextState.taskFormOpened).toBeTruthy();
	});
	test("close the task form", () => {
		const nextState = tasksReducer(
			{ ...initialState, taskFormOpened: true },
			closeTaskForm()
		);
		expect(nextState.taskFormOpened).toBeFalsy();
	});
});
