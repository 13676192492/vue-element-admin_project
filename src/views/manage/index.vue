<template>
  <div class="app-container">
    <ul class="top">
      <li>
        <p class="tips">本月营收（元）</p>
        <p class="number">{{ topData.income | num }}</p>
      </li>
      <li>
        <p class="tips">本月支付笔数</p>
        <p class="number">{{ topData.incomeCount | num }}</p>
      </li>
      <li>
        <p class="tips">本月消费额（元)</p>
        <p class="number">{{ topData.expense | num }}</p>
      </li>
      <li>
        <p class="tips">本月订单笔数</p>
        <p class="number">{{ topData.expenseCount | num }}</p>
      </li>
    </ul>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
/** esLint-disable */
import echarts from "echarts";
import { getEchartsData, getTopData } from "@/api/manage/index";
// console.log(echarts);
export default {
  name: "Manage",
  data() {
    return {
      chart: null,
      topData: {
        income: 0,
        incomeCount: 0,
        expense: 0,
        expenseCount: 0
      }
    };
  },
  filters: {
    num(val) {
      return val.toLocaleString();
    }
  },
  mounted() {
    this.initCharts();
    this.getTopData();
  },
  methods: {
    getTopData() {
      getTopData().then(res => {
        if (res.data.success) {
          this.topData = res.data.data;
        }
      });
    },
    initCharts() {
      this.chart = echarts.init(this.$refs.chart);
      getEchartsData().then(res => {
        if (res.data.success) {
          this.setOptions(res.data.data);
        }
      });
    },
    setOptions(data) {
      this.chart.setOption({
        // title: {
        //     text: '某地区蒸发量和降水量',
        //     subtext: '纯属虚构'
        // },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["营收", "消费"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "营收",
            type: "bar",
            data: data.income,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "消费",
            type: "bar",
            data: data.expense,
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 500px;
}

.top {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:5%;

  li {
    margin: 0 2%;
    width: 22%;
    height: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    p {
      margin: 0;
      padding: 2% 4%;
    }

    .tips {
      font-size: 13px;
      color: #808080;
    }

    .number {
      font-size: 30px;
    }
  }
}
</style>
