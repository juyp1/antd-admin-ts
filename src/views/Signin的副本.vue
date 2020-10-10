<template>
  <div class="signin-page">
    <div class="signincontainer">
      <div class="signincard">
        <a-card title="欢迎登录">
          <a-form>
            <a-form-item>
              <a-input placeholder="账号"
                       v-model:value="model.params.usercode">
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input type="password"
                       placeholder="密码"
                       v-model:value="model.params.passwd">

              </a-input>
            </a-form-item>

          </a-form>
          <a-row>
            <a-col :span="24">
              <a-button type="primary"
                        @click="handlesignin"
                        block>登录</a-button>

            </a-col>

          </a-row>
        </a-card>
      </div>
    </div>
  </div>

</template>
<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { setToken } from '@/libs/util'

export default {
  name: 'Signin',
  data () {
    return {
      model: {
        params: {
          usercode: '',
          passwd: ''
        }
      }
    }
  },
  methods: {
    handlesignin () {
      this.$store.dispatch('user/signinUserAction', this.model.params).then(res => {
        if (res.errcode != '') {
          this.$message.error(res.errmsg)
        } else {
          localStorage.setItem('functionlist', res.functionlist)
          setToken(res.userinfo.userid)
          this.$router.push({ path: '/home' })
        }
      })
    }
  }

}
</script>
<style lang="scss">
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
    width: 330px;
    border-radius: 8px;
  }
  .signincontainer {
    display: flex;
    justify-content: center;
    height: 100% !important;

    align-items: center;
  }
}
</style>
