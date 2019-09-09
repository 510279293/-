<template>
  <div
    v-loading="loading"
    class="complain-detail"
  >
    <v-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <v-breadcrumb-item :to="{ path: '/complain/list' }">
        投诉汇总
      </v-breadcrumb-item>
      <v-breadcrumb-item>投诉详情</v-breadcrumb-item>
    </v-breadcrumb>
    <h3 class="tit">
      投诉详情
    </h3>
    <div class="mar-l8">
      <p><span class="span-left">投诉编号:</span> <span class="span-right">{{ detailObj.proposalNo || '-' }}</span></p>
      <p><span class="span-left">投诉时间:</span> <span class="span-right">{{ detailObj.createTime || '-' }}</span></p>
      <p><span class="span-left">投诉人:</span> <span class="span-right">{{ detailObj.name || '-' }}</span></p>
      <p><span class="span-left">投诉人联系方式:</span> <span class="span-right">{{ detailObj.contact || '-' }}</span></p>
      <div class="line" />
      <p><span class="span-left">所投诉门店:</span> <span class="span-right">{{ detailObj.storeName || '-' }}</span></p>
      <p><span class="span-left">投诉类型:</span> <span class="span-right">{{ detailObj.categoryName || '-' }}</span></p>
      <p><span class="span-left minW70">投诉内容:</span> <span class="span-right">{{ detailObj.content || '-' }}</span></p>
      <p>
        <span class="span-left">图片举证:</span>
        <span class="span-right">
          <img
            v-for="(item,idx) in detailObj.picUrls"
            :key="idx"
            :src="item"
            @click="showPreviewImg(item)"
          >
        </span>
      </p>
      <div class="line" />
      <p>
        <span class="span-left">回复情况:</span>
        <span class="span-right">{{ detailObj.isReply ? '已回复' : '未回复' }}</span>
      </p>
      <div
        v-if="detailObj.replyContent"
        class="reply-item"
      >
        <span class="span-left minW70">回复内容:</span>
        <div class="span-right">
          <div>
            <img
              v-for="(item,idx) in detailObj.replyUrls"
              :key="idx"
              :src="item"
              @click="showPreviewImg(item)"
            >
          </div>
          <div>{{ detailObj.replyContent || '-' }}</div>
        </div>
      </div>
      <p>
        <span class="span-left">公示情况:</span>
        <span class="span-right">{{ detailObj.isPublic ? '已公示' : '未公示' }}
          <span class="colorCC">（投诉内容不面向全部顾客）</span>
        </span>
      </p>
    </div>
    <div>
      <v-button
        v-if="!detailObj.isReply"
        type="primary"
        @click="showReplyDia"
      >
        回复
      </v-button>
      <v-button
        type=""
        @click="handleOperate('send')"
      >
        {{ detailObj.isPublic ? '取消公示' : '公示' }}
      </v-button>
    </div>
    <previewImg :config="previewImgConfig" />
    <replyDia :config="replyDiaConfig" />
    <Dialog
      :config="dialogConfig"
      @close="closeDialog"
    />
  </div>
</template>
<script>
import previewImg from './cpnts/previewImg';
import replyDia from './cpnts/replyDia';
import { compDetail, compStatusUpdate, compCategoryList } from '@/services/complain';

export default {
  components: {
    previewImg,
    replyDia,
  },
  data() {
    return {
      loading: false,
      proposalId: '',
      previewImgConfig: {
        visible: false,
        url: '',
      },
      detailObj: {},
      replyDiaConfig: {
        visible: false,
        options: [],
      },
      dialogConfig: {
        visible: false,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.proposalId = this.$route.query.proposalId;
    this.compCategoryListApi();
    this.compDetailApi({ proposalId: this.proposalId });
  },
  methods: {
    handleSearch() {
      this.compDetailApi({ proposalId: this.proposalId });
    },
    async compDetailApi(param={}) {
      this.loading = true;
      const res = await compDetail(param);
      if (res.success) {
        this.detailObj = res.value.data;
      }
      this.loading = false;
    },
    async compStatusUpdateApi(param={}) {
      const res = await compStatusUpdate(param);
      if (res.success) {
        this.$message.success(`${param.status ? '' : '取消'}公示成功!`);
        this.closeDialog();
        this.compDetailApi({ proposalId: this.proposalId });
      } else {
        this.$message.error(`${param.status ? '' : '取消'}公示失败!`);
      }
    },
    async compCategoryListApi(param={}) {
      const res = await compCategoryList(param);
      if (res.success) {
        this.replyDiaConfig.options = res.value.data;
      }
    },
    showPreviewImg(url) {
      this.previewImgConfig.visible = true;
      this.previewImgConfig.url = url;
    },
    showReplyDia() {
      Object.assign(this.replyDiaConfig, {
        visible: true,
        proposalId: this.proposalId,
      });
    },
    handleOperate(str, row = this.detailObj) {
      if (str === 'send') {
        this.isPublicParam = { proposalId: row.id, status: row.isPublic ? 0 : 1 };
        Object.assign(this.dialogConfig, {
          visible: true,
          title: `${row.isPublic ? '取消' : ''}公示`,
          content: `${row.isPublic ? '取消公示后，投诉内容不会对全部顾客可见。确定取消公示吗？' :
            '公示后，投诉内容将对全部顾客可见。确定公示吗？'}`,
          callBack: () => {
            return this.compStatusUpdateApi(this.isPublicParam);
          },
        });
      }
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.complain-detail{
  box-sizing: border-box;
  padding:20px;
  position: relative;
  margin-top:16px;
  .breadcrumb{
    position: absolute;
    top: -24px;
    left: 0px;
    font-size: 12px;
  }
  .tit{
    font-size: 16px;
    margin-bottom: 20px;
  }
  .minW70{
    // min-width: 70px;
  }
  .colorCC{
    color:#ccc;
  }
  .mar-l8{
    margin-left:8px;
    p,.reply-item{
      display: flex;
      margin-bottom: 20px;
      .span-left{
        display: inline-block;
        font-size: 14px;
        color:#666;
        margin-right:8px;
        word-break: keep-all;
      }
      .span-right{
        font-size: 14px;
        color:#333;
        img{
          width:100px;
          height:100px;
          margin-right:20px;
          cursor: pointer;
        }
      }
    }
  }
  .line{
    border-top:1px solid #F2F2F2;
    margin-bottom: 20px;
  }
}
</style>
