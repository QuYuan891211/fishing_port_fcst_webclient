<template>
<div class="sub-content-info">
    <div class=title>数据到报与要素统计</div>
    <div style="display:flex;position:relative">
            <div style="width:40%;margin-left:2%">
                <div ref="Echarts1" class="pie-chart" id="pieChart" style="width: 262px;height:180px;"></div>
            </div>
            <div  style="width:0%;margin-left:15%">
                <!-- <div class="barnum-chart" id="barNumChart" style="width: 100px;height:164px;"></div> -->
                <div class="static-list">
        
        <div class="static-bg-ele">
          <div class="name">海浪要素</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">9 <span
              style="color: #5cb2fa;font-size:14px;">种</span> </div>
        </div>
        <div class="static-bg-ele">
          <div class="name">气象要素</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">6 <span
              style="color: #5cb2fa;font-size:14px;">种</span> </div>
        </div>
        <div class="static-bg-ele">
          <div class="name">海温要素</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">2 <span
              style="color: #5cb2fa;font-size:14px;">种</span> </div>
        </div>
        
      </div>
            </div>
    </div>
</div>
</template>

<script>
import {baseurl}  from '../../assets/js/config_data'
export default {
    name: 'subContent4',
    data() {
        return {
            url_data_statist:'http://' + baseurl + ':8085/fcst/statistics',
            success_num:null
        }
    },
    methods: {
        getStatistics(){

                //发送请求，获取选中浮标的最近30天数据
                        axios(
                {
                method: 'get',//提交方法
                url: this.url_data_statist,//提交地址
                params: {//提交参数

                }}).then((res) => {
                // console.log('30天' + res.data.fcstDataList[0].site)
                // this.initLineChart()
                if(100 == res.data.commonResultCode.code){
                this.success_num = res.data.num
                this.getPieChart();
                // bus.emit('lastAll', this.last_all_data);
                }else {
                    common.notification_error(res.data.commonResultCode.message);
                    }

                })
                },
        // 取得男女比例饼状图数据
        getPieChart() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(this.$refs.Echarts1);
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    show: false
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        startAngle: 65, //起始角度
                        avoidLabelOverlap: false,
                        force: {
                            layoutAnimation: true
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                color: '#ffffff',
                                fontSize: '16',
                                fontWeight: 'bold'
                            },
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: this.success_num, name: '正常' },
                            { value: 29-this.success_num, name: '缺报' },
                        ],
                    },
                ],
                color: [
                    '#21b2c3',
                    '#F53240',
                ],
                animation: true,
                animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
                addDataAnimation: true,         // 动态数据接口是否开启动画效果
                animationDuration: 2500,
                animationEasing: 'cubicInOut'
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 默认高亮
            let index = 0; // 高亮索引
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: index,
                dataIndex: index
            });
            myChart.on("mouseover", function (e) {
                if (e.dataIndex != index) {
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: index
                    });
                }
            });
            myChart.on("mouseout", function (e) {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                });
            });
            myChart.setOption(option)
        },
        // 取得人数比例柱状图
        getBarNumChart() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(document.getElementById('barNumChart'));
            // 指定图表的配置项和数据
            var option = {
                
                grid: {
                    top: '30',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitLine: { show: false },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }, axisLabel: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['缺报: 8', '未到: 10', '正常: 11'],
                    splitLine: { show: false },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    offset: 10,
                    axisLabel: {
                        textStyle: {
                            color: '#FFFFFF',
                            align: 'left'
                        },
                        height: 40,
                        margin: -10,
                        rich: {}
                    }
                },
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: [10, 8, 11],
                        barWidth: 10,
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                offset: [-35, -12],
                                textStyle: {
                                    color: '#FFFFFF',
                                    fontSize: 12,
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 2,
                                color: '#4ea49b',
                                label: {
                                    formatter: ''
                                }
                            }
                        }
                    }],
                animation: true,
                animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
                addDataAnimation: true,         // 动态数据接口是否开启动画效果
                animationDuration: 3000,
                animationEasing: 'cubicInOut'
                
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.clear()
            myChart.setOption(option)
        }
    },
    mounted() {
        this.getStatistics()
        // this.getBarNumChart();
    },
}
</script>

<style>
.sub-content-info{
    width: 49%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}


.sub-content-info .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 1px;
    color: #b1eded;
    margin-top: 8px;
    background: url(../../assets/rightcotent1_title_bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 221px;
    height: 60px;
    padding-left: 30px;
}

/* 分割线 */
.divider {
    height: 1px;
    background-color: #528693;
    width: 100%;
}

.pie-chart {
    left: -10%;
}
.sub-content-info .static-bg-ele {
  margin-top: 10px;
  background: url(../../assets/static-bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 130px;
  height: 50px;
}

.static-bg-ele .name {
  color: #b1eded;
  font-size: 14px;
  text-align: center;
}
</style>