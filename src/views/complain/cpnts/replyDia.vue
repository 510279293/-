<template>
  <v-dialog
    title="回复"
    custom-class="reply-dia"
    :visible.sync="config.visible"
    :width="'600px'"
    :close-on-click-modal="false"
    @close="close"
  >
    <div>
      <v-form
        ref="form"
        label-width="86px"
        :model="formData"
        :rules="rules"
      >
        <v-form-item
          v-if="config.visible"
          label="投诉类型"
          prop="categoryId"
        >
          <v-select
            v-model="formData.categoryId"
            class="wid225"
            placeholder="请选择"
          >
            <v-option
              v-for="item in config.options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </v-select>
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="回复内容"
          prop="content"
        >
          <v-input
            v-model="formData.content"
            class="wid300"
            type="textarea"
            :rows="2"
          />
        </v-form-item>
        <v-form-item
          v-if="config.visible"
          label="回复图片"
        >
          <upFile
            class="goods-upfile"
            :max-len="5"
            @fileChange="detailFileChange"
          />
          <p class="tip">
            最多5张。格式：jpg、jpeg、png、gif，大小：2M以内
          </p>
        </v-form-item>
      </v-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        type="primary"
        @click="submit('sure')"
      >
        确定
      </v-button>
      <v-button
        @click="close"
      >
        取消
      </v-button>
    </div>
  </v-dialog>
</template>
<script>
import { compReplyAdd } from '@/services/complain';

export default {
  components: {
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          visible: true,
        };
      },
    },
  },
  data() {
    const notEmpty = (rule, value, callback) => {
      const field = rule.field;
      const msg = `${field === 'categoryId' ? '请选择投诉类型' : '请填写回复内容'}`;
      if (value.length === 0) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      formData: {
        categoryId: '',
        content: '',
        proposalId: '',
        replyUrl: [],
      },
      rules: {
        categoryId: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '请选择投诉类型' },
        ],
        content: [
          { required: true, validator: notEmpty, trigger: ['blur', 'change'], message: '请填写回复内容' },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    async compReplyAddApi(param={}) {
      const res = await compReplyAdd(param);
      if (res.success) {
        this.$message.success('回复成功!');
        this.$parent.handleSearch && this.$parent.handleSearch();
        this.close();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.compReplyAddApi(Object.assign({}, this.formData, {
            proposalId: this.config.proposalId,
          }));
        }
      });
    },
    close() {
      this.$refs.form.resetFields();
      this.config.visible = false;
    },
    detailFileChange(fileArr) {
      this.formData.replyUrl = fileArr;
    },
  },
};
</script>

<style lang="less" scoped>
.reply-dia{
  .wid300{
    width:300px;
  }
  .main-name{
    font-size: 16px;
    color:#333;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .tip{
    color:#999;
    font-size: 12px;
  }
}
</style>
<style lang="less">
.reply-dia{
  .v-upload{
    width:60px;
    height:60px;
    line-height: 70px;
  }
}
</style>
