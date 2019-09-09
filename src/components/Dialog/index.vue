<template>
  <div>
    <v-dialog
      :title="config.title"
      :visible.sync="config.visible"
      :width="'300px'"
      :close-on-click-modal="true"
    >
      <span class="content">{{ config.content }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <v-button
          type="primary"
          @click="confirm"
        >确 定</v-button>
        <v-button @click="cancel">取 消</v-button>
      </span>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
        };
      },
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    confirm() {
      this.config.callBack && this.config.callBack();
      this.$emit('sure');
    },
    cancel() {
      this.config.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.content{
    font-size:14px;
    color:#333;
    line-height:20px;
}
</style>
