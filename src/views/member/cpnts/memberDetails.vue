<template>
  <div class="details-box">
    <v-dialog
      title="会员详情"
      :visible.sync="config.visible"
      :width="'600px'"
      :close-on-click-modal="true"
      @close="close"
    >
      <div v-loading="loading">
        <div class="main-info">
          <div class="top-box">
            <div class="head-pic">
              <img
                :src="detailInfo.avatarUrl || defaultAvatar"
                alt=""
              >
            </div>
            <div class="top-info">
              <div class="info-name">
                {{ detailInfo.nickName }}
              </div>
              <div class="info-tel">
                {{ detailInfo.phone || '-' }}
              </div>
            </div>
          </div>
          <div class="middle-box">
            <div class="member-card">
              会员卡号: {{ detailInfo.cardNumber || '-' }}
            </div>
            <div class="card-time">
              （注册时间: {{ detailInfo.createTime | dateTime }}）
            </div>
          </div>
          <div class="bottom-box">
            <div class="score">
              可用积分：{{ detailInfo.integral || '-' }}
            </div>
            <div class="usedScore">
              已使用积分：{{ detailInfo.useIntegral || '-' }}
            </div>
          </div>
        </div>
        <div class="face-pic">
          <span class="left-info">人脸照片：</span>
          <div class="right-info">
            <img
              v-if="detailInfo.faceUrl"
              :src="detailInfo.faceUrl"
              alt=""
            >
            <span v-else>-</span>
          </div>
        </div>
        <div class="real-name">
          <span class="left-info">真实姓名：</span>
          <div class="right-info">
            <span>{{ detailInfo.realName }}</span>
          </div>
        </div>
        <div class="idCard">
          <span class="left-info">身份证号：</span>
          <div class="right-info">
            <span>{{ detailInfo.idNumber || '-' }}</span>
          </div>
        </div>
        <div class="address">
          <span class="left-info">收货地址：</span>
          <div class="right-info">
            <span
              v-for="(item,idx) in detailInfo.addressVOList"
              :key="idx"
              :class="['address-info', item.defaults ? 'defaultAddress' : '']"
            >{{ item.address }}</span>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { memberDetail } from '@/services/member';
import defaultAvatar from '@/assets/img/avatar.jpg';

export default {
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
      loading: false,
      defaultAvatar: defaultAvatar,
      detailInfo: {},
    };
  },
  watch: {
    'config.visible'() {
      if (this.config.visible) {
        this.getMemberDetail({ id: this.config.id });
      }
    },
  },
  mounted() {
  },
  methods: {
    async getMemberDetail(param) {
      this.loading = true;
      const res = await memberDetail(param);
      if (res.success) {
        console.log(res);
        this.detailInfo = res.value.data;
      }
      this.loading = false;
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.main-info{
    width:560px;
    height:170px;
    background:rgba(250,250,250,1);
    position: relative;
    padding-top: 12px;
    padding-left: 12px;
    margin-bottom: 20px;
    .top-box{
        display: flex;
        .head-pic{
            width: 60px;
            height: 60px;
            img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        .top-info{
            margin-left: 12px;
            margin-top: 10px;
            .info-name{
                font-size:14px;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-bottom: 16px;
            }
            .info-tel{
                font-size:14px;
                font-weight:400;
                color:rgba(102,102,102,1);
            }
        }
    }
    .middle-box{
        margin-top: 28px;
        .member-card{
            display: inline-block;
            font-size:16px;
            font-weight:500;
            color:rgba(51,51,51,1);
            margin-right: 12px;
        }
        .card-time{
            display: inline-block;
            font-size:14px;
            font-weight:400;
            color:rgba(102,102,102,1);
        }
    }
    .bottom-box{
        margin-top: 20px;
        .score{
            display: inline-block;
            font-size:14px;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-right: 40px;
        }
        .usedScore{
            display: inline-block;
            font-size:14px;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
    }
}
.face-pic,.real-name,.idCard,.address{
    display: flex;
}
.left-info{
    font-size:14px;
    color:rgba(102,102,102,1);
    line-height: 40px;
}
.right-info{
    img{
        width: 40px;
        height: 40px;
    }
    span{
        color:rgba(51,51,51,1);
        line-height: 40px;
    }
    .address-info{
        display: block;
    }
}
.defaultAddress::after{
    content: '默认地址';
    width:56px;
    height:20px;
    background:rgba(127,177,39,1);
    color: #fff;
    padding:4px;
    font-size:12px;
    margin-left: 16px;
    cursor: pointer;
}
</style>

<style lang="less">
.details-box{
    .v-dialog__body{
        padding-top: 20px
    }
}
</style>

