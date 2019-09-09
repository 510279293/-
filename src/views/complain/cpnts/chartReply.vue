<template>
  <div class="chart-reply">
    <h3 class="chart-tit">
      客诉回复统计
    </h3>
    <div
      v-loading="loading"
      class="chart-warp"
    >
      <div id="chart-reply" />
    </div>
  </div>
</template>
<script>
import { compReplyCount } from '@/services/complain';

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      chart: null,
      option: {
        color: ['#0580F2', '#FAA732'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 40,
          top: 100,
          bottom: 20,
          itemWidth: 5, // 标志图形的长度
          itemHeight: 5, // 标志图形的宽度
          data: [{ name: '已回复', icon: 'circle' }, { name: '未回复', icon: 'circle' }],
        },
        series: [
          {
            name: '客诉回复统计',
            type: 'pie',
            radius: ['60%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 0, name: '已回复' },
              { value: 0, name: '未回复' },
            ],
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
      const res = await compReplyCount({});
      const { isReplyCount, notReplyCount } = res.value.data;
      this.option.series[0].data = [{ value: isReplyCount, name: '已回复' }, { value: notReplyCount, name: '未回复' }];
      this.chart = window.echarts.init(document.getElementById('chart-reply'));
      this.chart.setOption(this.option);
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.chart-reply{
  // width:100%;
  background: #fff;
  box-sizing: border-box;
  padding:16px 20px 12px 20px;
  .chart-tit{
    font-size: 14px;
    color:#333;
    border-bottom: 1px solid #DCDEE3;
    padding-bottom: 12px;
  }
  .chart-warp{
    position: relative;
    #chart-reply{
      height:230px;
    }
  }
}
</style>
