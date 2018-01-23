import React from 'react'

import Navbar from '../Navbar'
import NavbarBrand from '../Brand'
import NavbarToggle from '../Toggler'

describe('<Navbar/>', () => {
  it('should render Navbar', () => {
    const element = shallow(<Navbar />).getElement()
    expect(element).toMatchSnapshot()
    expect(element.type).toEqual('nav')
    expect(element.props.className).toMatch(/\bnavbar\b/)
    expect(element.props.role).toBeUndefined()
  })

  it('should add "navigation" role when not using a `<nav/>`', () => {
    const element = shallow(<Navbar tag="div" />).getElement()
    expect(element.type).toEqual('div')
    expect(element.props.role).toEqual('navigation')
  })

  it('Should add placement fixedTop variation class', () => {
    const element = shallow(<Navbar placement="fixed-top" />).getElement()
    expect(element.props.className).toMatch(/.*\bnavbar\b.*\bfixed-top\b.*/)
  })

  it('should add header with brand', () => {
    const dom = render(
      <Navbar>
        <NavbarBrand>Brand</NavbarBrand>
      </Navbar>
    )
    const brandDom = dom[0].children[0]
    expect(dom).toMatchSnapshot()
    expect(brandDom).not.toBeNull()
    expect(brandDom.name).toEqual('a')
    expect(brandDom.children[0].data).toEqual('Brand')
  })

  it('should render NavbarToggler', () => {
    const wrapper = shallow(<NavbarToggle />)

    const toggleClassName = wrapper.props().className
    expect(toggleClassName).toEqual('navbar-toggler')
  })

  it('should render NavbarToggler with position right', () => {
    const wrapper = shallow(<NavbarToggle position="right" />)
    const toggleClassName = wrapper.props().className
    expect(toggleClassName).toMatch(/.*\bnavbar-toggler-right\b.*/)
  })
})
