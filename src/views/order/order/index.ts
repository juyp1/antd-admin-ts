import { SearchOutlined, UndoOutlined, createFromIconfontCN } from '@ant-design/icons-vue'
import config from '@/config/index'
import { computed, onMounted, reactive, defineComponent } from 'vue'
import { useStore } from 'vuex'
//
const IconFont: any = createFromIconfontCN({
  scriptUrl: config.baseUrl.iconfont
})

interface stateProps{
  params: {
    keyvalue: string;
    pagesize: number;
    pageindex: number;
  };
  ui: {
     windetail: boolean;
  };
  sourcedata: {
    data: [{
      prodata: [];
    }];
  };
}
export default defineComponent({
  name: 'order',
  components: {
    SearchOutlined,
    UndoOutlined,
    IconFont
  },
  setup () {
    const store = useStore()
    const state: stateProps = reactive({

      params: {
        keyvalue: '',
        pagesize: 1,
        pageindex: 10
      },
      sourcedata: {
        data: [{ prodata: [] }]
      },
      ui: {
        windetail: false,
        pagination: false,
        fistColumns: [
          {
            title: '订单编码',
            align: 'center',
            key: 'ordercode',
            dataIndex: 'ordercode'
          },
          {
            title: '产品名称',
            align: 'center',
            key: 'productname',
            dataIndex: 'productname'
          },
          {
            title: '客户名称',
            align: 'center',
            key: 'cusname',
            dataIndex: 'cusname'
          },
          {
            title: '数量',
            align: 'center',
            key: 'orderqty',
            dataIndex: 'orderqty'
          },
          {
            title: '接单日期',
            align: 'center',
            key: 'orderdate',
            dataIndex: 'orderdate'
          },
          {
            title: '交工日期',
            align: 'center',
            key: 'requiredate',
            dataIndex: 'requiredate'
          },
          {
            title: '进度',
            align: 'center',
            key: 'process',
            dataIndex: 'process',

            slots: { customRender: 'process' }
          },
          {
            title: '状态',
            align: 'center',
            key: 'statename',
            dataIndex: 'statename'
          },
          {
            title: '操作',
            key: 'orderid',
            dataIndex: 'orderid',
            width: 100,
            slots: { customRender: 'orderid' }
          }
        ],
        proColumns: [

          {
            title: '生产单号',
            align: 'center',
            key: 'billcode',
            dataIndex: 'billcode'

          },
          {
            title: '工艺',
            align: 'center',
            key: 'techname',
            dataIndex: 'techname'

          },
          {
            title: '要求产量',
            align: 'center',
            key: 'pqty',
            dataIndex: 'pqty'
          },
          {
            title: '实际产量',
            align: 'center',
            key: 'fqty',
            dataIndex: 'fqty'
          },
          {
            title: '线体工艺',
            align: 'center',
            key: 'worklinename',
            dataIndex: 'worklinename'
          },
          {
            title: '预计开工',
            align: 'center',
            key: 'fsdate',
            dataIndex: 'fsdate'
          },
          {
            title: '预计完工',
            align: 'center',
            key: 'fedate',
            dataIndex: 'fedate'
          },
          {
            title: '进度',
            align: 'center',
            key: 'process',
            dataIndex: 'process',

            slots: { customRender: 'process' }
          }
        ],
        subColumns: [
          {
            title: '工序名称',
            align: 'center',
            key: 'processname',
            dataIndex: 'processname'
          },
          {
            title: '开始时间',
            align: 'center',
            key: 'psdate',
            dataIndex: 'psdate'
          }, {
            title: '结束时间',
            align: 'center',
            key: 'pedate',
            dataIndex: 'pedate'

          }, {
            title: '状态',
            align: 'center',
            key: 'statename',
            dataIndex: 'statename'

          }, {
            title: '进度',
            align: 'center',
            key: 'process',
            dataIndex: 'process',
            slots: { customRender: 'process' }
          }
        ],
        bomColumns: [{
          title: '物料编码',
          align: 'center',
          key: 'invcode',
          dataIndex: 'invcode'
        }, {
          title: '物料名称',
          align: 'center',
          key: 'invname',
          dataIndex: 'invname'
        }, {
          title: '物料规格',
          align: 'center',
          key: 'invstd',
          dataIndex: 'invstd'
        }, {
          title: '单位',
          align: 'center',
          key: 'unitname',
          dataIndex: 'unitname'
        }, {
          title: '数量',
          align: 'center',
          key: 'qty',
          dataIndex: 'qty'
        }]
      }
    })
    const handlescprocess = (ischeck: boolean, record: any) => {
      store.dispatch('order/getProduceDetailAction', record.orderid).then(() => {
        state.sourcedata.data.map((_item: any, index: number) => {
          if (record.ordercode == _item.ordercode) {
            state.sourcedata.data[index].prodata = store.state.order.producelist
          }
        })
      })
    }

    // 打开详情订单
    const handleorderdetail = (orderid: string) => {
      store.dispatch('order/getOrderDetailAction', orderid).then(() => {
        state.ui.windetail = true
      })
    }
    // 获取 订单信息
    store.dispatch('order/getOrderListAction', state.params).then(res => {
      state.sourcedata = res
    })
    return {
      state,
      store,
      handlescprocess,
      handleorderdetail
    }
  }

})
