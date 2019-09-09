<template>
  <div class="no-permission">
    <div class="dis-flex">
      <p><img src="@/assets/img/lock.jpg"></p>
      <p>暂无权限,请联系管理员</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoPermission',
  components: {
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
  },
};
</script>

<style lang="less" scoped>
.no-permission{
  height:calc(100vh - 100px);
  margin:0 auto;
  .dis-flex{
    text-align: center;
    img{
      width:100px;
      height:100px;
      margin-bottom: 25px;
      margin-top:20vh;
    }
    color:#999;
    font-size: 16px;
  }
}
</style>
