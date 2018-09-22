import { mount } from "@vue/test-utils";
import Component from "@/components/Component";

describe("Component", () => {
  it("init without state", () => {
    const wrapper = mount(Component, {
      scopedSlots: {
        default: "<div />"
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.html()).toBe(`<div></div>`);
  });

  it("init", () => {
    const state = {
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: state
      },
      scopedSlots: {
        default: "<div />"
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.html()).toBe(`<div></div>`);
  });

  it("should initialize the state", () => {
    const state = {
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: state
      },
      scopedSlots: {
        default: "<div />"
      }
    });
    expect(wrapper.vm.$data).toBe(state);
  });

  it("should pass the state in scoped slots `props`", () => {
    const state = {
      msg: "Hey",
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: state
      },
      scopedSlots: {
        default: "<div slot-scope='props'>{{ props.state.msg }}</div>"
      }
    });
    expect(wrapper.vm.$data).toBe(state);
    expect(wrapper.html()).toBe(`<div>${state.msg}</div>`);
  });

  it("should `setState`", async () => {
    const state = {
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: { ...state }
      },
      scopedSlots: {
        default: `
        <div slot-scope='props'>
          {{ props.state.count }}
          <button class="btn-increment" @click="props.setState({count: props.state.count + 1})">increment</button>
        </div>`
      }
    });

    expect(wrapper.vm.$data).toEqual({ count: 0 });
    wrapper.find(".btn-increment").trigger("click");
    expect(wrapper.vm.$data).toEqual({ count: 1 });
    wrapper.find(".btn-increment").trigger("click");
    expect(wrapper.vm.$data).toEqual({ count: 2 });
    // enough
  });

  it("should call `created` prop", () => {
    const state = {
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: { ...state },
        // ⚠️
        created: ({ state }) => {
          state.count = 5;
        }
      },
      scopedSlots: {
        default: `
        <div slot-scope='props'>
          {{ props.state.count }}
        </div>`
      }
    });

    expect(wrapper.vm.$data).toEqual({ count: 5 });
  });

  it("should call `mounted` prop", () => {
    const state = {
      count: 0
    };
    const wrapper = mount(Component, {
      propsData: {
        initialState: { ...state },
        // ⚠️
        mounted: ({ state }) => {
          state.count = 5;
        }
      },
      scopedSlots: {
        default: `
        <div slot-scope='props'>
          {{ props.state.count }}
        </div>`
      }
    });

    expect(wrapper.vm.$data).toEqual({ count: 5 });
  });
});
