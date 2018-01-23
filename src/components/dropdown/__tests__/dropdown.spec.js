import React from 'react'

import Dropdown from '../Dropdown'
import DropdownItem from '../Item'
import DropdownMenu from '../Menu'
import DropdownToggle from '../Toggle'

describe('navigation -> Dropdown', () => {
  let isOpen
  let toggle

  beforeEach(() => {
    isOpen = false
    toggle = () => {
      isOpen = !isOpen
    }
  })

  // it('should render a single child', () => {
  //   const wrapper = shallow(
  //     <Dropdown isOpen={isOpen} toggle={toggle}>
  //       Hello World
  //     </Dropdown>
  //   )
  //   const props = wrapper.props()
  //
  //   expect(wrapper).toMatchSnapshot()
  //   expect(wrapper.node.props.children).toEqual(['Hello World'])
  //   expect(props.className).toMatch(/.*\bdropdown\b.*/)
  // })

  // it('should render multiple children when isOpen is true', () => {
  //   isOpen = true
  //   const wrapper = mount(
  //     <Dropdown isOpen={isOpen} toggle={toggle}>
  //       <DropdownToggle>Toggle</DropdownToggle>
  //       <DropdownMenu>
  //         <DropdownItem>Test</DropdownItem>
  //       </DropdownMenu>
  //     </Dropdown>
  //   )
  //
  //   expect(wrapper).toMatchSnapshot()
  //   const btn = wrapper.find('show')
  //   console.log(btn)
  //   expect(btn.text()).toEqual('Toggle')
  //   expect(wrapper.find('.dropdown-menu[aria-hidden=false]').getElement()).toHaveTagName('div')
  // })

  it('should not call props.toggle when disabled', () => {
    const _toggle = jest.fn()
    const wrapper = mount(
      <Dropdown toggle={_toggle} disabled>
        <DropdownToggle>Toggle</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Test</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
    const instance = wrapper.instance()
    instance.toggle({preventDefault: () => {}})
    expect(_toggle).not.toHaveBeenCalled()
  })

  describe('handleProps', () => {
    it('should be called on componentDidUpdate when isOpen changed', () => {
      const spyComponentDidUpdate = jest.fn()
      const spyHandleProps = jest.fn()
      Dropdown.prototype.componentDidUpdate = spyComponentDidUpdate
      Dropdown.prototype.handleProps = spyHandleProps
      const wrapper = mount(
        <Dropdown isOpen={isOpen} toggle={toggle}>
          <DropdownToggle>Toggle</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Test</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

      const instance = wrapper.instance()
      expect(instance.props.isOpen).toBeFalsy()
      expect(spyComponentDidUpdate).toHaveBeenCalledTimes(0)
      expect(spyHandleProps).toHaveBeenCalledTimes(1)
    })
  })
  //
  // it('renders toggle with DropdownToggle', () => {
  //   const instance = renderIntoDocument(
  //     simpleDropdown
  //   )
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //   expect(buttonNode.textContent.match(/child title/)).toBeTruthy()
  //   expect(buttonNode.className.match(/button dropdown__toggle/)).toBeTruthy()
  // })
  //
  // it('does not render toggle button caret', () => {
  //   const instance = renderIntoDocument(
  //     <DropdownToggle noCaret>
  //       Child Text
  //     </DropdownToggle>
  //   )
  //   const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'dropdown__caret')
  //
  //   expect(caretNode.length).toEqual(0)
  // })
  //
  // it('renders custom menu', () => {
  //   const instance = renderIntoDocument(
  //     <Dropdown title="Single child" id="test-id">
  //       <DropdownToggle>Child Text</DropdownToggle>
  //
  //       <CustomMenu DBX__ROLE="menu">
  //         <MenuItem>Item 1</MenuItem>
  //       </CustomMenu>
  //     </Dropdown>
  //   )
  //
  //   const dropdownMenu = ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu)
  //   const customMenu = ReactTestUtils.scryRenderedComponentsWithType(instance, CustomMenu)
  //   expect(dropdownMenu.length).toEqual(0)
  //   expect(customMenu.length).toEqual(1)
  // })
  //
  // it('forwards pullRight to menu', () => {
  //   const instance = renderIntoDocument(
  //     <Dropdown pullRight id="test-id">
  //       {dropdownChildren}
  //     </Dropdown>
  //   )
  //   const menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu)
  //   expect(menu.props.pullRight).toBeTruthy()
  // })
  //
  // it('toggles open/closed when clicked', (done) => {
  //   const instance = renderIntoDocument(simpleDropdown)
  //   const node = ReactDOM.findDOMNode(instance)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //
  //   expect(node.className.match(/dropdown--open/)).toBeFalsy()
  //   expect(buttonNode.getAttribute('aria-expanded')).toEqual('false')
  //
  //   ReactTestUtils.Simulate.click(buttonNode)
  //
  //   immediate(() => {
  //     expect(node.className.match(/dropdown--open/)).toBeTruthy()
  //     expect(buttonNode.getAttribute('aria-expanded')).toEqual('true')
  //     done()
  //   })
  // })
  //
  // it('opens if dropdown contains no focusable menu item', () => {
  //   const instance = renderIntoDocument(
  //     <Dropdown title="custom child" id="dropdown">
  //       <DropdownToggle>Toggle</DropdownToggle>
  //       <DropdownMenu>
  //         <li>Some custom nonfocusable content</li>
  //       </DropdownMenu>
  //     </Dropdown>
  //   )
  //
  //   const node = ReactDOM.findDOMNode(instance)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //   ReactTestUtils.Simulate.click(buttonNode)
  //
  //   expect(node.className.match(/dropdown--open/)).toBeTruthy()
  // })
  //
  // it('when focused and closed toggles open when the key "down" is pressed', () => {
  //   const instance = renderIntoDocument(simpleDropdown)
  //   const node = ReactDOM.findDOMNode(instance)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //
  //   ReactTestUtils.Simulate.keyDown(buttonNode, {keyCode: keycode('down')})
  //
  //   expect(node.className.match(/\bdropdown--open\b/)).toBeTruthy()
  //   expect(buttonNode.getAttribute('aria-expanded')).toEqual('true')
  // })
  //
  // it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
  //   const instance = renderIntoDocument(simpleDropdown)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //
  //   expect(buttonNode.getAttribute('aria-haspopup')).toEqual('true')
  // })
  //
  // it('does not pass onSelect to DOM node', () => {
  //   const tspChild = tsp(simpleDropdown)
  //     .props('onSelect', () => {
  //     })
  //     .tap(m => expect(typeof m.props().onSelect).toEqual('function'))
  //     .children()
  //   expect(tspChild.onSelect).toBeUndefined()
  // })
  //
  // it('closes when child MenuItem is selected', (done) => {
  //   const instance = renderIntoDocument(
  //     simpleDropdown
  //   )
  //
  //   const node = ReactDOM.findDOMNode(instance)
  //
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //   ReactTestUtils.Simulate.click(buttonNode)
  //   immediate(() => {
  //     expect(node.className.match(/\bdropdown--open\b/)).toBeTruthy()
  //
  //     const menuItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]
  //     ReactTestUtils.Simulate.click(menuItem)
  //
  //     immediate(() => {
  //       expect(node.className.match(/\bdropdown--open\b/)).toBeFalsy()
  //       done()
  //     })
  //   })
  // })
  //
  // it('does not close when onToggle is controlled', (done) => {
  //   const handleSelect = () => {
  //   }
  //
  //   const instance = renderIntoDocument(
  //     <Dropdown open onToggle={handleSelect} id="test-id">
  //       {dropdownChildren}
  //     </Dropdown>
  //   )
  //
  //   const node = ReactDOM.findDOMNode(instance)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //
  //   const menuItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]
  //   ReactTestUtils.Simulate.click(buttonNode)
  //   immediate(() => {
  //     expect(node.className.match(/\bdropdown--open\b/)).toBeTruthy()
  //     ReactTestUtils.Simulate.click(menuItem)
  //     immediate(() => {
  //       expect(node.className.match(/\bdropdown--open\b/)).toBeTruthy()
  //       done()
  //     })
  //   })
  // })
  //
  // it('is open with explicit prop', (done) => {
  //   class OpenProp extends React.Component {
  //     constructor(props) {
  //       super(props)
  //       this.state = {
  //         open: false
  //       }
  //     }
  //
  //     render(): React$Node {
  //       return (
  //         <div>
  //           <button
  //             className="outer-button"
  //             onClick={() => this.setState({open: !this.state.open})}
  //           >
  //             Outer button
  //           </button>
  //           <Dropdown
  //             open={this.state.open}
  //             onToggle={() => {
  //             }}
  //             title="Prop open control"
  //             id="test-id"
  //           >
  //             {dropdownChildren}
  //           </Dropdown>
  //         </div>
  //       )
  //     }
  //   }
  //
  //   const instance = renderIntoDocument(<OpenProp />)
  //   const outerToggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'outer-button')
  //   const dropdownNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown')
  //
  //   expect(dropdownNode.className.match(/\bdropdown--open\b/)).toBeFalsy()
  //   ReactTestUtils.Simulate.click(outerToggle)
  //   immediate(() => {
  //     expect(dropdownNode.className.match(/\bdropdown--open\b/)).toBeTruthy()
  //     ReactTestUtils.Simulate.click(outerToggle)
  //     immediate(() => {
  //       expect(dropdownNode.className.match(/\bdropdown--open\b/)).toBeFalsy()
  //       done()
  //     })
  //   })
  // })
  //
  // it('has aria-labelledby same id as toggle button', () => {
  //   const instance = renderIntoDocument(simpleDropdown)
  //   const node = ReactDOM.findDOMNode(instance)
  //   const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //   const menuNode = node.children[1]
  //
  //   expect(buttonNode.getAttribute('id')).toEqual(menuNode.getAttribute('aria-labelledby'))
  // })
  //
  // describe('PropType validation', () => {
  //   describe('children', () => {
  //     it('menu is exclusive', () => {
  //       spyOn(console, 'error')
  //       renderIntoDocument(
  //         <Dropdown id="test">
  //           <DropdownToggle />
  //           <DropdownMenu />
  //           <DropdownMenu />
  //         </Dropdown>
  //       )
  //       expect(console.error).toHaveBeenCalledTimes(1)
  //       expect(console.error.calls.argsFor(0)).toMatch(/.*Duplicate.*DBX__ROLE: menu/)
  //     })
  //
  //     it('menu is required', () => {
  //       spyOn(console, 'error')
  //       try {
  //         renderIntoDocument(
  //           <Dropdown id="test">
  //             <DropdownToggle />
  //           </Dropdown>
  //         )
  //       } catch (e) {
  //       }
  //       expect(console.error).toHaveBeenCalledTimes(1)
  //       expect(console.error.calls.argsFor(0)).toMatch(/.*Missing.*props.DBX__ROLE = 'menu'.*/)
  //     })
  //
  //     it('toggles are not exclusive', () => {
  //       renderIntoDocument(
  //         <Dropdown id="test">
  //           <DropdownToggle />
  //           <DropdownToggle />
  //           <DropdownMenu />
  //         </Dropdown>
  //       )
  //     })
  //
  //     it('toggle is required', () => {
  //       spyOn(console, 'error')
  //       renderIntoDocument(
  //         <Dropdown id="test">
  //           <DropdownMenu />
  //         </Dropdown>
  //       )
  //       expect(console.error).toHaveBeenCalledTimes(1)
  //       expect(console.error.calls.argsFor(0)).toMatch(/.*Missing.*props.DBX__ROLE = 'toggle'.*/)
  //     })
  //   })
  // })
  //
  // it('chains refs', () => {
  //   class RefDropdown extends React.Component {
  //     render(): React$Node {
  //       return (
  //         <Dropdown ref={r => this.dropdown = r} id="test">
  //           <DropdownToggle ref={r => this.toggle = r} />
  //           <DropdownMenu ref={r => this.menu = r} />
  //         </Dropdown>
  //       )
  //     }
  //   }
  //
  //   const inst = tsp(<RefDropdown />).render().unwrap()
  //
  //   expect(inst.menu).toBeDefined()
  //   expect(inst.dropdown.menuNode).toBeDefined()
  //   expect(inst.toggle).toBeDefined()
  //   expect(inst.dropdown.toggleNode).toBeDefined()
  // })
  //
  // it('warns when a string ref is specified', () => {
  //   class RefDropdown extends React.Component {
  //     render(): React$Node {
  //       return (
  //         <Dropdown id="test">
  //           <DropdownToggle ref="toggle" />
  //           <DropdownMenu />
  //         </Dropdown>
  //       )
  //     }
  //   }
  //   spyOn(console, 'error')
  //   renderIntoDocument(<RefDropdown />)
  //
  //   expect(console.error).toHaveBeenCalledTimes(1)
  //   expect(console.error.calls.argsFor(0)).toMatch(/String refs are not supported.*/)
  // })
  //
  // describe('focusable state', () => {
  //   let focusableContainer
  //
  //   beforeEach(() => {
  //     focusableContainer = document.createElement('div')
  //     document.body.appendChild(focusableContainer)
  //   })
  //
  //   afterEach(() => {
  //     ReactDOM.unmountComponentAtNode(focusableContainer)
  //     document.body.removeChild(focusableContainer)
  //   })
  //
  //   it('when focused and closed sets focus on first menu item when the key "down" is presed', () => {
  //     const instance = reactDomRender(simpleDropdown, focusableContainer)
  //     const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //     buttonNode.focus()
  //     ReactTestUtils.Simulate.keyDown(buttonNode, {keyCode: keycode('down')})
  //     const firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]
  //     expect(document.activeElement).toEqual(firstMenuItemAnchor)
  //   })
  //
  //   it('when focused and open does not toggle closed when the key "down" is pressed', () => {
  //     const instance = renderIntoDocument(simpleDropdown)
  //     const node = ReactDOM.findDOMNode(instance)
  //     const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //
  //     ReactTestUtils.Simulate.click(buttonNode)
  //     ReactTestUtils.Simulate.keyDown(buttonNode, {keyCode: keycode('down')})
  //
  //     expect(node.className).toMatch(/\bdropdown--open\b/)
  //     expect(buttonNode.getAttribute('aria-expanded')).toEqual('true')
  //   })
  //
  //   // This test is more complicated then it appears to need. This is
  //   // because there was an intermittent failure of the test when not structured this way
  //   // The failure occured when all tests in the suite were run together, but not a subset of the tests.
  //   //
  //   // I am fairly confident that the failure is due to a test specific conflict and not an actual bug.
  //   it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', (done) => {
  //     const instance = reactDomRender(
  //       <Dropdown open role="menuitem" id="test-id">
  //         {dropdownChildren}
  //       </Dropdown>
  //       , focusableContainer)
  //
  //     const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON')
  //     const firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]
  //     expect(document.activeElement).toEqual(firstMenuItemAnchor)
  //
  //     ReactTestUtils.Simulate.keyDown(firstMenuItemAnchor, {type: 'keydown', keyCode: keycode('esc')})
  //     immediate(() => {
  //       expect(document.activeElement).toEqual(buttonNode)
  //       done()
  //     })
  //   })
  //
  //   it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', (done) => {
  //     const instance = renderIntoDocument(
  //       <Grid>
  //         {simpleDropdown}
  //         <input type="text" id="next-focusable" />
  //       </Grid>
  //     )
  //     // Need to use Grid instead of div above to make instance a composite
  //     // element, to make this call legal.
  //     const node = ReactTestUtils.findRenderedComponentWithType(instance, Dropdown)
  //     const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(node, 'BUTTON')
  //
  //     ReactTestUtils.Simulate.click(buttonNode)
  //     expect(buttonNode.getAttribute('aria-expanded')).toEqual('true')
  //
  //     ReactTestUtils.Simulate.keyDown(buttonNode, {key: keycode('tab'), keyCode: keycode('tab')})
  //     setTimeout(() => {
  //       expect(buttonNode.getAttribute('aria-expanded')).toEqual('false')
  //       done()
  //     })
  //
  //
  //     // simulating a tab event doesn't actually shift focus.
  //   // at least that seems to be the case according to SO.
  //   // hence no assert on the input having focus.
  // })
  // })
  //
  // it('should derive from parent', () => {
  //   const instance = renderIntoDocument(
  //     <Dropdown className="my-dropdown" id="test-id">
  //       <DropdownToggle className="my-toggle">
  //         Child Title
  //       </DropdownToggle>
  //       <DropdownMenu className="my-menu">
  //         <MenuItem>Item 1</MenuItem>
  //       </DropdownMenu>
  //     </Dropdown>
  //   )
  //
  //   expect(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-toggle'))
  //   expect(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-menu'))
  //
  //   expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'my-toggle').length).toEqual(1)
  //   expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'my-menu').length).toEqual(1)
  // })
  //
  // describe('dropdown menu', () => {
  //   it('clicking anything outside the menu will request close', (done) => {
  //     const requestClose = jasmine.createSpy('requestClose')
  //     const instance = renderIntoDocument(
  //       <div>
  //         <button />
  //         <Dropdown id="test" open onClose={requestClose()}>
  //           <DropdownToggle>
  //             toggle
  //           </DropdownToggle>
  //           <DropdownMenu>
  //             <MenuItem>Item</MenuItem>
  //           </DropdownMenu>
  //         </Dropdown>
  //       </div>
  //     )
  //     const button = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0]
  //     ReactTestUtils.Simulate.click(button)
  //     immediate(() => {
  //       expect(requestClose).toHaveBeenCalledTimes(1)
  //       done()
  //     })
  //   })
  // })
})
