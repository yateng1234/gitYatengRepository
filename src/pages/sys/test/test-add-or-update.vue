<template lang="pug">
  el-dialog(:title="!dataForm.id ? '新增' : '修改'", :close-on-click-modal='false', :visible.sync='visible')
    el-form(:model='dataForm', :rules='dataRule', ref='dataForm', @keyup.enter.native='dataFormSubmit()', label-width='80px')
      el-form-item(label='姓名', prop='name')
        el-input(v-model='dataForm.name',placeholder='姓名')
      el-form-item(label='年龄', prop='age')
        el-input(v-model='dataForm.age',placeholder='年龄')  
      el-form-item(label='密码', prop='password', :class="{ 'is-required': !dataForm.id }")
        el-input(v-model='dataForm.password', type='password', placeholder='密码')
      el-form-item(label='角色', size='mini', prop='roleIdList')
        el-checkbox-group(v-model='dataForm.roleIdList')
        el-checkbox(v-for='role in roleList', :key='role.roleId', :label='role.roleId') {{ role.roleName }}
      el-form-item(label='状态', size='mini', prop='status')
        el-radio-group(v-model='dataForm.status')
          el-radio(:label='0') 禁用
          el-radio(:label='1') 正常
      el-form-item(label='出生日期', prop='brithDate')
        <el-date-picker type="date"  v-model="dataForm.brithDate" placeholder="选择出生日期" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
      el-form-item(label='备用字段1', prop='byx1')
        el-input(v-model='dataForm.byx1',placeholder='备用字段1')
      el-form-item(label='备用字段2', prop='byx2')
        el-input(v-model='dataForm.byx2',placeholder='备用字段2')
      el-form-item(label='备用字段3', prop='byx3')
        el-input(v-model='dataForm.byx3',placeholder='备用字段3')
      el-form-item(label='备用字段4', prop='byx4')
        el-input(v-model='dataForm.byx4',placeholder='备用字段4')
      el-form-item(label='备用字段5', prop='byx5')
        el-input(v-model='dataForm.byx5',placeholder='备用字段5')
    span.dialog-footer(slot='footer')
      el-button(@click='visible = false') 取消
      el-button(type='primary',v-if:disabled="isView==true" @click='dataFormSubmit()') 确定
</template>

<script>
export default {
  data () {
    return {
        visible: false,
        readonly:false,
        roleList: [],
        dataForm: {
            id: 0,
            name: '',
            age: '',
            password: '',
            byx1: '',
            byx2: '',
            byx3: '',
            byx4: '',
            byx5: '',
            brithDate: '',
            roleIdList: [],
            status: 1,
            brithDateString:''
      },
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
          this.dataForm.id = id || 0
           this.$http({
        url: this.$http.adornUrl('/sys/role/select'),
        method: 'get',
        params: this.$http.adornParams()
      }).then((data) => {
        this.roleList = data && data.code === 0 ? data.list : []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
         if (this.dataForm.id) {
                 this.$http({
                     url: this.$http.adornUrl(`/userInfo/getId/${this.dataForm.id}`),
                     method: 'get',
                     params: this.$http.adornParams()
                 }).then((data) => {
                     if (data) {
                         this.dataForm.name = data.bean.name
                         this.dataForm.age =  data.bean.age
                         this.dataForm.password = data.bean.password
                         this.dataForm.byx1 = data.bean.byx1
                         this.dataForm.byx2 = data.bean.byx2
                         this.dataForm.byx3 = data.bean.byx3
                         this.dataForm.byx4 = data.bean.byx4
                         this.dataForm.byx5 = data.bean.byx5
                         this.dataForm.brithDate = data.bean.brithDate
                         this.dataForm.status = data.bean.status
                         this.dataForm.roleIdList = data.bean.roleIdList
                     }
                 })
             }
      })
        
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/userInfo/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'age': this.dataForm.age,
              'password': this.dataForm.password,
              'byx1': this.dataForm.byx1,
              'byx2': this.dataForm.byx2,
              'byx3': this.dataForm.byx3,
              'byx4': this.dataForm.byx4,
              'byx5': this.dataForm.byx5,
              'brithDate': this.dataForm.brithDate,
              'status': this.dataForm.status,
              'roleIdList': this.dataForm.roleIdList
            }
          }).then((data) => {
            if (data) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshdatalist')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
