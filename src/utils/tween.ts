import { Tween, Easing, add } from 'three/examples/jsm/libs/tween.module.js'

import type { TCameraAndControlsFlightAnimation, THandleBuildingLayersAnimation } from '@types'

/**
 * 处理相机和控制器飞行动效
 */
export const handleCameraAndControlsFlightAnimation = (options: TCameraAndControlsFlightAnimation) => {
  const defPosition = { x: 0, y: 0, z: 0 }
  const {
    cameraPosition = defPosition,
    cameraNewPosition = defPosition,
    controlsPosition = defPosition,
    controlsNewPosition = defPosition,
    duration = 1000,
    easing = Easing.Linear.None
  } = options

  const tween = new Tween({
    x1: cameraPosition.x,
    y1: cameraPosition.y,
    z1: cameraPosition.z,
    x2: controlsPosition.x,
    y2: controlsPosition.y,
    z2: controlsPosition.z
  })
    .to(
      {
        x1: cameraNewPosition.x,
        y1: cameraNewPosition.y,
        z1: cameraNewPosition.z,
        x2: controlsNewPosition.x,
        y2: controlsNewPosition.y,
        z2: controlsNewPosition.z
      },
      duration
    )
    .easing(easing)

  tween.onUpdate(() => {
    options.onUpdate && options.onUpdate(tween)
  })
  tween.onStart(() => {
    options.onStart && options.onStart()
  })
  tween.onComplete(() => {
    options.onDone && options.onDone()
  })
  tween.onStop(() => options.onStop && options.onStop())

  tween.start()

  add(tween)

  return tween
}

/**
 * 处理楼层飞行动效
 */
export const handleBuildingLayersAnimation = (options: THandleBuildingLayersAnimation) => {
  const defPosition = { x: 0, y: 0, z: 0 }
  const {
    position = defPosition,
    newPosition = defPosition,
    duration = 1000,
    easing = Easing.Linear.None
  } = options

  const tween2 = new Tween({
    x1: position.x,
    y1: position.y,
    z1: position.z
  })
    .to(
      {
        x1: newPosition.x,
        y1: newPosition.y,
        z1: newPosition.z
      },
      duration
    )
    .easing(easing)

  tween2.onUpdate(() => {
    options.onUpdate && options.onUpdate(tween2)
  })
  tween2.onStart(() => {
    options.onStart && options.onStart()
  })
  tween2.onComplete(() => {
    options.onDone && options.onDone()
  })
  tween2.onStop(() => options.onStop && options.onStop())

  tween2.start()

  add(tween2)

  return tween2
}
