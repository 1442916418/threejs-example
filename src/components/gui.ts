import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

/**
 * 创建光源 GUI
 */
export const createLightsGUI = (gui: GUI, ...lights: any[]) => {
  const [hemisphereLight, directionalLight] = lights

  const folderAmbient = gui.addFolder('半球光')
  folderAmbient.close()
  folderAmbient.addColor(hemisphereLight, 'color')
  folderAmbient.add(hemisphereLight, 'intensity', 0, 2.0, 0.1)

  if (directionalLight) {
    const folderDirectional = gui.addFolder('平行光')
    folderDirectional.close()
    folderDirectional.addColor(directionalLight, 'color')
    folderDirectional.add(directionalLight, 'intensity', 0, 100, 0.1)
    folderDirectional.add(directionalLight.position, 'x', -300, 300, 1)
    folderDirectional.add(directionalLight.position, 'y', -300, 300, 1)
    folderDirectional.add(directionalLight.position, 'z', -300, 300, 1)
  }
}
