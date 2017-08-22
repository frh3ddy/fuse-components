import Observable from 'FuseJS/Observable'

export const isInputFocused = Observable(false)

export function focusInput () {
    isInputFocused.value = true
}