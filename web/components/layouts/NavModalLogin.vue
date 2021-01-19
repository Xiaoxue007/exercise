<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input v-model="formInline.username" type="text" placeholder="用户名">
        <Icon slot="prepend" type="ios-person-outline"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model="formInline.password" type="password" placeholder="密码">
        <Icon slot="prepend" type="ios-lock-outline"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
    <Span>第一次使用？</Span>
    <a
      style="color: #7d2ae8; text-decoration: underline"
      @click="RegisterClick"
    >
      注册</a
    >
  </Form>
</template>

<script>
export default {
  name: 'NavModalLogin',
  data() {
    return {
      formInline: {
        username: '',
        password: '',
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空.', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码最短不能少于6位',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          try {
            await this.$auth.loginWith('local', {
              data: this[name],
            })
            this.$Message.success('登陆成功!')
            this.$emit('closeModal', false)
          } catch (err) {
            // console.log(err)
            this.$Message.error('用户名或密码错误!')
          }
        } else {
          this.$Message.error('表单填写错误!')
        }
      })
    },
    RegisterClick() {
      this.$emit('toRegister', 'register')
    },
  },
}
</script>

<style scoped></style>
