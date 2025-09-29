import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Header from "../../../src/components/Header.vue";

describe("Header", () => {
    let wrapper

    const findTitleHeader = wrapper => wrapper.find("h1")
    const findSlotContent = wrapper => wrapper.find("div.slot-content")

    const factory = ({ props = {}, slots = {} } = {}) => {
        wrapper = shallowMount(Header, {
            props,
            slots
        })
    }

    it("should render the header", () => {
        const props = {
            title: "Header",
        }
        const slots = {
            default: `<div class="slot-content">Slot</div>`
        }

        factory({ props, slots })

        const titleHeader = findTitleHeader(wrapper)

        expect(wrapper.html()).toMatchSnapshot()
        expect(titleHeader.exists()).toBe(true)
        expect(titleHeader.text()).toBe("Header")
        expect(findSlotContent(wrapper).exists()).toBe(true)
    })
});
