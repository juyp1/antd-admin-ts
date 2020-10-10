<template>
  <div class="order fade-in-left">
    <a-card title="订单管理">
      <a-row :gutter="[8]">
        <a-col :span="5">

          <a-input placeholder="请输入生产订单编码" />
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="4">
              <a-button type="primary">
                <template v-slot:icon>
                  <SearchOutlined />
                </template>搜索

              </a-button>
            </a-col>
            <a-col :span="4">
              <a-button type="danger">
                <template v-slot:icon>
                  <UndoOutlined />
                </template>重置

              </a-button>
            </a-col>
          </a-row>
        </a-col>

      </a-row>
      <a-row style="margin-top:20px">
        <a-col :span="24">
          <a-table rowKey="ordercode"
                   :pagination="state.ui.pagination"
                   @expand="handlescprocess"
                   :columns="state.ui.fistColumns"
                   :data-source="state.sourcedata.data">
            <template v-slot:orderid="{ text:orderid }">

              <a-button type="primary"
                        size="small"
                        @click="handleorderdetail(orderid)">
                查看
              </a-button>

            </template>
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
            <template #expandedRowRender="{ record }">
              <!-- {{record.prodata}} -->
              <a-col span="24"
                     style="padding:5px">
                <a-table :key="prokey"
                         rowKey="billcode"
                         bordered
                         :pagination="state.ui.pagination"
                         :columns="state.ui.proColumns"
                         :data-source="record.prodata"
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

                  <template #expandedRowRender="{ record }">
                    <p style="margin: 0">
                      <a-table :columns="state.ui.subColumns"
                               rowKey="procid"
                               style="width: 100%;float-defer-column: inherit;font-size:12px !important"
                               :data-source="record.processItemList"
                               :pagination="state.ui.pagination">
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

                      </a-table>
                    </p>
                  </template>
                </a-table>
              </a-col>
            </template>

          </a-table>
          <div style="float:right;margin-top:20px">
            <a-pagination :total="state.sourcedata.total">

            </a-pagination>

          </div>
        </a-col>
      </a-row>
    </a-card>
    <!--详情-->
    <a-modal v-model:visible="state.ui.windetail"
             :footer="null"

             width="1200px">

      <a-card title="基本信息"
              :bordered="false">
        <a-row id="windetail">
          <a-col :span="6">
            订单编码: App-Eat
          </a-col>
          <a-col :span="9">
            客户名称: 青岛四方研究所股份有限公司啊啊啊
          </a-col>
          <a-col :span="5">
            产品名称: {{store.state.order.orderdetail.productname}}
          </a-col>
          <a-col :span="4">
            生产数量:  {{store.state.order.orderdetail.orderqty}}
          </a-col>
          <a-col :span="6">
            接单日期:
            {{store.state.order.orderdetail.makedate}}
          </a-col>
          <a-col :span="6">
            完工日期:

            {{store.state.order.orderdetail.requiredate}}

          </a-col>

        </a-row>
        <a-row>

          <a-col :span="24">备注: <span style="color:red">颠三倒四多所 </span></a-col>

        </a-row>
      </a-card>
       <a-card title="物料"
              :bordered="false">
              <a-table    :scroll="{ y: 540 }" :pagination="state.ui.pagination" :columns="state.ui.bomColumns" :data-source="store.state.order.orderdetail.orderInvList">
              </a-table>
       </a-card>
    </a-modal>
  </div>
</template>

<script src='./index.ts' lang="ts">

</script>

<style lang="scss" src='./index.scss'>
</style>
