import Observable from 'FuseJS/Observable'

export const isInputFocused = Observable(false)
export const inputValue = Observable('')

export function logic () {
  if (inputValue.value === '') isInputFocused.value = false
}

export function focusInput (args) {
  isInputFocused.value = true
}
