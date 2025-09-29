import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import WishlistPage from "../../../src/pages/Wishlist/index.vue";
import { useWishlist } from "../../../src/modules/Wishlist/infraestructure/wishlist";
import { ICountryUI } from "../../../src/modules/Countries/domain/entities/ICountryUI";

vi.mock("../../../src/modules/Wishlist/infraestructure/wishlist", () => ({
    useWishlist: vi.fn()
}))

interface ContextMock {
    wishlist: ICountryUI[]
}

describe("Wishlist", () => {
    let wrapper

    const findQpage = wrapper => wrapper.findComponent({ name: 'Qpage' })
    const findHeaderPage = wrapper => wrapper.findComponent({ name: 'HeaderPage' })
    const findCountryGrid = wrapper => wrapper.findComponent({ name: 'CountryGrid' })
    const findEmptyState = wrapper => wrapper.findComponent({ name: 'EmptyState' })
    const findWishlistIcon = wrapper => wrapper.findComponent({ name: 'WishlistIcon' })

    const contextFactory = (contextMock?: ContextMock) => {
        vi.mocked(useWishlist).mockReturnValue({
            wishlist: contextMock?.wishlist || []
        } as any)
    }

    const factory = (contextMock?: ContextMock) => {
        contextFactory(contextMock)

        wrapper = shallowMount(WishlistPage, {
            global: {
                stubs: {
                    QPage: {
                        name: 'Qpage',
                        template: '<div unit-test-id="q-page"><slot /></div>',
                        props: ['title']
                    },
                    CountryGrid: {
                        name: 'CountryGrid',
                        template: `<div unit-test-id="country-grid"><slot name="actions" :country='{ "name": "Test Country" }' /></div>`,
                    },
                    HeaderPage: true,
                    EmptyState: true,
                    WishlistIcon: true
                }
            }
        })
    }

    it("should render the wishlist page if wishlist is empty", () => {
        factory()

        expect(wrapper.html()).toMatchSnapshot()
        expect(findQpage(wrapper).exists()).toBeTruthy()
        expect(findEmptyState(wrapper).exists()).toBeTruthy()
        expect(findCountryGrid(wrapper).exists()).toBeFalsy()
        expect(findHeaderPage(wrapper).exists()).toBeTruthy()
        expect(findWishlistIcon(wrapper).exists()).toBeFalsy()
    })
    it("should render the wishlist page if wishlist is not empty", () => {
        const contextMock = {
            wishlist: [{
                name: "Country",
                capital: "Capital",
                population: 1000000,
                region: "Region",
                flag: "Flag"
            }]
        }
        factory(contextMock)

        expect(wrapper.html()).toMatchSnapshot()
        expect(findQpage(wrapper).exists()).toBeTruthy()
        expect(findEmptyState(wrapper).exists()).toBeFalsy()
        expect(findCountryGrid(wrapper).exists()).toBeTruthy()
        expect(findHeaderPage(wrapper).exists()).toBeTruthy()
        expect(findWishlistIcon(wrapper).exists()).toBeTruthy()
    })
})
