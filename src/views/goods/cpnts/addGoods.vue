<template>
  <v-dialog
    class="goods-dia"
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
        label="商品名称"
        prop="productName"
      >
        <v-input
          v-model="form.productName"
          class="wid280"
          auto-complete="off"
          placeholder="20个字以内"
        />
      </v-form-item>
      <v-form-item
        label="副标题"
        prop="intro"
      >
        <v-input
          v-model="form.intro"
          class="wid280"
          auto-complete="off"
          placeholder="20个字以内"
        />
      </v-form-item>
      <v-form-item
        label="商品编码"
        prop="productCode"
      >
        <v-input
          v-model="form.productCode"
          class="wid280"
          auto-complete="off"
          :disabled="config.str !== 'add'"
          :maxlength="5"
          placeholder="规则：5位数字，如10010"
        />
      </v-form-item>
      <v-form-item
        label="商品主图"
        prop="mainPic"
      >
        <upFile
          class="goods-upfile"
          :max-len="1"
          :file-arr="form.mainPic"
          @fileChange="mainFileChange"
        />
        <p class="tip">
          格式：jpg、jpeg、png、gif，大小：2M以内，建议尺寸：750*750px
        </p>
      </v-form-item>
      <v-form-item
        label="商品库存"
        prop="stock"
      >
        <v-input-number
          v-model="form.stock"
          :min="1"
          :max="9999"
          label="描述文字"
        />
      </v-form-item>
      <v-form-item
        label="预警库存"
        prop="warnStock"
      >
        <v-input-number
          v-model="form.warnStock"
          :min="1"
          :max="9999"
          label="描述文字"
        />
      </v-form-item>
      <v-form-item
        label="积分值"
        prop="consumePoint"
      >
        <v-input
          v-model="form.consumePoint"
          class="wid140"
          auto-complete="off"
          :max="999999"
        />
      </v-form-item>
      <v-form-item
        label="商品详情"
        prop="detailPic"
      >
        <upFile
          class="goods-upfile"
          :max-len="15"
          :file-arr="form.detailPic"
          @fileChange="detailFileChange"
        />
        <p class="tip">
          最多15张。格式：jpg、jpeg、png、gif，大小：2M以内
        </p>
      </v-form-item>
    </v-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <v-button
        @click="close"
      >
        取消
      </v-button>
      <v-button
        type="primary"
        @click="submit('sure')"
      >
        确定
      </v-button>
    </div>
  </v-dialog>
</template>
<script>
import { productDetail, productEdit, productAdd } from '@/services/goods';
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
      if (field === 'productName') {
        msg = '请输入商品名称';
      }
      if (field === 'intro') {
        msg = '请输入副标题';
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
    const checkPrdCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品编码'));
      } else {
        const reg = regTest.prdCodeReg;
        if (!reg.test(value)) {
          callback(new Error('请输入五位数字'));
        } else {
          callback();
        }
      }
    };
    const checkDoubleNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入积分值'));
      } else {
        const reg = regTest.doubleNum;
        if (!reg.test(value)) {
          callback(new Error('请输入合法数字'));
        } else {
          if (value > 999999) {
            callback(new Error('大小不超过999999'));
          } else {
            callback();
          }
        }
      }
    };
    const checkUrls = (rule, value, callback) => {
      // const field = rule.field;
      let msg = '';
      if (rule.field === 'mainPic') {
        msg = '请选择图片/格式：jpg、jpeg、png';
      }
      if (rule.field === 'detailPic') {
        msg = '请选择图片/格式：jpg、jpeg、png、gif';
      }
      if (value.length === 0) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        productName: '',
        intro: '',
        productCode: '',
        mainPic: [],
        stock: 1,
        warnStock: 1,
        consumePoint: 0,
        detailPic: [],
      },
      rules: {
        productName: [
          {
            required: true,
            validator: checkName,
            trigger: ['blur', 'change'],
          },
        ],
        intro: [
          {
            required: true,
            validator: checkName,
            trigger: ['blur', 'change'],
          },
        ],
        productCode: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: checkPrdCode,
            // message: '请输入商品编码',
          },
        ],
        mainPic: [
          {
            required: true,
            validator: checkUrls,
            trigger: ['change'],
            message: '请选择图片/格式：jpg、jpeg、png',
          },
        ],
        stock: [{ required: true, trigger: ['blur', 'change'] }],
        warnStock: [{ required: true, trigger: ['blur', 'change'] }],
        consumePoint: [
          {
            required: true,
            validator: checkDoubleNum,
            trigger: ['blur', 'change'],
            // message: '请输入积分值',
          },
        ],
        detailPic: [
          {
            required: true,
            validator: checkUrls,
            trigger: ['change'],
            message: '请选择图片/格式:jpg、jpeg、png、gif',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    'config.visible'(val) {
      if (val) {
        this.config.str !== 'add' ? this.getProductDetail({ id: this.config.id }) : null;
      }
    },
  },
  mounted() {},
  methods: {
    async getProductDetail(param) {
      this.loading = true;
      const res = await productDetail(param);
      if (res.success) {
        const mainPic = res.value.data.mainPic;
        res.value.data.mainPic = [mainPic];
        Object.assign(this.form, res.value.data);
      }
      this.loading = false;
    },
    async productEditApi(param) {
      const res = await productEdit(param);
      if (res.success) {
        this.$message.success('商品编辑成功!');
        this.close(this.form);
        this.$parent.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async productAddApi(param) {
      const res = await productAdd(param);
      if (res.success) {
        this.$message.success('商品添加成功!');
        this.close(this.form);
        this.$parent.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    mainFileChange(fileArr) {
      this.form.mainPic = fileArr;
      const method = this.form.mainPic.length > 0 ? 'clearValidate' : 'validateField';
      this.$refs.form[method]('mainPic');
    },
    detailFileChange(fileArr) {
      this.form.detailPic = fileArr;
      const method = this.form.detailPic.length > 0 ? 'clearValidate' : 'validateField';
      this.$refs.form[method]('detailPic');
    },
    submit(str) {
      if (str === 'sure') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log(this.form);
            const param = JSON.parse(JSON.stringify(this.form));
            param.mainPic = param.mainPic[0];
            this.config.str !== 'add' ?
              this.productEditApi(param) : this.productAddApi(param);
          }
        });
      }
      // this.visible = false;
    },
    close(form=null) {
      this.$refs.form.resetFields();
      this.$emit('close', form);
    },
  },
};
</script>

<style lang="less">
.goods-dia {
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
