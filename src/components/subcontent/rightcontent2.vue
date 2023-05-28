<template>
<div class="sub-content-info">
    <div class=title>用户统计</div>

    <div class="d-flex">
            <div class="pie-chart1" id="pieChart1" style="width: 300px;height:206px;margin-left:-2%"></div>
            <div class="marjor-rate" style="margin-left:-8%;margin-top:-4%;padding-left:3%;padding-top:2%;">
                <div class="job-subtitle">统计</div>
                <div>
                    <span class="job-icon"><img src="@/assets/triangle.png" alt=""></span>
                    <span class="job-text">用户数量:</span>
                    <span class="job-num">5</span>
                </div>
                <div>
                    <span class="job-icon"><img src="@/assets/triangle.png" alt=""></span>
                    <span class="job-text">设备数量:</span>
                    <span class="job-num">245</span>
                </div>
                <div style="margin-top:30%">
                    <span class="circle circle-color1"></span>
                    <span style="font-size:14px;color:#ffffff;margin-left:10%">用户1</span>
                </div>
                <div style="margin-top:5%">
                    <span class="circle circle-color2"></span>
                    <span style="font-size:14px;color:#ffffff;margin-left:10%">用户2</span>
                </div>
                <div style="margin-top:5%">
                    <span class="circle circle-color3"></span>
                    <span style="font-size:14px;color:#ffffff;margin-left:10%">用户3</span>
                </div>
                <div style="margin-top:5%">
                    <span class="circle circle-color4"></span>
                    <span style="font-size:14px;color:#ffffff;margin-left:10%">用户4</span>
                </div>
                
            </div>
        </div>
</div>
</template>

<script>
import {baseurl}  from '../../assets/js/config_data'
export default {
    name: 'subContent6',
    data() {
        return {
        }
    },
    methods: {
        // 取得学生专业饼状图数据
        getPieChart1() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(document.getElementById('pieChart1'));
            // 指定图表的配置项和数据
            var option = {
                color: ['#74adc5', '#204454', '#3d7891', '#468ca7'],
                series: [
                    {
                        name: '用户专业分布',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        label: {
                            color: '#FFFFFF'
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#FFFFFF'
                            },
                            smooth: 0,
                            length: 10,
                            length2: 10
                        },
                        data: [
                            { value: 100, name: '用户1' },
                            { value: 70, name: '用户2' },
                            { value: 60, name: '用户3' },
                            { value: 5, name: '用户4' },
                            
                        ]
                    }],
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
        }
    },
    mounted() {
        this.getPieChart1();
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

.d-flex {
    display: flex;
}

.sub-content-info .marjor-rate {
    width: 120px;
    height: 75px;
    background: url(../../assets/job-bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
}

.sub-content-info .job-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    color: #b3f7f4;
}

.sub-content-info .job-icon img {
    width: 7px;
    height: 7px;
}

.sub-content-info .job-text {
    font-size: 12px;
    color: #b3f7f4;
    padding: 0 6px;
}

.sub-content-info .job-num {
    font-size: 12px;
    color: #ffffff;
}

.sub-content-info .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.sub-content-info .circle-color1 {
    background: #74adc5;
}

.sub-content-info .circle-color2 {
    background: #468ca7;
}

.sub-content-info .circle-color3 {
    background: #3d7891;
}

.sub-content-info .circle-color4 {
    background: #204454;
}

.pie-chart {
    left: -10%;
}

</style>