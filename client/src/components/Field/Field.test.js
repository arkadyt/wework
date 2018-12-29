/**
 * Contract 
 *
 * What I render (snapshot testing):
 * Always a single view wrapped in a div
 *
 * Props (effects, passing)?
 * This one is really important here. Component accepts a myriad of properties
 * and outputs a ton of different views depending on that.
 *
 * Functions (+ lifecycle hooks)?
 * momentLocalizer
 *
 * State (invalidation, effects)?
 * No
 *
 * Interaction?
 * No
 *
 * Context?
 * No
 *
 */
import React from 'react'
import { shallow } from 'enzyme'
import Field from './Field'
import cloneDeep from 'lodash.clonedeep'
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Multiselect from 'react-widgets/lib/Multiselect'

let mountedComponent
let props

const getMockProps = () => {
  return cloneDeep({
    name: "viewName",
    value: "testval",
    onChange: jest.fn(),
    placeholder: "some pl",
    error: "error!",
    label: "label!",
    list: ["item", "item2", "item3"],
    rows: 5,
    disabled: false,
    onClick: jest.fn(),
    style: { backfaceVisibility: "none" },
    inline: false,
    containerStyle: { opacity: 1 },
    children: 'some text'
  })
}

const comp = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Field {...props} />)
  }
  return mountedComponent
}

describe('Field', () => {
  beforeEach(() => {
    mountedComponent = undefined
    props = getMockProps()
  })

  describe('props effects', () => {
    describe('type', () => {
      it('renders <textarea> if type is "textarea"', () => {
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').exists()).toBe(true)
      })

      it('renders DateTimePicker if type is "date"', () => {
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).exists()).toBe(true)
      })

      it('renders DropdownList if type is "list"', () => {
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).exists()).toBe(true)
      })

      it('renders Multiselect if type is "multiselect"', () => {
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).exists()).toBe(true)
      })

      it('renders checkbox if type is "checkbox"', () => {
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').exists()).toBe(true)
      })

      it('renders submit button if type is "submit"', () => {
        props.type = "submit"
        expect(comp().find('.Field-container').find('button[type="submit"]').exists()).toBe(true)
      })

      it('renders regular button if type is "button"', () => {
        props.type = "button"
        expect(comp().find('.Field-container').find('button').prop('type')).not.toBeDefined()
      })

      it('renders link button if type is "linkButton"', () => {
        props.type = "linkButton"
        expect(comp().find('.Field-container').find('button[className="link-button"]').exists()).toBe(true)
      })

      it('renders regular input text field if type is not defined', () => {
        props.type = undefined
        expect(comp().find('.Field-container').find('input').exists()).toBe(true)
      })

      it('renders regular input if type is not recognized and passes type prop on', () => {
        const type = 'someType'
        props.type = type
        expect(comp().find('.Field-container').find(`input[type="${type}"]`).exists()).toBe(true)
      })

      it('does not render label if type is "checkbox"', () => {
        props.type = "checkbox"
        props.label = "some label"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render label if type is "submit"', () => {
        props.type = "submit"
        props.label = "some label"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render label if type is "button"', () => {
        props.type = "button"
        props.label = "some label"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render label if type is "linkButton"', () => {
        props.type = "linkButton"
        props.label = "some label"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render error if type is "checkbox"', () => {
        props.type = "checkbox"
        props.error = "some error"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render error if type is "submit"', () => {
        props.type = "submit"
        props.error = "some error"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render error if type is "button"', () => {
        props.type = "button"
        props.error = "some error"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })

      it('does not render error if type is "linkButton"', () => {
        props.type = "linkButton"
        props.error = "some error"
        expect(comp().find('.Field-container').children().length).toBe(1)
      })
    })

    describe('placeholder', () => {
      it('renders textarea with a default placeholder if prop was not specified', () => {
        props.placeholder = undefined
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('placeholder')).toBe('Say something...')
      })

      it('renders DateTimePicker with a default placeholder if prop was not specified', () => {
        props.placeholder = undefined
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('placeholder')).toBe('Pick a date...')
      })

      it('renders DropdownList with a default placeholder if prop was not specified', () => {
        props.placeholder = undefined
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('placeholder')).toBe('Choose one...')
      })

      it('renders Multiselect with a default placeholder if prop was not specified', () => {
        props.placeholder = undefined
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('placeholder')).toBe('Enter a few items...')
      })

      it('renders textarea with a passed placeholder', () => {
        const placeholder = "pl"
        props.placeholder = placeholder
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('placeholder')).toBe(placeholder)
      })

      it('renders DateTimePicker with a passed placeholder', () => {
        const pl = 'pl'
        props.placeholder = pl
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('placeholder')).toBe(pl)
      })

      it('renders DropdownList with a passed placeholder', () => {
        const pl = 'pl'
        props.placeholder = pl
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('placeholder')).toBe(pl)
      })

      it('renders Multiselect with a passed placeholder', () => {
        const pl = 'pl'
        props.placeholder = pl
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('placeholder')).toBe(pl)
      })
    })

    describe('label', () => {
      it('submit button renders children instead of props.label if latter is not defined', () => {
        const children = "children"
        props.label = undefined
        props.type = "submit"
        props.children = children
        expect(comp().find(".Field-container").find('button[type="submit"]').prop('children')).toBe(children)
      })

      it('button renders children instead of props.label if latter is not defined', () => {
        const children = "children"
        props.label = undefined
        props.type = "button"
        props.children = children
        expect(comp().find(".Field-container").find('button').prop('children')).toBe(children)
      })

      it('linkButton renders children instead of props.label if latter is not defined', () => {
        const children = "children"
        props.label = undefined
        props.type = "linkButton"
        props.children = children
        expect(comp().find(".Field-container").find('button[className="link-button"]').prop('children')).toBe(children)
      })

      it('submit button renders props.label instead of children if former is defined', () => {
        const label = 'label123'
        props.label = label
        props.type = "submit"
        expect(comp().find(".Field-container").find('button[type="submit"]').prop('children')).toBe(label)
      })

      it('button renders props.label instead of children if former is defined', () => {
        const label = 'label 123'
        props.label = label
        props.type = "button"
        expect(comp().find(".Field-container").find('button').prop('children')).toBe(label)
      })

      it('linkButton renders props.label instead of children if former is defined', () => {
        const label = 'label 123'
        props.label = label
        props.type = "linkButton"
        expect(comp().find(".Field-container").find('button[className="link-button"]').prop('children')).toBe(label)
      })
    })

    describe('inline', () => {
      it('assigns "inline" class to div.Field-container if defined', () => {
        props.inline = true
        expect(comp().find(".inline").exists()).toBe(true)
      })

      it('assigns nothing to div.Field-container if undefined', () => {
        props.inline = undefined
        expect(comp().find(".inline").exists()).toBe(false)
      })
    })
  })

  describe('props passing', () => {
    describe('textarea', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "name",
          "id",
          "value",
          "onChange",
          "placeholder",
          "className",
          "style",
          "rows"
        ]
        props.type = "textarea"
        expect(Object.keys(comp().find('.Field-container').find('textarea').props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.name for name prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('name')).toBe(name)
      })

      it('receives undefined for name prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('name')).not.toBeDefined()
      })

      it('receives props.name for id prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('id')).toBe(name)
      })

      it('receives undefined for id prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('id')).not.toBeDefined()
      })

      it('receives props.value for value prop if former is defined', () => {
        const value = "val"
        props.value =  value 
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('value')).toBe(value)
      })

      it('receives undefined for value prop if props.value is not defined', () => {
        props.value =  undefined
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('value')).not.toBeDefined()
      })

      it('receives props.onChange for onChange prop if former is defined', () => {
        const onChange = jest.fn()
        props.onChange = onChange 
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('onChange')).toBe(onChange)
      })

      it('receives undefined for onChange prop if props.onChange is not defined', () => {
        props.onChange = undefined
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('onChange')).not.toBeDefined()
      })

      it('receives props.rows for rows prop if former is defined', () => {
        const rows = 4
        props.rows = rows 
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('rows')).toBe(rows)
      })

      it('receives undefined for [rows] prop if props.rows is not defined', () => {
        delete props.rows
        props.type = "textarea"
        expect(comp().find('.Field-container').find('textarea').prop('rows')).not.toBeDefined()
      })
    })

    describe('date', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "name",
          "id",
          "value",
          "onChange",
          "placeholder",
          "time",
          "format",
          "editFormat",
          "disabled"
        ]
        props.type = "date"
        expect(Object.keys(comp().find('.Field-container').find(DateTimePicker).props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.name for name prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('name')).toBe(name)
      })

      it('receives undefined for name prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('name')).not.toBeDefined()
      })

      it('receives props.name for id prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('id')).toBe(name)
      })

      it('receives undefined for id prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('id')).not.toBeDefined()
      })

      it('receives props.value for value prop if former is defined', () => {
        const value = "val"
        props.value = value 
        props.onChange = () => {} // to supress warnings
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('value')).toBe(value)
      })

      it('receives undefined for value prop if props.value is not defined', () => {
        props.value = undefined
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('value')).not.toBeDefined()
      })

      it('receives props.onChange for onChange prop if former is defined', () => {
        const onChange = jest.fn()
        props.onChange = onChange 
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('onChange')).toBe(onChange)
      })

      it('receives undefined for onChange prop if props.onChange is not defined', () => {
        props.onChange = undefined
        props.value = undefined // to supress warnings
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('onChange')).not.toBeDefined()
      })

      it('receives props.disabled for [disabled] prop if former is defined', () => {
        const disabled = false
        props.disabled = disabled
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('disabled')).toBe(disabled)
      })

      it('receives undefined for [disabled] prop if props.disabled is not defined', () => {
        delete props.disabled
        props.type = "date"
        expect(comp().find('.Field-container').find(DateTimePicker).prop('disabled')).not.toBeDefined()
      })
    })

    describe('list', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "name",
          "id",
          "value",
          "onChange",
          "placeholder",
          "data"
        ]
        props.type = "list"
        expect(Object.keys(comp().find('.Field-container').find(DropdownList).props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.name for name prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('name')).toBe(name)
      })

      it('receives undefined for name prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('name')).not.toBeDefined()
      })

      it('receives props.name for id prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('id')).toBe(name)
      })

      it('receives undefined for id prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('id')).not.toBeDefined()
      })

      it('receives props.value for value prop if former is defined', () => {
        const value = "val"
        props.value = value 
        props.onChange = () => {} // to supress warnings
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('value')).toBe(value)
      })

      it('receives undefined for value prop if props.value is not defined', () => {
        props.value = undefined
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('value')).not.toBeDefined()
      })

      it('receives props.onChange for onChange prop if former is defined', () => {
        const onChange = jest.fn()
        props.onChange = onChange 
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('onChange')).toBe(onChange)
      })

      it('receives undefined for onChange prop if props.onChange is not defined', () => {
        props.onChange = undefined
        props.value = undefined // to supress warnings
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('onChange')).not.toBeDefined()
      })

      it('receives props.list for data prop if former is defined', () => {
        const list = ["li0", "li1"]
        props.list = list
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('data')).toBe(list)
      })

      it('receives undefined for data props if props.list is not defined', () => {
        delete props.list
        props.type = "list"
        expect(comp().find('.Field-container').find(DropdownList).prop('data')).not.toBeDefined()
      })
    })

    describe('multiselect', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "name",
          "id",
          "value",
          "onChange",
          "placeholder",
          "data"
        ]
        props.type = "multiselect"
        expect(Object.keys(comp().find('.Field-container').find(Multiselect).props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.name for name prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('name')).toBe(name)
      })

      it('receives undefined for name prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('name')).not.toBeDefined()
      })

      it('receives props.name for id prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('id')).toBe(name)
      })

      it('receives undefined for id prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('id')).not.toBeDefined()
      })

      it('receives props.value for value prop if former is defined', () => {
        const value = "val"
        props.value =  value 
        props.onChange = () => {} // to supress warnings
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('value')).toBe(value)
      })

      it('receives undefined for value prop if props.value is not defined', () => {
        props.value =  undefined
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('value')).not.toBeDefined()
      })

      it('receives props.onChange for onChange prop if former is defined', () => {
        const onChange = jest.fn()
        props.onChange = onChange 
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('onChange')).toBe(onChange)
      })

      it('receives undefined for onChange prop if props.onChange is not defined', () => {
        props.onChange = undefined
        props.value = undefined // to supress warnings
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('onChange')).not.toBeDefined()
      })

      it('receives props.list for data prop if former is defined', () => {
        const list = ["li0", "li1"]
        props.list = list
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('data')).toBe(list)
      })

      it('receives undefined for data props if props.list is not defined', () => {
        delete props.list
        props.type = "multiselect"
        expect(comp().find('.Field-container').find(Multiselect).prop('data')).not.toBeDefined()
      })
    })

    describe('checkbox', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "type",
          "name",
          "id",
          "value",
          "onChange"
        ]
        props.type = "checkbox"
        expect(Object.keys(comp().find('.Field-container').find('input[type="checkbox"]').props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.name for name prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('name')).toBe(name)
      })

      it('receives undefined for name prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('name')).not.toBeDefined()
      })

      it('receives props.name for id prop if former is defined', () => {
        const name = "name"
        props.name = name
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('id')).toBe(name)
      })

      it('receives undefined for id prop if props.name is not defined', () => {
        props.name = undefined
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('id')).not.toBeDefined()
      })

      it('receives props.value for value prop if former is defined', () => {
        const value = "val"
        props.value =  value 
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('value')).toBe(value)
      })

      it('receives undefined for value prop if props.value is not defined', () => {
        props.value =  undefined
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('value')).not.toBeDefined()
      })

      it('receives props.onChange for onChange prop if former is defined', () => {
        const onChange = jest.fn()
        props.onChange = onChange 
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('onChange')).toBe(onChange)
      })

      it('receives undefined for onChange prop if props.onChange is not defined', () => {
        props.onChange = undefined
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('input[type="checkbox"]').prop('onChange')).not.toBeDefined()
      })

      it('label wrapper receives props.name for htmlFor', () => {
        const name = "name"
        props.name = name
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('label').prop('htmlFor')).toBe(name)
      })

      it('label wrapper receives undefined for htmlFor if props.name is not defined', () => {
        props.name = undefined
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('label').prop('htmlFor')).not.toBeDefined()
      })

      it('label wrapper receives props.label in children', () => {
        const label = 'label_123'
        props.label = label
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('label').text()).toMatch(label)
      })
      
      it('label wrapper receives undefined for label in children if props.label is not defined', () => {
        delete props.label
        props.type = "checkbox"
        expect(comp().find('.Field-container').find('label').text()).toMatch(/^\s*$/)
      })
    })

    describe('submit', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "type",
          "className",
          "children"
        ]
        props.type = "submit"
        expect(Object.keys(comp().find('.Field-container').find('button[type="submit"]').props())).toStrictEqual(expectedProps)
      }) 
    })

    describe('button', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "className",
          "style",
          "onClick",
          "children"
        ]
        props.type = "button"
        expect(Object.keys(comp().find('.Field-container').find('button').props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.style for style prop if former is defined', () => {
        props.type = "button"
        const style = { margin: 0 }
        props.style = style
        expect(comp().find('.Field-container').find('button').prop('style')).toBe(style)
      })

      it('receives undefined for style prop if props.style is not defined', () => {
        delete props.style
        props.type = "button"
        expect(comp().find('.Field-container').find('button').prop('style')).not.toBeDefined()
      })

      it('receives props.onClick for onClick prop if former is defined', () => {
        const onClick = jest.fn()
        props.type = "button"
        props.onClick = onClick
        expect(comp().find('.Field-container').find('button').prop('onClick')).toBe(onClick)
      })

      it('receives undefined for onClick prop if props.onClick is not defined', () => {
        delete props.onClick
        props.type = "button"
        expect(comp().find('.Field-container').find('button').prop('onClick')).not.toBeDefined()
      })
    })

    describe('linkButton', () => {
      it('receives correct set of props', () => {
        const expectedProps = [
          "className",
          "style",
          "onClick",
          "children"
        ]
        props.type = "linkButton"
        expect(Object.keys(comp().find('.Field-container').find('button[className="link-button"]').props())).toStrictEqual(expectedProps)
      }) 

      it('receives props.style for style prop if former is defined', () => {
        props.type = "linkButton"
        const style = { margin: 0 }
        props.style = style
        expect(comp().find('.Field-container').find('button[className="link-button"]').prop('style')).toBe(style)
      })

      it('receives undefined for style prop if props.style is not defined', () => {
        delete props.style
        props.type = "linkButton"
        expect(comp().find('.Field-container').find('button[className="link-button"]').prop('style')).not.toBeDefined()
      })

      it('receives props.onClick for onClick prop if former is defined', () => {
        const onClick = jest.fn()
        props.type = "linkButton"
        props.onClick = onClick
        expect(comp().find('.Field-container').find('button[className="link-button"]').prop('onClick')).toBe(onClick)
      })

      it('receives undefined for onClick prop if props.onClick is not defined', () => {
        delete props.onClick
        props.type = "linkButton"
        expect(comp().find('.Field-container').find('button[className="link-button"]').prop('onClick')).not.toBeDefined()
      })
    })

    describe('default case input field', () => {
      describe('undefined type', () => {
        it('receives props.name for name prop if former is defined', () => {
          const name = "name"
          props.name = name
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('name')).toBe(name)
        })

        it('receives undefined for name prop if props.name is not defined', () => {
          props.name = undefined
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('name')).not.toBeDefined()
        })

        it('receives props.name for id prop if former is defined', () => {
          const name = "name"
          props.name = name
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('id')).toBe(name)
        })

        it('receives undefined for id prop if props.name is not defined', () => {
          props.name = undefined
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('id')).not.toBeDefined()
        })

        it('receives props.value for value prop if former is defined', () => {
          const value = "val"
          props.value =  value 
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('value')).toBe(value)
        })

        it('receives undefined for value prop if props.value is not defined', () => {
          props.value =  undefined
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('value')).not.toBeDefined()
        })

        it('receives props.onChange for onChange prop if former is defined', () => {
          const onChange = jest.fn()
          props.onChange = onChange 
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('onChange')).toBe(onChange)
        })

        it('receives undefined for onChange prop if props.onChange is not defined', () => {
          props.onChange = undefined
          delete props.type
          expect(comp().find('.Field-container').find('input').prop('onChange')).not.toBeDefined()
        })
      })

      describe('unrecognized type', () => {
        it('receives props.name for name prop if former is defined', () => {
          const customType = "type1234"
          const name = "name"
          props.name = name
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('name')).toBe(name)
        })

        it('receives undefined for name prop if props.name is not defined', () => {
          const customType = "type1234"
          props.name = undefined
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('name')).not.toBeDefined()
        })

        it('receives props.name for id prop if former is defined', () => {
          const customType = "type1234"
          const name = "name"
          props.name = name
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('id')).toBe(name)
        })

        it('receives undefined for id prop if props.name is not defined', () => {
          const customType = "type1234"
          props.name = undefined
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('id')).not.toBeDefined()
        })

        it('receives props.value for value prop if former is defined', () => {
          const customType = "type1234"
          const value = "val"
          props.value =  value 
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('value')).toBe(value)
        })

        it('receives undefined for value prop if props.value is not defined', () => {
          const customType = "type1234"
          props.value =  undefined
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('value')).not.toBeDefined()
        })

        it('receives props.onChange for onChange prop if former is defined', () => {
          const customType = "type1234"
          const onChange = jest.fn()
          props.onChange = onChange 
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('onChange')).toBe(onChange)
        })

        it('receives undefined for onChange prop if props.onChange is not defined', () => {
          const customType = "type1234"
          props.onChange = undefined
          props.type = customType
          expect(comp().find('.Field-container').find(`input[type="${customType}"]`).prop('onChange')).not.toBeDefined()
        })
      })
    })
  })

  describe('snapshot testing', () => {
    it('passes a snapshot test (type = "textarea")', () => {
      props.type = "textarea"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "date")', () => {
      props.type = "date"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "list")', () => {
      props.type = "list"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "multiselect")', () => {
      props.type = "multiselect"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "checkbox")', () => {
      props.type = "checkbox"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "submit")', () => {
      props.type = "submit"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "button")', () => {
      props.type = "button"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (type = "linkButton")', () => {
      props.type = "linkButton"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (custom type)', () => {
      props.type = "custom98410"
      expect(comp()).toMatchSnapshot()
    })

    it('passes a snapshot test (undefined type)', () => {
      delete props.type
      expect(comp()).toMatchSnapshot()
    })
  })
})

