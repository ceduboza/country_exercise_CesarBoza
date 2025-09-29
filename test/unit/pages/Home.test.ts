import { nextTick } from "vue";
import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HomePage from "../../../src/pages/Home/index.vue";
import { useCountryStore } from '../../../src/stores/country-store';
import { QPage } from "quasar";

vi.mock('../../../src/stores/country-store', () => ({
    useCountryStore: vi.fn()
}))

describe("Home", () => {
    let wrapper

    const getCountryList = vi.fn()

    const findQpage = wrapper => wrapper.findComponent({ name: 'Qpage' })
    const findHeaderPage = wrapper => wrapper.findComponent({ name: 'HeaderPage' })
    const findCountryGrid = wrapper => wrapper.findComponent({ name: 'CountryGrid' })
    const findQpDrawer = wrapper => wrapper.findComponent({ name: 'QDrawer' })
    const findCountryFilterForm = wrapper => wrapper.findComponent({ name: 'CountryFilterForm' })
    const findWishlistIcon = wrapper => wrapper.findComponent({ name: 'WishlistIcon' })
    const filterButton = wrapper => wrapper.findComponent({ name: 'QBtn' })

    const contextFactory = () => {
        vi.mocked(useCountryStore).mockReturnValue({
            countries: [],
            loading: false,
            getCountryList,
        } as any)
    }

    const factory = () => {

        contextFactory()

        wrapper = shallowMount(HomePage, {
            global: {
                stubs: {
                    QPage: {
                        name: 'Qpage',
                        template: '<div unit-test-id="q-page"><slot /></div>',
                    },
                    QDrawer: {
                        name: 'QDrawer',
                        template: '<div unit-test-id="q-drawer"><slot /></div>',
                    },
                    CountryGrid: {
                        name: 'CountryGrid',
                        template: `<div unit-test-id="country-grid"><slot name="actions" :country='{ "name": "Test Country" }' /></div>`,
                    },
                    HeaderPage: {
                        name: 'HeaderPage',
                        template: '<div unit-test-id="header-page"><slot /></div>',
                    },
                    QItemLabel: true,
                    QSeparator: true,
                    QBtn: true,
                    CountryFilterForm: true,
                    WishlistIcon: true,
                },
            },
        });
    }

    describe("render", () => {
        it("should render default the component", () => {
            factory()

            expect(wrapper.html()).toMatchSnapshot()
            expect(findQpage(wrapper).exists()).toBe(true)
            expect(findHeaderPage(wrapper).exists()).toBe(true)
            expect(findCountryGrid(wrapper).exists()).toBe(true)
            expect(findQpDrawer(wrapper).exists()).toBe(true)
            expect(findCountryFilterForm(wrapper).exists()).toBe(true)
            expect(findWishlistIcon(wrapper).exists()).toBe(true)
        })
    })
    describe("events", () => {
        it("should call getCountryList when the component is mounted", () => {
            factory()

            expect(getCountryList).toHaveBeenCalled()
        })
        it("should change leftDrawerOpen value when the filter button is clicked", async () => {
            factory()

            const button = filterButton(wrapper)
            button.vm.$emit('click')

            await nextTick()

            const drawer = findQpDrawer(wrapper)

            expect(wrapper.html()).toMatchSnapshot()
            expect(drawer.attributes('modelvalue')).toBe('true')
        })
        it("should change leftDrawerOpen value when countryFilterForm emits onSubmit", async () => {
            factory()

            const button = filterButton(wrapper)
            button.vm.$emit('click')

            await nextTick()

            const countryFilterForm = findCountryFilterForm(wrapper)
            countryFilterForm.vm.$emit('onSubmit')

            await nextTick()

            const drawer = findQpDrawer(wrapper)

            expect(wrapper.html()).toMatchSnapshot()
            expect(drawer.attributes('modelvalue')).toBe('false')
        })
        it("should change leftDrawerOpen value when countryFilterForm emits onReset", async () => {
            factory()

            const button = filterButton(wrapper)
            button.vm.$emit('click')

            await nextTick()

            const countryFilterForm = findCountryFilterForm(wrapper)
            countryFilterForm.vm.$emit('onSubmit')

            await nextTick()

            const drawer = findQpDrawer(wrapper)

            expect(wrapper.html()).toMatchSnapshot()
            expect(drawer.attributes('modelvalue')).toBe('false')
        })
    });
});
