import { shallowMount } from "@vue/test-utils";
// import Vue from "vue";
import App from "../../src/App.vue";

test("Hello", async () => {
	// render the component
	const wrapper = shallowMount(App);

	// should not allow for `username` less than 7 characters, excludes whitespace
	wrapper.setData({ username: " ".repeat(7) });

	// assert the error is rendered
	expect(wrapper.find(".error").exists()).toBe(true);

	// update the name to be long enough
	await wrapper.setData({ username: "Lachlanaral" });
	// await Vue.nextTick();

	// assert the error has gone away
	expect(wrapper.find(".error").exists()).toBe(false);
});
