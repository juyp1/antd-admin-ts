<template>
  <div class="ant-tags">
    <div class="ant-tag-dot"
         :style="{background:color}"></div>
    {{tageName}}
    <CloseOutlined @click.stop="handleClose"
                   v-if="index===0? false:true" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
export default {
  name: 'tags',
  components: {
    CloseOutlined
  },
  props: {
    tageName: {
      type: String,
      default: '首页'
    },
    index: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#fafafa'
    }
  },
  methods: {
    handleClose () {
      this.$emit('close', { status: false, index: this.index })
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-tags {
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
  height: auto;
  margin: 0 8px 0 0;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  height: 32px;
  line-height: 32px;
  min-width: 110px;
  text-align: center;
  cursor: pointer;
  .ant-tag-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 8px;
    border-radius: 50%;
    background: #e8eaec;
    position: relative;
    top: 1px;
  }
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
</style>
