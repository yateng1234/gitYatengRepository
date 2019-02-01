<template>
  <div>
    <img
      src="./image/d2-help-button@2x.png"
      style="width: 138px;"
      @click="dialogVisible = true">
    <el-dialog
      title="帮助"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <div style="margin-top: -25px; margin-bottom: -25px;">
        <el-button-group class="d2-mb">
          <!--@click="$open('https://github.com/d2-projects/d2-admin')"-->
          <el-button>
            <d2-icon name="github" class="d2-mr-5"/>
            主页
          </el-button>
          <el-button>
            <d2-icon name="book" class="d2-mr-5"/>
            开发文档
          </el-button>
          <el-button>
            <d2-icon name="question" class="d2-mr-5"/>
            扩展信息
          </el-button>
          <el-button>
            <d2-icon name="plus" class="d2-mr-5"/>
            加入开发
          </el-button>
        </el-button-group>
        <el-row :gutter="20">
          <el-col :span="12">
            以后会完善开发文档、加入开发说明
            <br/>
          </el-col>
        </el-row>
        <!--<el-row :gutter="20">-->
          <!--<el-col :span="12">-->
            <!--<el-alert :closable="false" type="info" title="扫码进 QQ 群 [ 推荐 ]" class="d2-mb"/>-->
            <!--<img src="./image/qq.jpg" style="width: 100%;">-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-alert :closable="false" type="info" title="作者微信 加好友后邀请进微信群" class="d2-mb"/>-->
            <!--<img src="./image/we.jpg" style="width: 100%;">-->
          <!--</el-col>-->
        <!--</el-row>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'd2-page-cover',
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
