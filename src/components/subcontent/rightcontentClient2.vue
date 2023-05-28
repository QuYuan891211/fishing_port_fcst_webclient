<template>
<div class="sub-content-client2-info">
    <div class=title>到报情况</div>
    <div style="display:flex;position:relative">
            <div style="width:40%;margin-left:20px;">
                <div class="pie-chart" id="pieChartClient" style="width: 262px;height:200px;"></div>
            </div>
            <div>
                <div class="barnum-chart" id="barNumChartClient" style="width: 240px;height:200px;"></div>
            </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'subContent4',
    data() {
        return {
        }
    },
    methods: {
        // 取得男女比例饼状图数据
        getPieChart() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(document.getElementById('pieChartClient'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    show: false
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
                            { value: 90, name: '正常' },
                            { value: 4, name: '异常' },
                            { value: 6, name: '离线' },
                        ],
                    },
                ],
                color: [
                    '#21b2c3',
                    'red',
                    'gray',
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
            var myChart = echarts.init(document.getElementById('barNumChartClient'));
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
                    data: ['异常: 2', '离线: 8', '正常: 50'],
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
                        data: [2, 8, 50],
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
        this.getPieChart();
        this.getBarNumChart();
    },
}
</script>

<style>
.sub-content-client2-info{
    width: 100%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}


.sub-content-client2-info .title {
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

</style>