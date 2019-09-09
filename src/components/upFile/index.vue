<template>
  <div class="up-file">
    <div
      v-for="(item,idx) in fileList"
      :key="idx"
      class="file-items"
    >
      <img :src="item.url || item">
      <i
        class="v-icon-error"
        @click="removeFile(idx)"
      />
    </div>
    <v-upload
      v-if="fileList.length < maxLen"
      :action="baseUpUrl"
      :accept="accept"
      list-type="picture-card"
      :show-file-list="false"
      :on-preview="upPreview"
      :on-remove="upRemove"
      :on-success="upSuccess"
      :on-error="upError"
      :before-upload="beforeUpload"
    >
      <i class="v-icon-plus" />
    </v-upload>
  </div>
</template>
<script>
export default {
  name: 'UpFile',
  components: {},
  props: {
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif',
    },
    fileArr: {
      type: Array,
    },
    maxLen: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      baseUpUrl: '',
      fileList: [],
    };
  },
  computed: {},
  watch: {
    'fileArr'(val) {
      this.fileList = [...this.fileArr];
    },
  },
  mounted() {
    let str = 'VUE_APP_UpUrl';
    process.env.NODE_ENV === 'development' ? null : str = 'VUE_APP_URL';
    this.baseUpUrl = process.env[str] + '/v1/file/fresh/upload';
  },
  methods: {
    upPreview() {},
    upRemove() {},
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      isLt2M ? null : this.$message.error('文件大于2M,请重新上传!');
      return isLt2M;
    },
    upSuccess(response, file, fileList) {
      this.fileList = [...this.fileList, file.response.value.data.url];
      this.$emit('fileChange', this.fileList);
    },
    upError(err, file, fileList) {
      // this.$emit('fileUpError', this.fileList)
      this.$message.error(err.codeDesc || '上传失败!');
    },
    removeFile(idx) {
      this.fileList.splice(idx, 1);
      this.$emit('fileChange', this.fileList);
    },
  },
};
</script>

<style lang="less" scoped>
.up-file {
  display: flex;
  flex-wrap: wrap;
  .file-items {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 14px;
    border: 1px dashed #ccc;
    img {
      width: 100%;
      height: 100%;
    }
    .v-icon-error {
      position: absolute;
      right: -8px;
      top: -8px;
      color: #666;
      font-size: 14px;
      z-index: 9;
      cursor: pointer;
    }
  }
}
</style>
