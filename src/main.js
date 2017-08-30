import jquery from 'jquery'
import jspdf from 'jspdf'
let echarts = require('echarts')
require('echarts-liquidfill')
let ecStat = require('echarts-stat')
console.log(ecStat)
const dom = document.querySelector('#stat')
const color = [
  {
    start: '#F9E8A0',
    end: '#F2CB2D'
  },
  {
    start: '#9EC3E8',
    end: '#508CCA'
  },
  {
    start: '#A8D49D',
    end: '#72BE72'
  },
  {
    start: '#F9C991',
    end: '#F08C65'
  }
]
let  useAgeData = [
  [5,6],
  [7,6],
  [6,8],
  [10,67]
]
var clusterNumber = 4;
var result = ecStat.clustering.hierarchicalKMeans(useAgeData, clusterNumber, false);
var centroids = result.centroids;
var ptsInCluster = result.pointsInCluster;
var series = [];
for (var i = 0; i < centroids.length; i++) {
  series.push({
    name: 'cluster' + i,
    type: 'scatter',
    data: ptsInCluster[i],
    symbolSize:12,
    itemStyle: {
      normal: {
        opacity: 0.8,
        color:{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: color[i].start // 0% 处的颜色
          }, {
            offset: 1, color: color[i].end // 100% 处的颜色
          }],
          globalCoord: true // 缺省为 false
        }
      }
    }
  });
}
const useAgeEchart = echarts.init(dom)
useAgeEchart.setOption({
  title: {
    show: true,
    text: '*设备数量为0或使用年限缺失科室不计入统计',
    left: 'center',
    bottom: '3%',
    textStyle: {
      color: '#666',
      fontWeight: 400,
      fontSize:12
    }
  },
  legend: {
    data: []
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    top:'12%',
    left: '9%',
    right: '9%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show:false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show:false
    },
    axisTick: {
      show: false
    }
  },
  series: series
});