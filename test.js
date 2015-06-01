/*!
 * hex-color-regex <https://github.com/regexps/hex-color-regex>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var hexColorRegex = require('./index')

var sixDigits = {
  pass: [
    '#afebe3',
    '#AFEBE3',
    '#3cb371',
    '#3CB371',
    '#556b2f',
    '#556B2F',
    '#708090',
    '#7b68ee',
    '#7B68EE',
    '#eeeeee',
    '#ffffff',
    '#123fff}',
    '#111111'
  ],
  fail: [
    'afebe3',
    'AFEBE3',
    '3cb371',
    'ABC371',
    '556b2f',
    '5A6B2F',
    '708090',
    '7b68ee',
    '7B68EE',
    'eeeeee',
    'ffffff',
    '111111',
    'afebef',
    '3c537f',
    '556B2f',
    '708135',
    'EE3EF1',
    '7f68ZY',
    '#7f68ZY',
    '#7z68ZY',
    '#GR68',
    '#Z68',
    '#666EFR'
  ]
}

var threeDigits = {
  pass: [
    '#afe',
    '#AF3',
    '#3cb',
    '#3CB',
    '#b2f',
    '#5B2',
    '#708',
    '#68e',
    '#7AF',
    '#777',
    '#FFF',
    '#fff',
    '#f3f}',
    '#111'
  ],
  fail: [
    'fff',
    '4zy',
    '4g1',
    '111',
    'Ge3',
    'zY1',
    '#ggg',
    '#4zy',
    '#4g1',
    '#Ge3',
    '#zY1'
  ]
}

test('hex-color-regex:', function () {
  test('in no strict mode', function () {
    test('six digit hex', function () {
      test('should be `true`', function () {
        sixDigits.pass.forEach(function (hex) {
          test('when `' + hex + '` value', function () {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
      })
      test('should be `false`', function () {
        sixDigits.fail.forEach(function (hex) {
          test('when `' + hex + '` value', function () {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('three digit hex', function () {
      test('should be `true`', function () {
        threeDigits.pass.forEach(function (hex) {
          test('when `' + hex + '` value', function () {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
      })
      test('should be `false`', function () {
        threeDigits.fail.forEach(function (hex) {
          test('when `' + hex + '` value', function () {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('using regex().exec(hex)', function () {
      sixDigits.pass.forEach(function (hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function () {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
      threeDigits.pass.forEach(function (hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function () {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
    })
  })
  test('in strict mode', function () {
    test('six digit hex `#123fff}` should return false', function () {
      test.equal(hexColorRegex({strict: true}).test('#123fff}'), false)
    })
    test('three digit hex `#f3f}` should return false', function () {
      test.equal(hexColorRegex({strict: true}).test('#f3f}'), false)
    })
  })
})
