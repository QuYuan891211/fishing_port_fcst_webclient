<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-info">
        <div class=title>流量统计</div>
        <div class="attend">
            <div class="line-chart" id="lineChart" style="width: 100%;height:210px;margin-top:-3%"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'subContent5',
    data() {
        return {
        }
    },
    methods: {
        // 取的学生考勤率曲线图数据
        getLineChart() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(document.getElementById('lineChart'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '单位/GB',
                    top: '10%',
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            // interval:1,
                            textStyle: {
                                color: '#FFFFFF',
                            },
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: { show: false },
                        axisLabel: {
                            textStyle: {
                                color: '#FFFFFF',
                            },
                        },
                    }
                ],
                series: [
                    {
                        name: '出勤率',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(37,113,200,0.5)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(37,113,200,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(37,113,200,0.00)'
                                }])
                            }
                        },
                        symbol: 'none',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#67dfe8'
                                }
                            }
                        },
                        data: [80, 82, 83, 83, 85, 86, 89, 91, 92, 93, 95, 95]
                    },
                ],
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
        this.getLineChart();
    },
}
</script>
<style>
.sub-content-info{
    width: 49%;
    margin-left: 1%;
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

.attend .attention-icon img {
    width: 27px;
    height: 27px;
}

.attend .attention-title {
    font-size: 14px;
    color: #b1eded;
    line-height: 28px;
    margin-left: 1%;
}

.attend .attention-num {
    font-size: 18px;
    color: #ffffff;
    margin: 0 5px;
}

.attend .attention-person {
    color: #ffffff;
}

.sub-content-info .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px
}

.sub-content-info .static img {
    width: 14px;
    height: 14px
}
</style>