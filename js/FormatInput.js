import templateFormatter from 'fusejs_lib/inputFormatter'
import Observable from 'FuseJS/Observable'

export var username = Observable('')
export var password = Observable('')
export var phoneNumber = Observable('')
export var price = Observable('')

handleFormatting(phoneNumber, '(xxx) xxx-xxxx')
handleFormatting(price, '$xxx.xx')

function handleFormatting (observable, TEMPLATE) {
  const format = templateFormatter(TEMPLATE)
  let lastFormattedValue

  observable.onValueChanged(module, value => {
    if (value !== '') {
      if (lastFormattedValue) {
        // check if the value is actually different, to prevent a possible infinite loop
        if (value !== lastFormattedValue) {
          formatValue(value)
        }
      } else {
        formatValue(value)
      }
    }
  })

  function formatValue (value) {
    const numbers = getNumbersFromString(value)
    lastFormattedValue = format(numbers).text
    observable.value = format(numbers).text
  }
}

function getNumbersFromString (string) {
  let numbers = string.match(/\d/g)
  return numbers ? numbers.join('') : ''
}
