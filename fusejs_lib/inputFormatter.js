'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = templateFormatter
// Takes a `template` where character placeholders
// are denoted by 'x'es (e.g. 'x (xxx) xxx-xx-xx').
//
// Returns a function which takes `value` characters
// and returns the `template` filled with those characters.
// If the `template` can only be partially filled
// then it is cut off.
//
// If `shouldCloseBraces` is `true`,
// then it will also make sure all dangling braces are closed,
// e.g. "8 (8" -> "8 (8  )" (iPhone style phone number input).
//
function templateFormatter (template) {
  var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x'
  var shouldCloseBraces = arguments[2]

  if (!template) {
    return function (value) {
      return { text: value }
    }
  }

  var charactersInTemplate = countOccurences(placeholder, template)

  return function (value) {
    if (!value) {
      return { text: '', template: template }
    }

    var valueCharacterIndex = 0
    var filledInTemplate = ''

    var _iteratorNormalCompletion = true
    var _didIteratorError = false
    var _iteratorError

    try {
      for (var _iterator = template[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var character = _step.value

        if (character !== placeholder) {
          filledInTemplate += character
          continue
        }

        filledInTemplate += value[valueCharacterIndex]
        valueCharacterIndex++

        // If the last available value character has been filled in,
        // then return the filled in template
        // (either trim the right part or retain it,
        //  if no more character placeholders in there)
        if (valueCharacterIndex === value.length) {
          // If there are more character placeholders
          // in the right part of the template
          // then simply trim it.
          if (value.length < charactersInTemplate) {
            break
          }
        }
      }
    } catch (err) {
      _didIteratorError = true
      _iteratorError = err
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return()
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError
        }
      }
    }

    if (shouldCloseBraces) {
      filledInTemplate = closeBraces(filledInTemplate, template)
    }

    return { text: filledInTemplate, template: template }
  }
}

function closeBraces (retainedTemplate, template) {
  var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'x'
  var emptyPlaceholder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' '

  var cutBefore = retainedTemplate.length

  var openingBraces = countOccurences('(', retainedTemplate)
  var closingBraces = countOccurences(')', retainedTemplate)

  var danglingBraces = openingBraces - closingBraces

  while (danglingBraces > 0 && cutBefore < template.length) {
    retainedTemplate += template[cutBefore].replace(placeholder, emptyPlaceholder)

    if (template[cutBefore] === ')') {
      danglingBraces--
    }

    cutBefore++
  }

  return retainedTemplate
}

function countOccurences (symbol, string) {
  var count = 0

  var _iteratorNormalCompletion2 = true
  var _didIteratorError2 = false
  var _iteratorError2

  try {
    for (var _iterator2 = string[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var character = _step2.value

      if (character === symbol) {
        count++
      }
    }
  } catch (err) {
    _didIteratorError2 = true
    _iteratorError2 = err
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return()
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2
      }
    }
  }

  return count
}
