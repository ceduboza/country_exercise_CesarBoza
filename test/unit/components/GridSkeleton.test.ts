import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import GridSkeleton from "../../../src/components/GridSkeleton.vue";

describe("GridSkeleton", () => {
    let wrapper

    const findAllSkeletons = wrapper => wrapper.findAllComponents({ name: "CountryCardSkeleton" });

    const factory = () => {
        wrapper = shallowMount(GridSkeleton, {
            global: {
                stubs: {
                    CountryCardSkeleton: true,
                },
            },
        })
    }

    it("should render the grid skeleton", () => {
        factory()

        expect(wrapper.html()).toMatchSnapshot();
        expect(findAllSkeletons(wrapper).length).toBe(9);
    });
});
