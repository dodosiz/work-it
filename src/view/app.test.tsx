import * as React from "react";
import renderer from "react-test-renderer";
import { App } from "./app";

describe("App", () => {
	test("snapshot test", () => {
		const appComponent = renderer.create(<App />);
		expect(appComponent).toMatchSnapshot();
	});
});
