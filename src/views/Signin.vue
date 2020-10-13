<template>
  <div class="signin-page">
    <div class="signincontainer">
      <div class="signincard">
        <a-row>
          <a-col :span="12">
            <img src="../assets/left-bg.png">
          </a-col>
          <a-col :span="12"
                 class="container">
            <a-row>
              <a-col :span="3">
                <img src="../assets/yy.png"
                     alt=""
                     class="yylogo">
              </a-col>
              <a-col :span="1"
                     class="linelogo"></a-col>
              <a-col :span="3">
                <img src="../assets/zq.png"
                     alt=""
                     class="zqlogo">
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div class="title">影 像 系 统</div>
              </a-col>
            </a-row>
            <a-row type="flex"
                   justify="center"
                   style="margin-top:88px">
              <a-col :span="24"
                     style="width:320px">
                <a-form @keydown.enter.native="handlesignin"
                        :model="model.params"
                        :rules="rulesRef"
                        :label-col="ui.labelCol"
                        :wrapper-col="wrapperCol"
                        ref="ruleForm">
                  <a-form-item name="usercode">
                    <a-input placeholder="账号"
                             v-model:value="model.params.usercode">
                    </a-input>
                  </a-form-item>
                  <a-form-item  name="passwd">
                    <a-input type="password"
                             placeholder="密码"
                             v-model:value="model.params.passwd">

                    </a-input>
                  </a-form-item>

                </a-form>
                <a-row>
                  <a-col :span="24">
                    <a-button type="primary"
                              html-type="submit"
                              @click="handlesignin"
                              block>登录</a-button>

                  </a-col>

                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import { computed, onMounted, reactive, toRefs, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { setToken } from '@/libs/util'
import { useForm } from '@ant-design-vue/use'

export default defineComponent({
  name: 'Signin',
  data () {
    return {
      rulesRef: {
        usercode: [
          {
            required: true,
            message: '请输入账号'
          }
        ],
        passwd: [
          {
            required: true,
            message: '请输入密码'
          }

        ]
      },
      ui: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      model: {
        params: {
          usercode: '',
          passwd: ''
        },
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }
  },
  methods: {
    handlesignin () {
      console.log('1111')
      setToken('xxxx')
      const _this: any = this
      _this.$router.push({ path: '/home' })
      //   _this.$refs.ruleForm
      //     .validate()
      //     .then(() => {
      //       _this.$store.dispatch('user/signinUserAction', this.model.params).then((res:any) => {
      //         if (res.errcode != '') {
      //           _this.$message.error(res.errmsg);
      //         } else {
      //           setToken(res.userinfo.userid)
      //           _this.$store.dispatch('user/getUserInfoAction', res.userinfo.userid);

      //         }
      //       })
      //     })
      //     .catch((error: any) => {
      //       console.log('error', error);
      //     });
    }
  }

})
</script>
<style lang="scss" scope>
.signin-page {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url("../assets/back.png");
  background-position: center 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;

  .signincard {
    width: 1080px;

    height: 600px;

    background: #ffffff;
    .yylogo {
      width: 46px;
      height: 30px;
    }
    .linelogo {
      height: 30px;
      border-left: 1px solid #e6e6e6;
    }
    .zqlogo {
      width: 38px;
      height: 30px;
    }
    .container {
      padding-top: 20px;
      padding-left: 30px;
    }
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #000000;
      text-align: center;
      padding-top: 70px;
    }
  }
  .signincontainer {
    display: flex;
    justify-content: center;
    height: 100% !important;

    align-items: center;
  }
}
</style>
