import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import EmptyState from "../../../src/components/EmptyState.vue";

describe("EmptyState", () => {
    let wrapper

    const findIcon = wrapper => wrapper.findComponent({ name: "q-icon" });
    const findTitle = wrapper => wrapper.find("span.empty-state__title");

    const factory = ({ props = {} } = {}) => {
        wrapper = shallowMount(EmptyState, {
            props,
            global: {
                stubs: {
                    QIcon: true,
                },
            },
        });
    }

    it("should render the empty state", () => {
        const props = {
            title: "Empty State",
            icon: "empty",
        }
        factory({ props })

        const title = findTitle(wrapper)
        const icon = findIcon(wrapper)

        expect(wrapper.html()).toMatchSnapshot();

        expect(icon.exists()).toBeTruthy();
        expect(icon.attributes("name")).toBe("empty");
        expect(title.exists()).toBeTruthy();
        expect(title.text()).toBe("Empty State");
    });
});
