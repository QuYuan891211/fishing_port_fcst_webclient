<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-info-overview">
        <!-- TODO:标题和时间放到同一行 -->
        <div class="title">最新数据</div>
        <!-- <div class="time">2022年11月18日08时</div> -->
        <div>
            <div ref="Echarts6" id="barChart" style="width: 100%;height:210px;"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'subContent6',
    data() {
        return {
            data_wave:null
        }
    },
    methods: {
        //取得就业率柱状图数据
        getBarChart() {
            //获取数值
            this.data_wave = [0.7, 0.4, 0.8, 1.7, 1.9, 1.1, 0, 1.6];
            let arr = [0.7, 0.4, 0.8, 1.7, 1.9, 1.1, 0, 1.6];
            let max = arr.sort().reverse()[0];

            // console.log('getBarChart');
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(this.$refs.Echarts6);

            var option;
            option = {
                //backgroundColor: 'rgba(1,202,217,.2)',
                grid: {
                    left: 60,
                    right: 20,
                    top: 45,
                    bottom: 40
                },
                /**
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    top: 10,
                    textStyle: {
                        fontSize: 10,
                        color: 'rgba(255,255,255,.7)'
                    },
                    data: ['实有人口', '实有房屋', '实有单位']
                },*/
                xAxis: [
                    {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)'
                            }
                        },
                        axisLabel: {
                            color: "rgba(255,255,255,.7)"
                        },

                        data: ['渤海', '黄海北部', '黄海南部', '东海北部', '东海南部', '南海北部', '南海中部', '南海南部'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {   show:true,
                        position:'left', 
                        offset:0, 
                        type: 'value',
                        name: '米',
                        min: 0,
                        // max: Math.max(this.data_wave),
                        max:max,
                        interval: max/5,
                        axisLine: {
                            show:true,
                            // symbol:['none', 'arrow'],   //---是否显示轴线箭头
                            // symbolSize:[3, 3] ,         //---箭头大小
                            // symbolOffset:[0,3],         //---箭头位置
                            lineStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },
                        splitLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },

                        axisLabel: {


                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '有效波高',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#00f0ff' },
                                        { offset: 1, color: '#032a72' }
                                    ]
                                )
                            }
                        },
                        data: this.data_wave
                    }
                ],
                tooltip: {
          // 提示框组件
          }
            };

            myChart.clear()
            myChart.setOption(option)
        },
    },
    mounted() {
        this.getBarChart();
    },
}
</script>
<style>
.sub-content-info-overview{
    width: 100%;
    margin-left: 1%;
    /* margin-right: 1%; */
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size: 100% 100%;
}
.sub-content-info {
    width: 100%;
    margin-left: 1%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size: 100% 100%;
}
.sub-content-info-overview .time{
    margin-top: 0%;
    padding-left: 30px;
    color: white;
}


.sub-content-info-overview .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 1px;
    color: #b1eded;
    margin-top: 2px;
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

.sub-content-info-overview .job-data,
.sub-content-info-overview .marjor-rate {
    width: 120px;
    height: 75px;
    background: url(../../assets/job-bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
}

.sub-content-info-overview .job-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    color: #b3f7f4;
}

.sub-content-info-overview .job-icon img {
    width: 7px;
    height: 7px;
}

.sub-content-info-overview .job-text {
    font-size: 12px;
    color: #b3f7f4;
    padding: 0 6px;
}

.sub-content-info-overview .job-num {
    font-size: 12px;
    color: #ffffff;
}

.sub-content-info-overview .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.sub-content-info-overview .static img {
    width: 14px;
    height: 14px;
}
</style>