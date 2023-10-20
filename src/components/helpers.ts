import { AxesHelper, GridHelper, CameraHelper, DirectionalLightHelper, DirectionalLight } from 'three'

export const createAxesHelper = (size = 6) => {
  const axesHelper = new AxesHelper(size)

  axesHelper.position.set(0, 0, 0)

  return axesHelper
}

export const createGridHelper = () => {
  const gridHelper = new GridHelper(6)

  return gridHelper
}

/**
 * 相机 helper
 */
export const createCameraHelper = (camera: any) => {
  const helper = new CameraHelper(camera)

  return helper
}

/**
 * 定向光源 helper
 */
export const createDirectionalLightHelper = (light: DirectionalLight) => {
  const helper = new DirectionalLightHelper(light, 5)

  return helper
}
