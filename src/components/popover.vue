<template>
  <div
    class="active-popover"
    :style="{
      top: top,
      left: left
    }"
  >
    <div class="header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="main-content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top: 0,
      left: 0,
      title: '',
      replies: [],
      isClose: true
    }
  },
  methods: {
    show (options) {
      const { left, top, title, replies } = options
      this.top = top
      this.left = left
      console.log('left', this.left)
      console.log('top', this.top)
      this.title = title
      this.replies = replies
      // console.log(replies)
      document.body.appendChild(this.$el)
    },

    close () {
      this.$destroy(true)
      this.$el && this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss">
.active-popover{
  padding: 15px;
  position: absolute;
  width: 400px;
  z-index: 999;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 2px dashed #dcdfe6;
  background-color: #fff;
  background-clip: padding-box;
  box-sizing: border-box;
  &::before{
    content: '';
    position: absolute;
    left: -20px;
    width: 0;
    height: 0;
    top: 30px;
    border-top: 10px solid transparent;
    border-right: 20px solid #dcdfe6;
    border-bottom: 10px solid transparent;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .header{
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    margin: 0 -15px;
    margin-bottom: 15px;
    border-bottom: 2px dashed #dcdfe6;
  }
  .main-content{
    .reply-clues{
      margin: 0;
      padding: 0;
      list-style: none;
      .reply-wrapper{
        display: flex;
        padding-bottom: 10px;
        &:not(:last-child) {
          margin-bottom: 10px;
          border-bottom: 1px solid #dcdfe6;
        }
        img{
          width: 35px;
          height: 35px;
        }
        .reply{
          display: block;
          margin-left: 10px;
          flex: 1;
          p{
            margin: 0;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
