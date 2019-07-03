/* eslint-env browser, mocha */
/* global assert */
import { isTrue } from '../'

describe('isTrue', () => {
  it('should return true', () => {
    const res = isTrue()
    assert.isTrue(res)
  })
})
