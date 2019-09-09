<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="order"
    >
      <div class="filter-box">
        <p class="filter-item mar-r30">
          <span class="item-name">订单编号</span>
          <v-input
            v-model="paramData.orderNum"
            class="item-input wid260"
            placeholder="请输入内容"
          />
        </p>
        <p class="filter-item mar-r30">
          <span class="item-name">下单人手机号</span>
          <v-input
            v-model="paramData.phone"
            class="item-input wid260"
            placeholder="请输入内容"
          />
        </p>
        <p class="filter-item mar-r20 mar-t20">
          <span class="item-name">下单时间</span>
          <v-date-picker
            v-model="orderDate"
            class="wid300"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="orderDateChange"
          />
        </p>
        <p class="filter-item mar-r20 mar-t20">
          <v-button
            type="primary"
            @click="handleCurrentChange(1)"
          >
            搜索
          </v-button>
          <v-button
            type=""
            @click="handleReset"
          >
            重置
          </v-button>
        </p>
      </div>
      <div>
        <v-tabs
          v-model="paramData.status"
          class="mar-t20"
          @tab-click="handleClick"
        >
          <v-tab-pane
            label="全部"
            name="0"
          />
          <v-tab-pane
            label="待发货"
            name="1"
          />
          <v-tab-pane
            label="已发货"
            name="2"
          />
          <v-tab-pane
            label="已完成"
            name="3"
          />
        </v-tabs>
        <v-table
          v-loading="loading"
          class="xf-table"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            v-for="(item,idx) in tabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'orderTime'">
                {{ scope.row[item.prop] | dateTime }}
              </div>
              <div
                v-else-if="item.prop === 'status'"
                :class="[scope.row[item.prop] === '待发货' ? 'color-origin' : '']"
              >
                {{ scope.row[item.prop] || '-' }}
              </div>
              <div v-else-if="item.prop === 'sendWay'">
                {{ sendWayMap[scope.row[item.prop]] || '-' }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] || '-' }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                v-if="hasAuthor('order:detail')"
                class="color-blue"
                @click="handleOperate('detail',scope.row)"
              >详情</span>
              <span
                v-if="hasAuthor('order:send') && scope.row.status === '待发货'"
                class="color-blue"
                @click="handleOperate('send',scope.row)"
              >发货</span>
            <!-- <span
              class="color-blue"
              @click="handleOperate('logistics',scope.row)"
            >物流信息</span> -->
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
      <sendDia :config="sendDiaConfig" />
      <logisticsInfoDia :config="logisticsInfoDiaConfig" />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import sendDia from './cpnts/sendDia';
import logisticsInfoDia from './cpnts/logisticsInfoDia';
import { orderList } from '@/services/order';
import { getIntervalDate } from '@/utils/index';

export default {
  components: {
    sendDia,
    logisticsInfoDia,
  },
  data() {
    return {
      sendWayMap: ['自主配送', '快递配送'],
      tabColumn: tab.column0,
      loading: false,
      tableData: [],
      orderDate: [],
      paramData: {
        orderNum: '',
        phone: '',
        startTime: '',
        endTime: '',
        status: '0',
      },
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      sendDiaConfig: {
        visible: false,
      },
      logisticsInfoDiaConfig: {
        visible: false,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.backParamData = JSON.parse(JSON.stringify(this.paramData));
    this.$route.query.status ?
      (this.paramData.status = this.$route.query.status,
      this.paramData.startTime = this.paramData.endTime = getIntervalDate(0),
      this.orderDate = [getIntervalDate(0), getIntervalDate(0)]
      )
      : null;
    this.handleSearch();
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getList(param) {
      this.loading = true;
      const res = await orderList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    orderDateChange(val) {
      this.paramData.startTime = val ? val[0] : '';
      this.paramData.endTime = val ? val[1] : '';
    },
    handleClick(tab, event) {
      this.handleSearch();
    },
    handleSearch() {
      this.getList(Object.assign(this.paramData, this.pages));
    },
    handleReset() {
      this.orderDate = '';
      this.paramData = JSON.parse(JSON.stringify(this.backParamData));
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.handleSearch();
    },
    handleCurrentChange(val) {
      console.log(val);
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.handleSearch();
    },
    handleOperate(str, row) {
      console.log(row);
      if (str === 'send') {
        Object.assign(this.sendDiaConfig, {
          visible: true,
          orderNo: row.orderNo,
        });
      }
      if (str === 'logistics') {
        Object.assign(this.logisticsInfoDiaConfig, {
          visible: true,
        });
      }
      if (str === 'detail') {
        this.$router.push({ path: '/order/detail', query: {
          orderNo: row.orderNo,
        } });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order{
  box-sizing: border-box;
  padding:20px;
  .wid260{
    width:260px;
  }
  .mar-t20{
    margin-top:20px;
  }
  .color-origin{
    color:#F5A623;
  }
}
</style>
