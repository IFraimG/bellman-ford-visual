import { describe, it, expect, beforeAll } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { VueFlow, Panel, Position } from '@vue-flow/core'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 800,
  })

  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: 600,
  })

  SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  window.alert = () => {}
})

describe('App', () => {
  it('creating a couple of vertices', async () => {
    const wrapper = mount(App)
    const el = wrapper.find('#ver-append-button')
    await el.trigger('click')
    await el.trigger('click')
    expect(wrapper.vm.nodes.length).toBe(3)
  })

  it('creating more vertices than limit', async () => {
    const wrapper = mount(App)
    const el = wrapper.find('#ver-append-button')
    for (let i = 0; i < 33; i++) {
      await el.trigger('click')
    }
    expect(wrapper.vm.nodes.length).toBe(26)
  })

  it('connect with two vertices', async () => {
    const wrapper = mount(App)
    const inputLabelIn = wrapper.find('#input-in')
    const inputLabelOut = wrapper.find('#input-out')
    const inputLabelWeight = wrapper.find('#input-weight')
    const buttonConnect = wrapper.find('#connect-ver-btn')

    await inputLabelIn.setValue('C')
    await inputLabelOut.setValue('D')
    await inputLabelWeight.setValue(10)
    await buttonConnect.trigger('click')

    expect(wrapper.vm.nodes.length).toBe(3)
  })

  it('not repeat vertices labels after creating', async () => {
    const wrapper = mount(App)

    const inputLabelIn = wrapper.find('#input-in')
    const inputLabelOut = wrapper.find('#input-out')
    const inputLabelWeight = wrapper.find('#input-weight')
    const buttonConnect = wrapper.find('#connect-ver-btn')
    const verAppendButton = wrapper.find('#ver-append-button')

    await inputLabelIn.setValue('B')
    await inputLabelOut.setValue('C')
    await inputLabelWeight.setValue(10)
    await buttonConnect.trigger('click')

    await verAppendButton.trigger('click')
    expect(wrapper.vm.nodes[wrapper.vm.nodes.length - 1].data.label).equal('D')
  })
})
