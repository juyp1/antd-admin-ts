<template>
  <a-menu theme="dark"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"

          mode="inline">

    <a-sub-menu :key="item.path"
                class="icons-list"
                v-for="(item,index) of routers">
      <template v-slot:title>
        <span>
          <icon-font :type="item.meta.icon!=undefined?item.meta.icon:'icon-diannao'" />
          <span>{{item.meta.title}}</span>
        </span>
      </template>

      <template v-for="(subitem,subindex) of item.children">

        <a-menu-item :key="subitem.path"
                     v-if="!subitem.meta.hideInMenu&&subitem.children==undefined"
                     @click="handleitem(item,subitem)">

          <icon-font :type="subitem.meta.icon!=undefined?subitem.meta.icon:'icon-diannao'" /> {{subitem.meta.title}}
        </a-menu-item>
        <a-sub-menu :title="subitem.meta.title"
                    v-if="!subitem.meta.hideInMenu&&subitem.children!==undefined&&subitem.children.length>0">
          <a-menu-item v-for="(csubmitem,cindex) of subitem.children"
                       :key="csubmitem.path"
                       @click="handleitem(item,subitem,csubmitem)">
            <div v-if="!csubmitem.meta.hideInMenu">
              <icon-font :type="csubmitem.meta.icon!=undefined?csubmitem.meta.icon:'icon-diannao'" /> {{csubmitem.meta.title}}
            </div>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import _ from 'lodash'
import config from '../../config/index'
import { createFromIconfontCN, UserOutlined, MessageFilled } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: config.baseUrl.iconfont
})
export default {
  name: 'meuns',
  props: {
    routers: {
      type: Array,
      default: []
    },
    nowpath: {
      type: Object,
      default: {}
    }
  },
  components: {
    IconFont
  },
  watch: {
    nowpath: function (n, o) {
      this.openKeys = n.openKeys != undefined ? this.openKeys.indexOf(n.openKeys[0]) > -1 ? this.openKeys : this.openKeys.concat(n.openKeys) : []
      this.selectedKeys = n.selectedKeys != undefined ? n.selectedKeys : []
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: []
    }
  },

  methods: {
    handleitem (item, subitem, csubmitem) {
      this.$emit('menuclick', item, subitem, csubmitem)
    }

  }

}
</script>

<style lang="" scoped>
</style>
