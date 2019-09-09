<template>
  <div class="chart-time">
    <div
      v-loading="loading"
      class="chart-warp"
    >
      <h3 class="chart-tit">
        投诉数量统计-时间维度
      </h3>
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
      <tableEmpty
        v-if="option.xAxis.data.length === 0"
        class="hei230"
        :is-table="false"
      />
      <div
        v-show="option.xAxis.data.length !== 0"
        id="chart-time"
      />
    </div>
  </div>
</template>
<script>
import { compCount } from '@/services/complain';
import { getIntervalDate } from '@/utils/index';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      chartDate: [getIntervalDate(0), getIntervalDate(0)],
      paramData: {
        type: 3,
        startTime: getIntervalDate(0),
        endTime: getIntervalDate(0),
      },
      chart: null,
      option: {
        color: ['#E1575D'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['2019-7-18'],
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
        },
        series: [{
          name: '投诉数量',
          data: [0],
          type: 'line',
          smooth: true,
        }],
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
      this.option.xAxis.data = this.handleResData(res.value.data).xArr;
      this.option.series[0].data = this.handleResData(res.value.data).yArr;
      this.chart = window.echarts.init(document.getElementById('chart-time'));
      this.chart.setOption(this.option);
      this.loading = false;
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
.chart-time{
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
    padding-top:120px;
  }
  .chart-warp{
    position: relative;
    .chart-tit{
      position:absolute;
      top:16px;
      font-size: 14px;
      color:#333;
    }
    .wid246{
      position: absolute;
      right:0px;
      top:10px;
      z-index: 999;
    }
    #chart-time{
      height:260px;
    }
  }
}
</style>
