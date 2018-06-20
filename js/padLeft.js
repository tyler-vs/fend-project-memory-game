/*
 * padLeft.js
 */

function padLeft(str, size, padWith) {
  if (size <= str.length) {
    return str
  } else {
    return Array(size - str.length + 1).join(padWith || '0') + str
  }
}