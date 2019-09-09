<template>
  <v-dialog
    class="add-role-dia"
    :title="config.title"
    :close-on-click-modal="false"
    :visible.sync="config.visible"
    :width="'600px'"
  >
    <v-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="86px"
    >
      <v-form-item
        label="角色名称"
        prop="roleName"
      >
        <v-input
          v-model="form.roleName"
          class="wid280"
          maxlength="20"
          auto-complete="off"
          placeholder="20个字符以内"
        />
      </v-form-item>
      <v-form-item
        v-if="config.visible"
        label="角色描述"
        prop="description"
      >
        <v-input
          v-model="form.description"
          class="wid280"
          type="textarea"
          :rows="2"
          auto-complete="off"
          placeholder="40个字以内"
          maxlength="40"
          show-word-limit
        />
      </v-form-item>
    </v-form>
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
import { roleAdd, roleEdit } from '@/services/permission';
import { regTest } from '@/utils/index';

export default {
  components: {},
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          visible: false,
        };
      },
    },
  },
  data() {
    // 验证商品名称
    const checkName = (rule, value, callback) => {
      const field = rule.field;
      let msg = '';
      if (field === 'roleName') {
        msg = '请输入角色名称';
      }
      if (value === '') {
        callback(new Error(msg));
      } else if (value.length > 20) {
        callback(new Error('长度在20个字以内'));
      } else {
        const reg = regTest.userNameReg;
        if (!reg.test(value)) {
          callback(new Error('请输入中文、英文或数字'));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        roleName: '',
        description: '',
      },
      rules: {
        roleName: [
          {
            required: true,
            validator: checkName,
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    'config.visible'(val) {
      if (val) {
        Object.assign(this.form, this.config.row);
      }
    },
  },
  mounted() {},
  methods: {
    async roleAddApi(param) {
      const res = await roleAdd(param);
      if (res.success) {
        this.$message.success('添加成功');
        this.close();
        this.$emit('sure');
        this.$parent.getRoleList && this.$parent.getRoleList();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async roleUpdate(param) {
      const res = await roleEdit(param);
      if (res.success) {
        this.$message.success('编辑成功');
        this.close();
        this.$emit('sure');
        this.$parent.getRoleList && this.$parent.getRoleList();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      if (str === 'sure') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.config.row ? this.roleUpdate(this.form) : this.roleAddApi(this.form);
          }
        });
      }
    },
    close() {
      this.$refs.form.resetFields();
      this.config.visible = false;
      this.form = {
        roleName: '',
        description: '',
      };
    },
  },
};
</script>

<style lang="less">
.add-role-dia {
  .wid280{
    width:280px;
  }
  .wid140{
    width:140px;
  }
  .goods-upfile {
    .v-upload {
      width: 60px;
      height: 60px;
      line-height: 66px;
    }
  }
  .tip{
    font-size:12px;
    color:#999;
    line-height: 12px;
    padding-top:6px;
  }
}
</style>
