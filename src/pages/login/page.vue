<template lang="pug">
    .login-page
        #login.layer.bg
        .layer.flex-center
            <!-- logo部分 -->
            .logo-group
                img(src="image/logo-tx.png" alt="logo")
            <!-- 表单部分 -->
            .form-group
                el-card
                    el-form(ref="loginForm" @keyup.enter.native="submit" label-position="top" :rules="rules" :model="formLogin" size="default")
                        el-form-item(prop="username")
                            el-input(type="text" v-model="formLogin.username" placeholder="用户名")
                                i.fa.fa-user-circle-o(slot="prepend")
                        el-form-item(prop="password")
                            el-input(type="password" v-model="formLogin.password" placeholder="密码")
                                i.fa.fa-keyboard-o(slot="prepend")
                        el-form-item(prop="code")
                            el-input(type="text" v-model="formLogin.code" placeholder="- - - - -")
                                template(slot="prepend") 验证码
                                template(slot="append")
                                    <!--<img class="login-code" src="./image/login-code.png">-->
                                    img.login-code(:src="captchaPath" @click="getCaptcha()" alt="")
                        el-button.button-login(size="default" @click="submit" type="primary") 登录
        el-dialog(title="快速选择用户" :visible.sync="dialogVisible" width="400px")
            el-row(:gutter="10" style="margin: -20px 0px -10px 0px;")
                el-col(v-for="(user, index) in users" :key="index" :span="8")
                    .user-btn(@click="handleUserBtnClick(user)")
                        d2-icon(name="user-circle-o")
                        span {{user.name}}
</template>

<script>
/* eslint-disable */
require('particles.js')
import config from './config/default'
import {mapActions} from 'vuex'
import util from '@/libs/util.js'
import { getPermissions } from '@/util'

export default {
    data() {
        return {
            // 快速选择用户
            dialogVisible: false,
            users: [
                {
                    name: '管理员',
                    username: 'admin',
                    password: 'admin'
                },
                {
                    name: '编辑',
                    username: 'editor',
                    password: 'editor'
                },
                {
                    name: '用户1',
                    username: 'user1',
                    password: 'user1'
                }
            ],
            // 表单
            formLogin: {
                username: 'admin',
                password: 'admin',
                uuid: '',
                code: ''
            },
            // 校验
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            },
            captchaPath: ''
        }
    },
    created() {
        this.getCaptcha()
    },
    mounted() {
        // 初始化例子插件
        particlesJS('login', config)
    },
    beforeDestroy() {
        // 销毁 particlesJS
        // thanks https://github.com/d2-projects/d2-admin/issues/65
        // ref https://github.com/VincentGarreau/particles.js/issues/63
        if (pJSDom && pJSDom.length > 0) {
            pJSDom[0].pJS.fn.vendors.destroypJS()
            pJSDom = []
        }
    },
    methods: {
        ...mapActions('d2admin/account', [
            'login'
        ]),
        /**
         * 获取uuid
         */
        getUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
            })
        },
        // 获取验证码
        getCaptcha() {
            this.formLogin.uuid = this.getUUID()
            this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.formLogin.uuid}`)
        },
        /**
         * @description 接收选择一个用户快速登录的事件
         * @param {Object} user 用户信息
         */
        handleUserBtnClick(user) {
            this.formLogin.username = user.username
            this.formLogin.password = user.password
            this.submit()
        },
        /**
         * @description 提交表单
         */
        // 提交登录信息
        submit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {

	                // this.login({
	                //    vm: this,
	                //    username: this.formLogin.username,
	                //    password: this.formLogin.password,
	                //    uuid: this.formLogin.uuid,
	                //    captcha: this.formLogin.code
	                // })
	                // 先进行认证
	                // 获取数据列表
                    this.$http({
                        url: this.$http.authUrl('/oauth/token'),
                        method: 'post',
                        data: {
                        	'grant_type': 'password',
                            'username': this.formLogin.username,
	                        'password': this.formLogin.password,
                            'scope': 'all'
                        }
                    }).then((data) => {
                      if (data.access_token) {
	                      // 登录
	                      // 注意 这里的演示没有传验证码
	                      // 具体需要传递的数据请自行修改代码
	                      util.cookies.set('authorization', data.access_token)

	                      this.$http({
		                      url: this.$http.adornUrl('/sys/login'),
		                      method: 'post',
		                      data: {
			                      'uuid': this.formLogin.uuid,
			                      'username': this.formLogin.username,
			                      'password': this.formLogin.password,
			                      'captcha': this.formLogin.code
		                      }
	                      }).then((res) => {
			                      // 设置 cookie 一定要存 uuid 和 token 两个 cookie
			                      // 整个系统依赖这两个数据进行校验和存储
			                      // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
			                      // token 代表用户当前登录状态 建议在网络请求中携带 token
			                      // 如有必要 token 需要定时更新，默认保存一天
			                      util.cookies.set('uuid', res.uuid)
			                      util.cookies.set('token', res.token)
			                      // 存储登陆用户权限信息
			                      sessionStorage.setItem('permissions', res.permissions)
			                      // 设置 vuex 用户信息
			                      this.$store.dispatch('d2admin/user/set', {
				                      name: this.formLogin.username
			                      }, { root: true })
			                      // 用户登录后从持久化数据加载一系列的设置
			                      this.$store.dispatch('load')
			                      // 获取最新权限信息
			                      getPermissions()
			                      // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
			                      const path = util.cookies.get('redirect')
			                      // 根据是否存有重定向页面判断如何重定向
			                      this.$router.replace(path ? { path } : { name: 'index' })
			                      // 删除 cookie 中保存的重定向页面
			                      util.cookies.remove('redirect')
		                  }).catch(err => {
			                      this.getCaptcha()
		                      })
                      }
                    }).catch(err => {
	                    this.getCaptcha()
                    })

                } else {
                    // 登录表单校验失败
                    this.$message.error('表单校验失败')
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style>


