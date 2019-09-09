<template>
  <v-dialog
    custom-class="preview-dia"
    :title="''"
    :visible.sync="config.visible"
    :width="'540px'"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="img-warps">
      <img :src="config.url">
    </div>
  </v-dialog>
</template>
<script>
export default {
  components: {
  },
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
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    handleClose() {

    },
  },
};
</script>

<style lang="less" scoped>
.preview-dia{
  .img-warps{
    max-width: 100%;
    img{
      width:100%;
    }
  }
}
</style>
<style lang="less">
.preview-dia{
  .v-dialog__header{
    border:none;
  }
  .v-dialog__headerbtn{
    top:10px;
  }
}
</style>
