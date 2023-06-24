import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const alien_INTERVAL_MIN = 500
const alien_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextalienTime
export function setupalien() {
  nextalienTime = alien_INTERVAL_MIN
  document.querySelectorAll("[data-alien]").forEach(alien => {
    alien.remove()
  })
}

export function updatealien(delta, speedScale) {
  document.querySelectorAll("[data-alien]").forEach(alien => {
    incrementCustomProperty(alien, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(alien, "--left") <= -100) {
      alien.remove()
    }
  })

  if (nextalienTime <= 0) {
    createalien()
    nextalienTime =
      randomNumberBetween(alien_INTERVAL_MIN, alien_INTERVAL_MAX) / speedScale
  }
  nextalienTime -= delta
}

export function getalienRects() {
  return [...document.querySelectorAll("[data-alien]")].map(alien => {
    return alien.getBoundingClientRect()
  })
}

function createalien() {
  const alien = document.createElement("img")
  alien.dataset.alien = true
  alien.src = "imgs/alien.png"
  alien.classList.add("alien")
  setCustomProperty(alien, "--left", 100)
  worldElem.append(alien)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
