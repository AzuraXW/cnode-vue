<template>
  <div class="create-topic">
    <el-row>
      <el-card>
        <div slot="header">
          {{topicEditId ? '编辑' : '发布'}}主题
        </div>
        <div class="edit-area">
          <el-form
            :model="createForm"
            :rules="rules"
            ref="form"
            label-position="top"
          >
            <el-form-item label="选择板块" prop="tab">
              <el-select v-model="createForm.tab" placeholder="请选择">
                <el-option
                  v-for="item in tabOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题标题" prop="title" label-width="180">
              <el-input v-model="createForm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item prop="content">
              <mavon-editor v-model="createForm.content" class="editor"/>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" class="publish-btn">发布</el-button>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['topicEditId'],
  data () {
    return {
      createForm: {
        tab: '',
        title: '',
        content: ''
      },
      editTopicDateil: {},
      tabOptions: [
        {
          value: 'share',
          label: '分享'
        },
        {
          value: 'ask',
          label: '回答'
        },
        {
          value: 'job',
          label: '招聘'
        },
        {
          value: 'dev',
          label: '客户端测试'
        }
      ],
      rules: {
        tab: [{ required: true, message: '请选择发布板块', trigger: 'blur' }],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    if (this.topicEditId) {
      this.changeTitle('编辑主题')
      this.getEditTopicDateil()
      return
    }
    this.changeTitle('发布主题')
  },
  methods: {
    onSubmit () {
      if (!this.accesstoken) {
        this.$msg({
          type: 'warning',
          message: '您还没有登录，登录后才可以发布主题'
        })
        return
      }
      // 编辑主题类型
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.submitEditTopic()
          } else {
            this.submitCreateForm()
          }
        }
      })
    },
    async getEditTopicDateil () {
      const res = await this.$api.topic.getTopicsDateil({
        topicId: this.topicEditId,
        mdrender: false
      })
      if (res.success) {
        this.editTopicDateil = res.data
        this.createForm.title = res.data.title
        this.createForm.tab = res.data.tab
        this.createForm.content = res.data.content
      }
    },
    async submitCreateForm () {
      const options = { ...this.createForm, accesstoken: this.accesstoken }
      let res = null
      try {
        res = await this.$api.topic.createTopic(options)
      } catch (e) {
        this.$msg({
          type: 'error',
          message: e.response.data.error_msg
        })
      }
      if (res.success) {
        this.$router.push({ name: 'Topic', params: { id: res.topic_id } })
      }
    },
    async submitEditTopic () {
      const options = {
        ...this.createForm,
        accesstoken: this.accesstoken,
        topic_id: this.topicEditId
      }
      const res = await this.$api.topic.update(options)
      if (res.success) {
        this.$msg({
          type: 'success',
          message: '编辑成功！'
        })
        this.$router.push({ name: 'Topic', params: { id: res.topic_id } })
      } else {
        this.$router.back()
      }
    }
  },
  computed: {
    ...mapState(['accesstoken', 'loginStatus', 'loginInfo']),
    isEdit () {
      return !!this.topicEditId
    }
  }
}
</script>

<style lang="scss" scoped>
.create-topic{
  padding: 25px;
  .right{
    padding-left: 25px;
    @media (max-width: 768px) {
      padding-left: 0;
      margin-top: 25px;
    }
  }
  .editor{
    min-height: 450px;
    max-height: 600px;
  }
  .publish-btn{
    margin-top: 25px;
  }
}
</style>
