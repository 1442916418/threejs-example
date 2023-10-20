import './style.css'

import BaseWorld from '@worlds/base-world'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div class="container" id="container"></div>`

const init = async () => {
  const ele = document.querySelector<HTMLDivElement>('#container')

  if (ele) {
    const world = new BaseWorld(ele, false)

    await world.init()

    world.start()
  }
}

init()
