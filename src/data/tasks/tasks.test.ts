import "uuid";
import { User } from "../users/users";
import {
	closeTaskForm,
	createTask,
	deleteTask,
	finishTask,
	openTaskForm,
	tasksReducer,
	TasksState,
} from "./tasks";

jest.mock("uuid", () => ({
	v4: jest.fn().mockReturnValue("taskId"),
}));

jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

const initialState: TasksState = {
	tasks: [],
	taskFormOpened: false,
	taskFormMode: "readonly",
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
		const nextState = tasksReducer(
			initialState,
			openTaskForm({ taskFormMode: "edit" })
		);
		expect(nextState.taskFormOpened).toBeTruthy();
		expect(nextState.taskFormMode).toBe("edit");
	});
	test("close the task form", () => {
		const nextState = tasksReducer(
			{
				...initialState,
				taskFormOpened: true,
				clickedTask: {
					id: "taskId",
					title: "Title",
					description: "Task description",
					assignee: mockUser,
					dateFinished: undefined,
				},
			},
			closeTaskForm()
		);
		expect(nextState.taskFormOpened).toBeFalsy();
		expect(nextState.taskFormMode).toBe("readonly");
		expect(nextState.clickedTask).toBeUndefined();
	});
	test("finish a task", () => {
		const nextState = tasksReducer(
			{
				taskFormOpened: false,
				tasks: [
					{
						id: "taskId",
						title: "Title",
						description: "Task description",
						assignee: mockUser,
						dateFinished: undefined,
					},
				],
				taskFormMode: "readonly",
			},
			finishTask({ taskId: "taskId" })
		);
		expect(nextState.tasks).toEqual([
			{
				id: "taskId",
				title: "Title",
				description: "Task description",
				assignee: mockUser,
				dateFinished: new Date("2020-01-01").toLocaleDateString(),
			},
		]);
	});
	test("delete a task", () => {
		const nextState = tasksReducer(
			{
				taskFormOpened: false,
				tasks: [
					{
						id: "taskId",
						title: "Title",
						description: "Task description",
						assignee: mockUser,
						dateFinished: undefined,
					},
				],
				taskFormMode: "readonly",
			},
			deleteTask({ taskId: "taskId" })
		);
		expect(nextState.tasks).toEqual([]);
	});
});
