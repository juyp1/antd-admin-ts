<template>
  <div>
    <a-table :pagination="state.ui.pagination"
             @expand="handlescprocess"
             :columns="firstCloumn"
             :data-source="sourceData">
      <template #expandedRowRender="{ record }"
                v-if="secondCloumn.length>0">
        <!-- {{record.prodata}} -->
        <a-col span="24"
               style="padding:5px">
          <a-table :key="prokey"
                   bordered
                   :pagination="state.ui.pagination"
                   :columns="secondCloumn"
                   :data-source="record.data"
                   stripe
                   style="width: 100%;float-defer-column: inherit;font-size:12px !important">
            <template v-slot:process="{ text: process }">
              <span>
                <a-progress :percent="process"
                            status="active" />
                <!-- <a-tag v-for="tag in tags"
                               :key="tag"
                               :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                          {{ tag.toUpperCase() }}
                        </a-tag> -->
              </span>
            </template>
            <template #expandedRowRender="{ record }"
                      v-if="thirdCloumn.length>0">
              <p style="margin: 0">
                <a-table :columns="thirdCloumn"
                         style="width: 100%;float-defer-column: inherit;font-size:12px !important"
                         :data-source="record.data"
                         :pagination="state.ui.pagination">
                  <template v-slot:process="{ text: process }">
                    <span>
                      <a-progress :percent="process"
                                  status="active" />

                    </span>
                  </template>
                </a-table>
              </p>
            </template>
          </a-table>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
export default {
  props: {
    firstCloumn: [],
    secondCloumn: [],
    thirdCloumn: [],
    sourceData: []
  },
  setup () {
    const state = reactive({
      ui: {
        pagination: false
      }
    })
  }
}
</script>

<style lang="" scoped>
</style>
