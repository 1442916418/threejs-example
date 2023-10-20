import { DirectionalLight, PointLight, SpotLight, HemisphereLight } from 'three'

/**
 * 创建定向光光源
 */
export const createLights = () => {
  // 半球光
  const hemisphereLight = new HemisphereLight('white', 'darkslategrey', 5)
  // 定向光
  const directionalLight = new DirectionalLight('white', 4)

  directionalLight.position.set(10, 10, 10)

  // @ts-ignore
  directionalLight.tick = (delta: number) => {}

  return { directionalLight, hemisphereLight }
}

/**
 * 创建点光源
 */
export const createPointLights = () => {
  const pointLight = new PointLight(0xff0000, 8)

  pointLight.position.set(150, 50, 50)

  return pointLight
}

/**
 * 创建聚光灯光源
 */
export const createSpotLights = () => {
  const spotLight = new SpotLight(0x00ff00, 10)

  spotLight.position.set(-100, -50, 0)

  return spotLight
}
