<template>
   <keep-alive :include="cacheList">
    <router-view ref="child"/>
  </keep-alive>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ParentView',
  computed: {
    cacheList () {
      return []
    }
  }

})
</script>
