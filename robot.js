import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const robotElem = document.querySelector("[data-robot]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const robot_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let robotFrame
let currentFrameTime
let yVelocity
export function setuprobot() {
  isJumping = false
  robotFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(robotElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updaterobot(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getrobotRect() {
  return robotElem.getBoundingClientRect()
}

export function setrobotLose() {
  robotElem.src = "imgs/robot-lose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    robotElem.src = `imgs/robot-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    robotFrame = (robotFrame + 1) % robot_FRAME_COUNT
    robotElem.src = `imgs/robot-run-${robotFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(robotElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(robotElem, "--bottom") <= 0) {
    setCustomProperty(robotElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
