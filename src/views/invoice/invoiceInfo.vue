<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="invoice-info"
    >
      <div class="filter-box">
        <p class="filter-item mar-r30">
          <span class="item-name">发票编号</span>
          <v-input
            v-model="paramData.billNo"
            class="wid225"
            placeholder="请输入内容"
          />
        </p>
        <p class="filter-item mar-r20">
          <span class="item-name">开票时间</span>
          <v-date-picker
            v-model="billDate"
            value-format="yyyy-MM-dd"
            class="wid300"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="billDateChange"
          />
        </p>
        <p>
          <v-button
            type="primary"
            @click="handleSearch"
          >
            搜索
          </v-button>
          <v-button
            type=""
            @click="resetParam"
          >
            重置
          </v-button>
        </p>
      </div>
      <div class="tab-div">
        <v-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            prop="billNo"
            label="发票编号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.billNo || '-' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="bookerName"
            label="开票人"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.bookerName || '-' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="bookerTel"
            label="开票人手机号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.bookerTel || '-' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="billTitle"
            label="开票抬头"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.billTitle || '-' }} </div>
            </template>
          </v-table-column>
          <v-table-column
            prop="taxId"
            label="税号"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.taxId || '-' }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="billAmount"
            label="开票金额"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.billAmount | numberToPrice }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="taxAmount"
            label="税额"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.taxAmount | numberToPrice }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="createTime"
            label="开票时间"
            :min-width="120"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.createTime | dateTime }}</div>
            </template>
          </v-table-column>
          <v-table-column
            prop="name"
            label="操作"
          >
            <template slot-scope="scope">
              <span
                class="color-blue"
                @click="toDetail(scope.row)"
              >开票详情</span>
            </template>
          </v-table-column>
        </v-table>
        <pagination
          :current-page.sync="pages.pageNum"
          :page-size="pages.pageSize"
          :total="pages.totalCount"
          @size-change="handleSizeChange"
          @page-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { billList } from '@/services/invoice';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      paramData: {
        billNo: '',
        startTime: '',
        endTime: '',
      },
      billDate: '',
      tableData: [
        {},
      ],
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.backParamData = JSON.parse(JSON.stringify(this.paramData));
    this.handleSearch();
  },
  methods: {
    async getBillList(param) {
      this.loading = true;
      const res = await billList(param);
      console.log(res);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    toDetail(row) {
      this.$router.push({ path: '/invoice/detail', query: { billNo: row.billNo } });
    },
    billDateChange(val) {
      console.log(val);
      Object.assign(this.paramData, {
        startTime: val ? val[0] : '',
        endTime: val ? val[1] : '',
      });
    },
    handleSearch() {
      this.getBillList(Object.assign(this.paramData, this.pages));
    },
    resetParam() {
      this.paramData = JSON.parse(JSON.stringify(this.backParamData));
      this.billDate = '';
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
 .invoice-info{
   box-sizing: border-box;
   padding:20px;
   .wid225{
     width:225px;
   }
   .wid300{
     width:300px;
   }
   .filter-box{
     display: flex;
     .mar-r30{
        margin-right:30px;
        }
        .mar-r20{
          margin-right:20px;
        }
     .filter-item{
       .item-name{
         color:#333;
         font-size: 14px;
         margin-right:10px;
       }
     }
   }
   .tab-div{
     margin-top:12px;
   }
 }
</style>
