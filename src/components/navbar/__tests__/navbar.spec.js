import React from 'react'

import Navbar from '../Navbar'
import NavbarBrand from '../Brand'
import NavbarToggle from '../Toggler'
import {bemStylesFactory} from '@deboxsoft/webapp/utils/classnamesUtils'

const styles = bemStylesFactory({})

describe('<Navbar/>', () => {
  it('should render Navbar', () => {
    const classNames = styles.block('navbar').className
    const element = shallow(<Navbar classNames={classNames} />).getElement()
    expect(element).toMatchSnapshot()
    expect(element.type).toEqual('nav')
    expect(element.props.className).toMatch(/\bnavbar\b/)
    expect(element.props.role).toBeUndefined()
  })

  it('should add "navigation" role when not using a `<nav/>`', () => {
    const element = shallow(<Navbar tag="div" styles={styles} />).getElement()
    expect(element.type).toEqual('div')
    expect(element.props.role).toEqual('navigation')
  })

  it('Should add placement fixedTop variation class', () => {
    const classNames = styles.block('navbar').className
    const element = shallow(<Navbar placement="fixed-top" classNames={classNames} />).getElement()
    expect(element.props.className).toMatch(/.*\bnavbar\b.*\bnavbar--placement_fixed-top\b.*/)
  })

  it('should add header with brand', () => {
    const classNames = styles.block('navbar').className
    const dom = render(
      <Navbar classNames={classNames}>
        <NavbarBrand classNames={classNames}>Brand</NavbarBrand>
      </Navbar>
    )
    const brandDom = dom[0].children[0]
    expect(dom).toMatchSnapshot()
    expect(brandDom).not.toBeNull()
    expect(brandDom.name).toEqual('div')
    expect(brandDom.children[0].attribs.class).toMatch(/^navbar__brand\b.*/)
  })

  it('should render NavbarToggler', () => {
    const classNames = styles.block('navbar').className
    const wrapper = shallow(<NavbarToggle classNames={classNames} />)

    const toggleClassName = wrapper.props().className
    expect(toggleClassName).toMatch(/^navbar__toggler\b.*/)
  })

  it('should render NavbarToggler with position right', () => {
    const classNames = styles.block('navbar').className
    const wrapper = shallow(<NavbarToggle position="right" classNames={classNames} />)
    const toggleClassName = wrapper.props().className
    expect(toggleClassName).toMatch(/.*\bnavbar__toggler--position_right\b.*/)
  })
})
