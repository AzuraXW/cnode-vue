export const response = {
  bind (el, binding) {
    // 尺寸范围
    const scale = {
      xl (width) {
        return width >= 1920
      },
      lg (width) {
        return width >= 1200 && width < 1920
      },
      md (width) {
        return width >= 992 && width < 1200
      },
      sm (width) {
        return width >= 768 && width < 992
      },
      xs (width) {
        return width < 768
      }
    }
    // 响应函数
    const responseElement = function () {
      const bind = binding.value
      const deviceWidth = this.outerWidth
      let inRange = false
      // 进入指定范围时
      if (scale[bind.size](deviceWidth)) {
        inRange = true
      } else {
        inRange = false
      }
      // 调用指令绑定的回调函数
      bind.resFunc(el, inRange)
    }
    responseElement.apply(window)
    window.addEventListener('resize', responseElement.bind(window))
  }
}
