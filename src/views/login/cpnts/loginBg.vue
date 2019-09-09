<template>
  <div class="login-bg">
    <div class="posi">
      <!-- <h2 class="login-bg-title"><span>Face Server管理</span></h2> -->
      <slot />
      <div class="login-bg-bottom">
        Copyright 2016-2019 StartDT.com. All Rights Reserved. 奇点云 版权所有
      </div>
    </div>
  </div>
</template>

<script>
// import Dotline from './canvas-particle';

export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  position: relative;
  height: 100%;
  color: #fff;
  // background: url('../../../assets/img/img-bg-login.jpg') no-repeat;
  background: linear-gradient(90deg, #041315 0%, #0f3f41 100%);
  background-size: cover;
  .posi {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: url("https://yhdsj.oss-cn-shanghai.aliyuncs.com/login.png");
    background-size: 100%;
  }
  &-title {
    padding: 20px 0 0 20px;
    font-size: 16px;
    display: flex;
    align-content: center;
    line-height: 30px;
    font-weight: 500;
    img {
      width: 80px;
      height: 27px;
    }
    i {
      width: 1px;
      background: #fff;
      display: inline-block;
      height: 18px;
      margin: 5px 6px 0px;
    }
    span {
      display: inline-block;
      height: 26px;
    }
  }
  &-bottom {
    position: absolute;
    width: 100%;
    bottom: 0px;
    border-top: 1px solid #6d8587;
    font-size: 12px;
    color: #999999;
    padding: 23px 52px;
  }
}
</style>
