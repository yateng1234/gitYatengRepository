<!--suppress ALL -->
<template lang="pug">
    d2-container#setting-code
        h2.el-h2 生成规则
        p.el-text-s 表名、字段名以"_"分割，然后用驼峰法进行命名
        p.el-text-s 表名前缀在生成累的时候会去掉，如果不填写前缀，则当作没有前缀，不进行处理
        el-steps(:active="this.steps" simple process-status="success")
            el-step(title="数据库连接")
            el-step(title="输入表名生成路径")
            el-step(title="生成文件")
        el-form.code-form(v-loading="!lists" v-if="this.steps === 0" label-position="right" label-width="120px" :model="formLabelAlign" size="mini")
            el-row.code-form-item(type="flex" justify="center")
                el-col(:span="10")
                    el-form-item(label="数据库类型:")
                        el-select(v-model="formLabelAlign.dbType" placeholder="请选择数据库类型")
                            el-option(label="MySql" value="1")
                            el-option(label="Oracle" value="2")
                            el-option(label="SqlServer" value="3")
                            el-option(label="PostgreSQL" value="3")
                    el-form-item(label="数据库IP:" )
                        el-input(v-model="formLabelAlign.ip")
                    el-form-item(label="数据库端口号:" )
                        el-input(v-model="formLabelAlign.port")
                    el-form-item(label="数据库库名:" )
                        el-input(v-model="formLabelAlign.dbName")
                    el-form-item(label="数据库用户名:" )
                        el-input(v-model="formLabelAlign.username")
                    el-form-item(label="数据库密码:" )
                        el-input(type="password" v-model="formLabelAlign.dbpwd")
                    el-form-item
                        el-button(type="primary" @click="verifyDB('step_0')") 验 证
        el-form.code-form(v-if="this.steps === 1" label-position="right" label-width="180px" :model="formLabelAlign" size="mini")
            el-row.code-form-item(type="flex" justify="center")
                el-col(:span="10")

                    el-form-item(label="请输入要生成的表备注:")
                        el-input(v-model="formLabelAlign.tableRemark")
                    el-form-item(label="请输入要生成的表名:" )
                        el-input(v-model="formLabelAlign.tableName")
                    el-form-item(label="请输入要生成的模块名:" )
                        el-input(v-model="formLabelAlign.modulesName")
                    el-form-item(label="请输入java工程路径 :" )
                        el-input(v-model="formLabelAlign.javaDevPath")
                    el-form-item(label="请输入xml工程路径 :" )
                        el-input(v-model="formLabelAlign.xmlDevPath")
                    el-form-item
                        el-button(type="primary"  @click="verifyDB('step_1')") 验 证
        el-form.code-form(v-if="this.steps === 2" label-position="right" label-width="120px" :model="formLabelAlign" size="mini")
            el-row.code-form-item(type="flex" justify="center")
                el-col(:span="10")
                    //el-form-item
                        el-checkbox(v-model="formLabelAlign.isAddJsp") 是否生成AddJsp
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isBean") 是否生成Bean
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isController") 是否生成Controller
                    //el-form-item
                        el-checkbox(v-model="formLabelAlign.isJs") 是否生成Js
                    //el-form-item
                        el-checkbox(v-model="formLabelAlign.isListJsp") 是否生成ListJsp
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isMapperJava") 是否生成MapperJava
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isMapperXMl") 是否生成MapperXMl
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isService") 是否生成Service
                    el-form-item
                        el-checkbox(v-model="formLabelAlign.isModel") 是否生成Model
                    el-form-item
        el-button.code-next-btn(type="primary" disabledm @click="generateNext(`step_${steps}`)" plain v-text="steps === 2 ? '完成' :'下一步'")

        el-button.code-next-btn(style="margin-right:10px" v-if="steps > 0" type="primary" disabledm @click="backTo()" v-text="'上一步'")

        el-table( v-if="this.steps > 0 && this.sqlTab.length > 0" :data="sqlTab" style="width: 100%")
            el-table-column(prop="COLUMN_NAME" align="center" label="字段" width="120")

            el-table-column(label="备注" align="center" width="100")
                template(slot-scope="scope")
                    el-input(size="mini"  v-model="scope.row.COLUMN_COMMENT" placeholder=" ")

            el-table-column(prop="DATA_TYPE" align="center" label="类型" width="80")

            el-table-column(align="center" label="非空" width="50")
                template(slot-scope="scope")
                    <!--span {{scope.row.IS_NULLABLE}}-->
                    el-checkbox(v-model="scope.row.IS_NULLABLE")

            el-table-column(align="center" label="长度/大小")
                template(slot-scope="scope")
                    el-row(:gutter="10")
                        el-col(:span="12")
                            el-input(size="mini" v-model="scope.row.MIN_LENGTH" placeholder=" ")
                        el-col(:span="12")
                            el-input(size="mini" v-model="scope.row.MAX_LENGTH" placeholder=" ")

            el-table-column(prop="DATA_TYPE" align="center" label="邮箱/身份证/手机")
                template(slot-scope="scope")
                    el-checkbox(v-model="scope.row.IS_EMAIL")
                    el-checkbox(v-model="scope.row.IS_MOBILE")
                    el-checkbox(v-model="scope.row.IS_IDNO")

            el-table-column(prop="DATA_TYPE" align="center" label="枚举")
                template(slot-scope="scope")
                    el-input(size="mini"  v-model="scope.row.ENUMAT" placeholder="以，分隔的字符串")

            el-table-column(prop="DATA_TYPE" align="center" label="正则")
                template(slot-scope="scope")
                    el-input(size="mini"  v-model="scope.row.REGEX" placeholder="正则表达式")
</template>

<script>
export default {
  data () {
    return {
      steps: 0,
      stepss: { step_0: 0, step_1: 0, step_2: 0 },
      lists: '',
      formRule: {
        ip: [{ required: true, message: '请输入有效IP！', trigger: 'blur' }],
        port: [{ required: true, message: '请输入有效端口号', trigger: 'blur' }],
        dbName: [{ required: true, message: '请输入有效库名', trigger: 'blur' }],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        dbpwd: [{ required: true, message: '库名不能为空', trigger: 'blur' }],
        tableName: [{ required: true, message: '请输入表名', trigger: 'blur' }],
        modulesName: [{ required: true, message: '模块名不能为空', trigger: 'blur' }],
        javaDevPath: [{ required: true, message: 'java工程路径不能为空', trigger: 'blur' }],
        xmlDevPath: [{ required: true, message: 'xml工程路径不能为空', trigger: 'blur' }]
      },
      formLabelAlign: {
        'currentIndex': '1', //
        'dbType': '1', // 数据库类型 默认1
        'ip': '', // 数据库ip
        'port': '', // 端口号
        'dbName': '', // 数据库库名
        'username': '', // 数据库用户名
        'dbpwd': '', // 数据库密码:
        'tableName': '', // 要生成的表名
        'tableRemark': '', // 表备注
        'modulesName': '', // 模块名
        'javaDevPath': '',
        'xmlDevPath': '',
        'isAddJsp': false, // 是否生成App
        'isBean': true, // 是否生成bean
        'isController': true, // 是否生成controller
        'isJs': false, // 是否生成js
        'isListJsp': false, // 是否生成jsp
        'isMapperJava': true, // 是否生成java
        'isMapperXMl': true, // 是否生成xml
        'isService': true, // 是否生成service
        'isModel': true // 是否生成model
        // 'json_string': '' // sqlTab
      },
      sqlTab: []
    }
  },
  created () {
    this.createjavaList()
  },
  methods: {
    // 获取初始化数据
    createjavaList () {
      this.$http({
        url: this.$http.adornUrl('/createjava/list'),
        method: 'get'
      }).then((data) => {
        this.lists = data
        this.formLabelAlign.port = data.defaultPort
        this.formLabelAlign.ip = data.defaultIp
        this.formLabelAlign.dbName = data.defaultDb
        this.formLabelAlign.username = data.defaultUserName
        this.formLabelAlign.dbpwd = data.defaultPassword
        this.formLabelAlign.javaDevPath = data.javaDevPath
        this.formLabelAlign.xmlDevPath = data.xmlDevPath
      })
    },
    // 验证数据库数据
    verifyDB (step) {
      this.formLabelAlign.currentIndex = this.steps + 1
      this.$http({
        url: this.$http.adornUrl('/createjava/viewTable'),
        method: 'post',
        data: this.formLabelAlign
      }).then((data) => {
        this.$message({ message: data.msg, type: 'success' })
        this.stepss[`step_${this.steps}`] = 1
        if (data.data) {
          let _list = data.data
          _list.map(origin => {
            let _add = { 'YES': false, 'NO': true }[origin.IS_NULLABLE]
            origin.IS_EMAIL = false
            origin.IS_MOBILE = false
            origin.IS_IDNO = false
            origin.IS_NULLABLE = _add
          })
          // console.log(_list)
          this.sqlTab = _list
        }
      })
    },
    createFile (json) {
      this.formLabelAlign.json_string = JSON.stringify(json)
      this.$http({
        url: this.$http.adornUrl('/createjava/createFile'),
        method: 'post',
        data: this.formLabelAlign
      }).then((data) => {
        if (!data.code) {
          this.$message({ message: data.msg, type: 'success' })
          setTimeout(() => {
            this.$router.push('/index')
          }, 1000)
          return
        }
        this.$message.error(data.msg)
      })
    },
    // 进入下一步
    generateNext (pos) {
      if (this.steps === 2) {
        this.createFile(this.sqlTab)
        return
      }
      if (!this.getPass(pos)) return
      this.steps += 1
    },
    // 回到上一步
    backTo () {
      this.steps -= 1
    },
    // 确认是否已验证通过
    getPass (pos) {
      if (this.stepss[pos]) return true
      this.$message.error('验证通过才能进行下一步')
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/public.scss';

    #setting-code {
        .is-success {
            color: #2f74ff;
        }
        .code-form {
            background-color: $el-bg-color-1;
            .code-form-item {
                padding: 40px 0;
            }
        }
        .code-next-btn {
            float: right;
            margin: 15px 0px;
        }
    }
</style>
