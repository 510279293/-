<template>
  <div class="chart-shop">
    <div class="filter-box">
      <v-radio-group
        v-model="radio"
        size="small"
        @change="radioChange"
      >
        <v-radio-button :label="0">
          今天
        </v-radio-button>
        <v-radio-button :label="-7">
          近7天
        </v-radio-button>
      </v-radio-group>
      <v-date-picker
        v-model="chartDate"
        class="wid246"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
      />
    </div>
    <div
      v-loading="loading"
      class="chart-warp"
    >
      <h3 class="chart-tit">
        投诉数量统计-投诉门店维度
      </h3>
      <tableEmpty
        v-if="option.xAxis[0].data.length === 0"
        class="hei230"
        :is-table="false"
      />
      <div
        v-show="option.xAxis[0].data.length !== 0"
        id="chart-shop"
      />
    </div>
  </div>
</template>
<script>
import { getIntervalDate } from '@/utils/index';
import { compCount } from '@/services/complain';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      radio: 0,
      chartDate: [],
      paramData: {
        type: 2,
        startTime: getIntervalDate(0),
        endTime: getIntervalDate(0),
      },
      chart: null,
      option: {
        color: ['#65DBFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: {
          type: 'value',
          minInterval: 1,
        },
        series: [
          {
            name: '投诉数量',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initChart();
  },
  methods: {
    async initChart() {
      this.loading = true;
      const res = await compCount(this.paramData);
      this.option.xAxis[0].data = this.handleResData(res.value.data).xArr;
      this.option.series[0].data = this.handleResData(res.value.data).yArr;
      this.chart = window.echarts.init(document.getElementById('chart-shop'));
      this.chart.setOption(this.option);
      this.loading = false;
    },
    radioChange(val) {
      this.paramData.startTime = getIntervalDate(val);
      this.paramData.endTime = getIntervalDate(0);
      this.initChart();
    },
    dateChange(val) {
      val ? this.paramData.startTime = val[0] : null;
      val ? this.paramData.endTime = val[1] : null;
      this.initChart();
    },
    handleResData(data) {
      const xArr = []; const yArr = [];
      data.map((value, index) => {
        xArr.push(value.name);
        yArr.push(value.count);
      });
      return {
        xArr,
        yArr,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.chart-shop{
  // width:100%;
  background: #fff;
  box-sizing: border-box;
  padding:12px 0px 12px 20px;
  .wid246{
    width:246px;
    margin: 0 20px;
  }
  .wid200{
    width:200px;
  }
  .hei230{
    height:230px;
    padding-top:86px;
  }
  .chart-warp{
    position: relative;
    .chart-tit{
      position:absolute;
      top:16px;
      font-size: 14px;
      color:#333;
    }
    #chart-shop{
      height:230px;
    }
  }
}
</style>
