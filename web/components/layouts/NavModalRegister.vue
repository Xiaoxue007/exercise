<template>
  <Form
    ref="formCustom"
    :model="formCustom"
    :rules="ruleCustom"
    :label-width="80"
  >
    <FormItem label="用户名" prop="username">
      <Input v-model="formCustom.username" type="text" number></Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input v-model="formCustom.password" type="password"></Input>
    </FormItem>
    <FormItem label="确认密码" prop="passwdCheck">
      <Input v-model="formCustom.passwdCheck" type="password"></Input>
    </FormItem>
    <FormItem label="手机号" prop="phoneNum">
      <Input v-model="formCustom.phoneNum" type="tel"></Input>
    </FormItem>

    <FormItem>
      <Button class="reset" @click="handleReset('formCustom')">清空</Button>
      <Button type="primary" @click="handleSubmit('formCustom')"
        >开始使用！</Button
      >
    </FormItem>

    <Span>已经注册了？</Span>
    <a
      style="color: #7d2ae8; text-decoration: underline"
      @click="LonginClick"
    >
      登录</a
    >
  </Form>
</template>

<script>
export default {
  name: 'NavModalRegister',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        const patrn = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/
        if (!patrn.exec(value)) {
          return callback(new Error('由6-20位字母、数字组成，可以有特殊符号'))
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formCustom.password) {
        callback(new Error('两次输入的密码不匹配'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      const patrn = /^[a-zA-Z]\w{4,14}$/
      if (!patrn.exec(value)) {
        return callback(new Error('字母开头，5-15位字母、数组、下划线组成'))
      } else {
        callback()
      }
    }
    const validatePhoneNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      const patrn = /^1[0-9]{10}$/
      if (!patrn.exec(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      formCustom: {
        username: '',
        password: '',
        passwdCheck: '',
        phoneNum: '',
      },
      ruleCustom: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        username: [{ validator: validateUsername, trigger: 'blur' }],
        phoneNum: [{ validator: validatePhoneNum, trigger: 'blur' }],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          try {
            await this.$axios.$post('auth/register', this[name])
            this.$Message.success('注册成功!')
            this.$emit('closeModal', false)
          } catch (err) {
            // console.log(err)
            this.$Message.error('用户名已被占用，请更换用户名')
          }
        } else {
          this.$Message.error('表单填写错误')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    LonginClick(){
      this.$emit('toLogin', 'login')
    }
  },
}
</script>

<style scoped>
.reset {
  position: absolute;
  left: -65px;
  top: 5px;
}
</style>
