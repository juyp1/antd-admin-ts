<template>
  <div>
    <a-button type="danger" @click="handleup">
      测试更新
    </a-button>
    {{title}}
    <icon-font type="icon-calendar" />

  </div>
</template>

<script lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { ref, onMounted, computed, defineComponent } from 'vue'

const IconFont: any = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1859109_q2zl3c00i6.js'
})
export default defineComponent({
  name: 'carelist',
  components: {
    IconFont
  },
  setup () {
    const title = ref('hello word')
    function handleup () {
      title.value = 'hello uodate success'
    }
    return {
      title,
      handleup
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
