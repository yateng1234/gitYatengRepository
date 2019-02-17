<template lang="pug">
    d2-container
        .mod-user
            el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
                el-form-item
                    el-input(v-model='dataForm.name', placeholder='姓名', clearable='')
                el-form-item
                    el-button(@click='getDataList()') 查询
                    el-button(v-if="isAuth('sys:user:save')", type='primary', @click='addOrUpdateHandle()') 新增
                    el-button(v-if="isAuth('sys:user:delete')", type='danger', @click='deleteHandle()', :disabled='dataListSelections.length <= 0') 批量删除
            el-table(:data='dataList', border='', v-loading='dataListLoading', @selection-change='selectionChangeHandle', style='width: 100%;')
                el-table-column(type='selection', header-align='center', align='center', width='50')
                el-table-column(prop='name', header-align='center', align='center', label='姓名')
                el-table-column(prop='age', header-align='center', align='center', label='年龄')
                el-table-column(prop='password', header-align='center', align='center', label='密码')
                el-table-column(prop='brithDate',header-align='center', align='center', label='出生日期')
                el-table-column(prop='status', header-align='center', align='center', label='状态')
                    template(slot-scope='scope')
                        el-tag(v-if='scope.row.status === 0', size='small', type='danger') 禁用
                        el-tag(v-else='', size='small') 正常
                el-table-column(prop='byx1', header-align='center', align='center', label='备注1')
                el-table-column(prop='byx2', header-align='center', align='center', label='备注2')
                el-table-column(prop='byx3', header-align='center', align='center', label='备注3')
                el-table-column(prop='byx4', header-align='center', align='center', label='备注4')
                el-table-column(prop='byx5', header-align='center', align='center', label='备注5')
                
                el-table-column(fixed='right', header-align='center', align='center', width='150', label='操作')
                    template(slot-scope='scope')
                        el-button(type='text', size='small', @click='addOrUpdateHandle(scope.row.id)') 修改
                        el-button(type='text', size='small', @click='viewHandle(scope.row.id)') 查看
                        el-button(v-if="scope.row.username !== 'admin'", type='text', size='small', @click='deleteHandle(scope.row.id)') 删除
                el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
            // 弹窗, 新增 / 修改 / 查看
            add-or-update(v-if='addOrUpdateVisible', ref='addOrUpdate', @refreshdatalist='getDataList')
            query-view(v-if='viewVisible', ref='queryView', @refreshdatalist='getDataList')
</template>

<script>
import AddOrUpdate from './test-add-or-update'
import QueryView from './test-view'
export default {
  name: 'sys-user',
  data () {
    return {
        dataForm: {
         userName: ''
      },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        viewVisible: false
    }
  },
  components: {
      AddOrUpdate,
      QueryView
  },
  created () {
    this.getDataList()
  },
  methods: {
    formatTime(row, column) {
      if(row[column.property]){
        const date = new Date(row[column.property])
        return date.getFullYear() + '-' +
        (date.getMonth()+1) + '-' +
        (date.getDate())
      }
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/userInfo/list'),
        method: 'post',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'username': this.dataForm.name
        })
      }).then((data) => {
        console.log('data', data)
        if (data) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
           this.$refs.addOrUpdate.init(id)
      })
    },
    // 查看
    viewHandle (id) {
      this.viewVisible = true
      this.$nextTick(() => {
           this.$refs.queryView.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/userInfo/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then((data) => {
          if (data) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else { this.$message.error(data.msg) }
        })
      }).catch(() => {})
    }
  }
}
</script>
