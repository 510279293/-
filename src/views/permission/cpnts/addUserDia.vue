<template>
  <v-dialog
    class="add-user-dia"
    :title="config.title"
    :close-on-click-modal="false"
    :visible.sync="config.visible"
    :width="'600px'"
    :before-close="close"
  >
    <v-form
      ref="form"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="86px"
    >
      <v-form-item
        label="用户名称"
        prop="nickName"
      >
        <v-input
          v-model="form.nickName"
          class="wid280"
          auto-complete="off"
          maxlength="20"
          placeholder="请输入"
        />
      </v-form-item>
      <v-form-item
        label="账号"
        prop="userName"
      >
        <v-input
          v-model="form.userName"
          :disabled="config.type === 'edit'"
          class="wid280"
          auto-complete="off"
          placeholder="请输入"
        />
      </v-form-item>
      <v-form-item
        label="密码"
        :prop="'password'"
      >
        <v-input
          v-model="form.password"
          type="password"
          class="wid280"
          show-password
          auto-complete="off"
          :placeholder="config.type === 'edit' ? '请输入新密码,为空表示使用原密码' : '请输入英文、数字或组合'"
        >
          <!-- <i
            v-if="form.password !== ''"
            slot="suffix"
            class="v-icon-view v-input__icon"
          /> -->
        </v-input>
      </v-form-item>
      <v-form-item
        label="绑定角色"
        prop="roleId"
      >
        <v-select
          v-model="form.roleId"
          class="wid280"
          multiple
          placeholder="请选择"
        >
          <v-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </v-select>
      </v-form-item>
      <v-form-item
        label="邮箱"
        prop="email"
      >
        <v-input
          v-model="form.email"
          class="wid280"
          auto-complete="off"
          placeholder="请输入"
        />
      </v-form-item>
      <v-form-item
        label="手机号"
        prop="phone"
      >
        <v-input
          v-model="form.phone"
          class="wid280"
          auto-complete="off"
          placeholder="请输入"
        />
      </v-form-item>
      <v-form-item
        label="用户描述"
        prop="note"
      >
        <v-input
          v-model="form.note"
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
import { roleList, userRegister, userUpdate, userInfo } from '@/services/permission';
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
    // 校验用户名称
    const checkName = (rule, value, callback) => {
      const field = rule.field;
      let msg = '';
      if (field === 'nickName') {
        msg = '请输入用户名称';
      }
      if (field === 'userName') {
        msg = '请输入账号';
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
    // 校验密码
    const checkPwd = (rule, value, callback) => {
      // const field = rule.field;
      const msg = '请输入密码';
      const reg = regTest.pwdReg;
      if (this.config.type !== 'edit') {
        if (value === '') {
          callback(new Error(msg));
        } else if (value.length > 30) {
          callback(new Error('长度在30个字以内'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('只可输入英文、数字或组合'));
          } else {
            callback();
          }
        }
      } else {
        if (value.length > 30) {
          callback(new Error('长度在30个字以内'));
        } else if (value !== '' && !reg.test(value)) {
          callback(new Error('只可输入英文、数字或组合'));
        } else {
          callback();
        }
      }
    };
    // 校验邮箱
    const checkEmail = (rule, value, callback) => {
      const reg = regTest.emailReg;
      console.log(value.length);
      if (value.length > 50) {
        callback(new Error('长度在50个字符以内'));
      } else if (value !== '' && !reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      const reg = regTest.phoneReg;
      if (value !== '' && !reg.test(value)) {
        callback(new Error('请输入正确的手机格式'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        nickName: '',
        userName: '',
        password: '',
        roleId: '',
        email: '',
        phone: '',
        note: '',
        icon: '',
      },
      rules: {
        nickName: [
          {
            required: true,
            validator: checkName,
            trigger: ['blur', 'change'],
          },
        ],
        userName: [
          {
            required: true,
            validator: checkName,
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            validator: checkPwd,
            trigger: ['blur', 'change'],
          },
        ],
        roleId: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: '请选择角色',
          },
        ],
        email: [
          {
            required: false,
            validator: checkEmail,
            trigger: ['blur', 'change'],
            // message: '请输入正确的邮箱格式',
          },
        ],
        phone: [
          {
            required: false,
            validator: checkPhone,
            trigger: ['blur', 'change'],
            message: '请输入正确的手机格式',
          },
        ],
      },
      roleOptions: [],
    };
  },
  computed: {},
  watch: {
    'config.visible'(val) {
      if (val) {
        this.$nextTick((_) => {
          this.$refs.form.resetFields();
          this.config.type === 'edit' ?
            (
              this.rules.password[0].required = false,
              this.userInfoApi({ userId: this.config.row.userId })
            ) : this.rules.password[0].required = true;
        });
      }
    },
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    async userInfoApi(param={}) {
      this.loading = true;
      const res = await userInfo(param);
      if (res.success) {
        Object.assign(this.form, res.value.data);
      }
      this.loading = false;
    },
    async getRoleList(param={}) { // 获取角色列表
      const res = await roleList(param={});
      if (res.success) {
        this.roleOptions = res.value.data;
      }
    },
    async userRegisterApi(param) { // 添加用户
      const res = await userRegister(param);
      if (res.success) {
        this.$message.success('添加成功');
        this.close();
        this.$parent.getUserList && this.$parent.getUserList();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async userUpdateApi(param) { // 修改用户
      const res = await userUpdate(param);
      if (res.success) {
        this.$message.success('修改成功');
        this.close();
        this.$parent.getUserList && this.$parent.getUserList();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    submit(str) {
      if (str === 'sure') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.config.row ?
              this.userUpdateApi(Object.assign({ userId: this.config.row.userId }, this.form))
              : this.userRegisterApi(this.form);
          }
        });
      }
    },
    close() {
      this.$refs.form.resetFields();
      this.$emit('close');
    },
  },
};
</script>

<style lang="less">
.add-user-dia {
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
