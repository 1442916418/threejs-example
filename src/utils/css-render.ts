import type { TCssRenderParams, TCssRenderObj, TCssRenderOnAddParams } from '@c-types'

/**
 * 文本渲染
 */
export const handleCssRender = ({ CSS3DRender, el, scene }: TCssRenderParams) => {
  const T: TCssRenderObj = {
    config: {},
    cssRenderer: void 0,
    cssRendererDomElement: void 0,
    onInit: () => {
      const cssRenderer = new CSS3DRender()
      cssRenderer.setSize(el.clientWidth, el.clientHeight)
      cssRenderer.domElement.style.position = 'absolute'
      cssRenderer.domElement.style.top = '0'
      cssRenderer.domElement.style.pointerEvents = 'none'
      el.appendChild(cssRenderer.domElement)

      T.cssRenderer = cssRenderer
      T.cssRendererDomElement = cssRenderer.domElement
    },
    onAdd: (options) => {
      const list: TCssRenderOnAddParams[] = Array.isArray(options) ? options : [options]

      list.forEach((item) => {
        const { htmlElement, css3DSprite, position, name, scale, controlGroup } = item

        document.body.insertAdjacentHTML('beforeend', htmlElement)

        const lastChild = document.body.lastChild as HTMLElement

        if (!lastChild) return

        const label = new css3DSprite(lastChild)
        label.userData.isCss23D = true
        label.position.set(position.x, position.y, position.z)
        label.name = name
        label.scale.set(scale[0], scale[1], scale[2])

        controlGroup ? controlGroup.add(label) : scene.add(label)

        T.config[name] = label
      })
    },
    onUpdate: ({ name, innerHtml }) => {
      T.config[name].element.innerHTML = innerHtml
    },
    onRemove: ({ name, controlGroup }) => {
      const e = controlGroup.getObjectByName(name)

      e && controlGroup.remove(e)

      if (T.config[name]) {
        delete T.config[name]
      }
    },
    onSearch: ({ name }) => {
      return T.config[name]
    },
    onRemoveAll: ({ controlGroup }) => {
      // 需要倒序遍历
      for (let i = controlGroup.children.length - 1; i >= 0; i--) {
        const e = controlGroup.children[i]

        if (e.userData.isCss23D) {
          const name = e.name

          controlGroup.remove(e)

          if (T.config[name]) {
            delete T.config[name]
          }
        }
      }
    }
  }

  T.onInit()

  return T
}
