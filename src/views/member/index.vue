<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="member-box"
    >
      <!-- <v-button type="primary" icon="v-icon-search" class="btn-search" size="small" /> -->
      <v-button
        type="primary"
        icon="v-icon-search"
        class="btn-search"
        size="small"
        @click="handleCurrentChange(1)"
      />
      <v-input
        v-model="paramData.keyWord"
        placeholder="请输入会员昵称/手机号"
        class="search-member"
      />
      <v-table
        v-loading="loading"
        class="xf-table"
        :data="tableData"
        style="width: 100%"
      >
        <tableEmpty slot="empty" />
        <v-table-column
          prop="nickName"
          label="会员昵称"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.nickName || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="realName"
          label="姓名"
        />
        <v-table-column label="头像">
          <template slot-scope="scope">
            <img
              v-if="scope.row.avatarUrl"
              :src="scope.row.avatarUrl"
              width="40"
              height="40"
              class="head_pic"
            >
            <span v-else>-</span>
          </template>
        </v-table-column>
        <v-table-column
          label="手机号"
          min-width="100"
          prop="phone"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.phone || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="cardNumber"
          min-width="120"
          label="会员卡号"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.cardNumber || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="integral"
          label="剩余积分"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.integral || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="useIntegral"
          label="已使用积分"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.useIntegral || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="createTime"
          label="注册时间"
          min-width="120"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.createTime | dateTime }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          label="操作"
          min-width="150"
        >
          <template slot-scope="scope">
            <span
              v-if="hasAuthor('member:detail')"
              class="handle"
              @click="showDetailsDia('detail',scope.row)"
            >详情</span>
            <span
              v-if="hasAuthor('member:exlog')"
              class="handle"
              @click="showRecordDia('record',scope.row)"
            >兑换记录</span>
            <span
              v-if="hasAuthor('member:intlog')"
              class="handle"
              @click="showRecordDia('water',scope.row)"
            >积分流水</span>
          </template>
        </v-table-column>
      </v-table>
      <div class="block">
        <pagination
          :current-page.sync="pages.pageNum"
          :page-size="pages.pageSize"
          :total="pages.totalCount"
          @size-change="handleSizeChange"
          @page-change="handleCurrentChange"
        />
      </div>
      <recordWaterDia
        :config="rewaConfig"
        @close="closeRecordDia"
      />
      <memberDetails
        :config="detailsConfig"
        @close="closeDetails"
      />
    </div>
  </div>
</template>

<script>
import recordWaterDia from './cpnts/recordWaterDia';
import memberDetails from './cpnts/memberDetails';
import { memberList } from '@/services/member';

export default {
  components: {
    recordWaterDia,
    memberDetails,
  },
  data() {
    return {
      loading: false,
      rewaConfig: {
        visible: false,
      },
      tableData: [],
      paramData: {
        keyWord: '',
      },
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      detailsConfig: {
        visible: false,
      },
    };
  },
  mounted() {
    this.getMemberList(Object.assign(this.paramData, this.pages));
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getMemberList(param) {
      this.loading = true;
      const res = await memberList(param);
      if (res.success) {
        console.log(res);
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    handleSearch() {
      this.getMemberList(Object.assign(this.paramData, this.pages));
    },
    showRecordDia(str, row) {
      // this.rewaConfig.visible = true;
      const title = str === 'record' ? '兑换记录' : '积分流水';
      Object.assign(this.rewaConfig, {
        visible: true,
        title: title,
        id: row.id,
        cardNumber: row.cardNumber,
        nickName: row.nickName,
        phone: row.phone,
      });
    },
    closeRecordDia() {
      this.rewaConfig.visible = false;
    },
    showDetailsDia(str, row) {
      Object.assign(this.detailsConfig, { visible: true, id: row.id });
    },
    closeDetails() {
      this.detailsConfig.visible = false;
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.handleSearch();
    },
    handleCurrentChange(val) {
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.handleSearch();
    },
  },
};
</script>

<style lang="less" scoped>
.member-box {
  padding: 20px;
  background: #fff;
  height: 100%;
  .search-member {
    width: 227px;
    float: right;
    margin-bottom: 12px;
  }
  .btn-search {
    float: right;
    height: 36px;
    margin-left: 12px;
  }
  .handle {
    margin-right: 16px;
    color: #4a90e2;
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;
  }
  .block {
    margin-top: 12px;
    // float: right;
  }
  .head_pic {
    transform: translateX(-5px);
  }
}
</style>
<style lang="less">
</style>

