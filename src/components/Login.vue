<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!--Form区域-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>

        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="validateLoginForm">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是数据规则
      loginFormRules: {
        // 验证username
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证password
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //点击重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //点击重置表单
    validateLoginForm() {
      this.$refs.loginFormRef.validate(async validate => {
        if (!validate) return;
        // console.log('success');
        const { data: res } = await this.$http.post('login', this.loginForm);
        // console.log(res);
        if (res.meta.status != 200) {
          this.$message.error('登录失败');
        } else {
          this.$message.success('登录成功');
          // 将登录之后的token值保存到客户端本地的sessionStorage中
          // 1.1 项目中除了登录界面，其他界面都需要登录以后才能访问
          // 1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
          // 通过编程式导航跳转到后台主页，路由为/home
          window.sessionStorage.setItem('token', res.data.token);
          this.$router.push('/home');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
