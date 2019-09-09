<template>
  <div class="data-chart-sumary">
    <div
      v-loading="loading"
      class="chart-warp"
    >
      <h3 class="chart-tit">
        近一月商品兑换订单量统计
      </h3>
      <span
        v-if="option.xAxis[0].data.length !== 0"
        class="danwei"
      >单位:笔</span>
      <div class="chart-sumary">
        <tableEmpty
          v-if="option.xAxis[0].data.length === 0"
          class="mar-top30"
          :is-table="false"
        />
        <div
          v-else
          id="chart-sumary"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { dataOrderCount } from '@/services/dataView';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      chart: null,
      option: {
        color: ['#0580F2'],
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
            axisLabel: {
              show: true,
              textStyle: {
                color: '#999',
                fontSize: '12',
              },
            },
          },
        ],
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
              fontSize: '12',
            },
          },
        },
        series: [
          {
            name: '订单数量',
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
      const res = await dataOrderCount();
      this.option.xAxis[0].data = this.handleResData(res.value.data || []).xArr;
      // this.option.xAxis[0].data = []
      this.option.series[0].data = this.handleResData(res.value.data || []).yArr;
      this.chart = window.echarts.init(document.getElementById('chart-sumary'));
      this.chart.setOption(this.option);
      this.loading = false;
    },
    handleResData(data) {
      const xArr = []; const yArr = [];
      data.map((value, index) => {
        xArr.push(value.date.substring(5));
        yArr.push(value.orderCnt);
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
.data-chart-sumary{
  // width:100%;
  background: #fff;
  // box-sizing: border-box;
  // padding:12px 0px 12px 20px;
  border-radius:4px;
  border:1px solid #ccc;
  margin-top:20px;
  .chart-warp{
    position: relative;
    .chart-tit{
      position:absolute;
      left:20px;
      top:16px;
      font-size: 14px;
      color:#333;
    }
    .danwei{
      position: absolute;
      right:32px;
      top:35px;
      font-size: 12px;
      color:#999;
    }
    .chart-sumary{
      position: relative;
      height:324px;
      #chart-sumary{
        height:100%;
      }
      .mar-top30{
        // margin-top:30px;
        padding-top:120px;
      }
    }
  }
}
</style>
