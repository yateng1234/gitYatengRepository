<template lang="pug">
  el-dialog(:title="'查看'", :close-on-click-modal='false', :visible.sync='visible')
    el-form(:model='dataForm', ref='dataForm',label-width='80px')
      el-form-item(label='姓名', prop='name')
        el-input(v-model='dataForm.name',placeholder='姓名',:readonly='true')
      el-form-item(label='年龄', prop='age')
        el-input(v-model='dataForm.age',placeholder='年龄')  
      el-form-item(label='密码', prop='password', :class="{ 'is-required': !dataForm.id }")
        el-input(v-model='dataForm.password', type='password', placeholder='密码',:readonly='true')
      el-form-item(label='角色', size='mini', prop='roleIdList')
         el-input(v-model='dataForm.roleNames',placeholder='角色',:readonly='true')
      el-form-item(label='状态', size='mini', prop='status')
        el-input(v-model='dataForm.statusValue', placeholder='密码',:readonly='true')
      el-form-item(label='出生日期', prop='brithDate')
         el-input(v-model='dataForm.brithDate', placeholder='密码',:readonly='true')
      el-form-item(label='备用字段1', prop='byx1')
        el-input(v-model='dataForm.byx1',placeholder='备用字段1',:readonly='true')
      el-form-item(label='备用字段2', prop='byx2')
        el-input(v-model='dataForm.byx2',placeholder='备用字段2',:readonly='true')
      el-form-item(label='备用字段3', prop='byx3')
        el-input(v-model='dataForm.byx3',placeholder='备用字段3',:readonly='true')
      el-form-item(label='备用字段4', prop='byx4')
        el-input(v-model='dataForm.byx4',placeholder='备用字段4',:readonly='true')
      el-form-item(label='备用字段5', prop='byx5')
        el-input(v-model='dataForm.byx5',placeholder='备用字段5',:readonly='true')
    span.dialog-footer(slot='footer')
      el-button(@click='visible = false') 取消
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
            statusValue:'',
            brithDate: '',
            roleIdList: [],
            status: 1,
            roleNames:''
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
                         
                         if(data.bean.status==0){
                             this.dataForm.statusValue='禁用' 
                         }else{
                             this.dataForm.statusValue='正常'
                         }
                     }
                 })
             }
      })
        
    }
  }
}
</script>
