<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-client3-info">
        <div class=title>{{ this.title }}</div>
        <div class="search-bar">

<!-- <div>自定义查询</div> -->
    <div class="switch-bar-div">
        
    </div>



    <div class="search-bar-div">

    </div>
    <div class="save-bar-div">
    <!-- <el-button>测试</el-button> -->

    <el-button type="warning" @click="this.exportpic">
        <el-icon :size="25" color="white" style="vertical-align: middle; margin-right: 2%;">
            <Download />
        </el-icon>
    <span style="vertical-align: middle;"> 图表下载 </span>
    </el-button>
    <!-- <n-button>naive-ui</n-button> -->
    <!-- <a-button>Add</a-button> -->
    <!-- <nut-button class="search-button" :loading="isLoading" type="warning" @click="query">自定义时间查询</nut-button> -->
    <!-- <el-button type="primary">Primary</el-button> -->
    <!-- <v-md-date-range-picker></v-md-date-range-picker> -->
    </div>
    </div>
        <div class="attend" style="padding-left: 10px;">
            <div ref="EchartsClient4" class="line-chart" id="lineChartClient_7" style="width: 950px;height:180px;margin-left:2%"></div>
        </div>
    </div>
</template>
<script>
import bus from '../../utils'
import common from '../../assets/js/common'
import {baseurl}  from '../../assets/js/config_data'
export default {
    name: 'subContent6',
    data() {
        return {
            //请求地址
            // echarts_id : 'lineChartClient_7',
            url_last_single_data:'http://'+ baseurl + ':8085/fcst/lastSingle',
            //观测数据信息
            data_arr_7:[],
            time_arr_7:[],
            //第二要素
            option_ele:[],
            name_option_ele: null,
            unit:null,
            name_ele:null,
            default_time : 7,
            selected_name:null,
            all_ele_data_7:null,
            title:"未来72小时",
            // listen_list:[]
            // date_format_str: 'dd HH',
            selected_ele : '有效波高'//有效波高
            

        }
    },
    methods: {
        exportpic(){
                var echarts = require('echarts');
                let myChart = echarts.init(this.$refs.EchartsClient4);
                let picInfo=myChart.getDataURL({
                    type: 'png',
                    pixelRatio: 4,  //放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动端模糊问题
                    backgroundColor: '#12264f'
                });//获取到的是一串base64信息
 
                const elink = document.createElement('a');
                elink.download = this.selected_name + '_' + this.title + '_' + this.selected_ele;
                elink.style.display = 'none';
                elink.href = picInfo;
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink)
			},
        message_disable(){
            common.message_disable_function()
        },
        reloadChart(){
            this.name_option_ele = null;
            this.option_ele = [];
            //清空数组
            this.data_arr_7=[]
                        // alert(item.queryTime)
                    this.time_arr_7=[]
                    // alert('1天全要素' + res.data.fcstDataList[0].queryTime)
                    // alert('all_ele_data_7 长度' + this.all_ele_data_7.length)
                    // alert('all_ele_data_7 时间' + this.all_ele_data_7[0].queryTime) 
                    for(var i=0;i<this.all_ele_data_7.length;i++){
                        // common.text()
                       
                        // this.data_arr_7 = this.all_ele_data_7
                        this.data_arr_7.push(common.getSigleEleValue(this.selected_ele, this.all_ele_data_7[i]))
                        // alert(item.queryTime)
                        this.time_arr_7.push(this.all_ele_data_7[i].queryTime.substring(5,13))
                        // alert('时间' + item.queryTime)

                                        //假如最大波高曲线同时显示
                        if("有效波高"== this.selected_ele){
                            this.option_ele.push(common.getOptionalEleValue(this.selected_ele, this.all_ele_data_7[i]));
                            this.name_option_ele = "最大波高";
                        }
                    }
                    this.name_ele = this.selected_ele
                    // 重新加载图表
                    this.getLineChart();
                    // alert('time '+this.time_arr_7[0])
                    // alert(this.time_arr_7.length)
                    // alert('data ' + this.data_arr_7[0])
                    // alert(this.data_arr_7.length)
                    
                    // bus.emit('lastAll', this.last_all_data);
        },
        getLineChart() {
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(this.$refs.EchartsClient4);
            // 指定图表的配置项和数据
            var option = {
        //     toolbox: {
        //     show: true,
        //     right:'20px',
        //     top:'1px',
        //     itemSize:'30',
        //     iconStyle: {
        //         borderColor: '#fff',//图标颜色
        //         borderWidth: '5',
        //         emphasis: {
        //             color: '#000000',//鼠标滑过的颜色
        //        },
        //     },
        //     feature: {
        //     saveAsImage: {
        //         show:true,
        //         backgroundColor: '#ffffff',//保存图片的背景色
        //         excludeComponents :['toolbox'],
        //         pixelRatio: 2
        //     }
        //     }
        // },
                title: {
                    text: this.unit,
                    top: '0%',
                    left:'50%',
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
                    right: '3%',
                    bottom: '0%',
                    top:'18%',
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
                        data:this.time_arr_7
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine:{ show: true,  lineStyle:{opacity:0.5,type: 'dashed'}},
                        axisLabel: {
                            textStyle: {
                                color: '#FFFFFF',
                            },
                        },
                    }
                ],
                series: [
                    {
                        name: this.name_ele,
                        type: 'line',
                        // stack: '总量',
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
                        data: this.data_arr_7
                    },
                    {
                        name: this.name_option_ele,
                        type: "line",
                        // stack: "总量",
                        areaStyle: {
                            normal: {
                                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(223,67,60,0.5)"
                                    }, {
                                        offset: 0.34,
                                        color: "rgba(223,67,60,0.25)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(223,67,60,0.00)"
                                    }])
                            }
                        },
                        symbol: "none",
                        smooth: true,
                        emphasis: {
                            focus: "series"
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: "#df433c"
                                }
                            }
                        },
                        data: this.option_ele
                        // data:[3,2,4,1,3]
                    }
                ],
                animation: true,
                animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
                addDataAnimation: true,         // 动态数据接口是否开启动画效果
                animationDuration: 500,
                animationEasing: 'cubicInOut'
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.clear()
            myChart.setOption(option)
        }
    },
    mounted() {
         // console.log('子组件加载')
        //来自地图的鼠标点击Feature选中事件
        // bus.off('select_feature')
        bus.on('changeElement', val =>{

            this.selected_ele = val
            this.reloadChart()
        })
        bus.on('select_feature', val =>{
            // alert('client4')
            this.selected_name = val
            this.unit = val
            // var t = new Date().getTime();
            // alert('client3监听到选中 ' + this.selected_name)
             //发送请求，获取选中浮标的最近1天数据
             axios(
                {
            method: 'get',//提交方法
            url: this.url_last_single_data,//提交地址
            params: {//提交参数
                
                days:this.default_time,
                name:this.selected_name
                // timestamp:t
            }}).then((res) => {
                // console.log('30天' + res.data.fcstDataList[0].site)
                // this.initLineChart()
                if("100" == res.data.commonResultCode.code){
                    this.all_ele_data_7 = res.data.fcstDataList
                    this.reloadChart()
                }else if ("400" == res.data.commonResultCode.code) {
                    common.notification_error(res.data.commonResultCode.message);
                    this.all_ele_data_7 = []
                    this.reloadChart()
                }
                else if ("500" == res.data.commonResultCode.code) {
                    common.notification_warning(res.data.commonResultCode.message)
                    this.all_ele_data_7 = []
                    this.reloadChart()
                }
                else if ("600" == res.data.commonResultCode.code) {
                    common.notification_warning(res.data.commonResultCode.message)
                    this.all_ele_data_7 = []
                    this.reloadChart()
                }
            })
            // console.log(val)
            // this.selected_name = val
            // console.log('client3监听')
            // console.log('子组件Client3使用公共事务mitt获取的所选Feature: ' + val[0].site + '数据长度： ' + val.length)
            
        })
        this.data_arr_7 = []

        // console.log(this.data_arr_7)
        // console.log(this.data_arr)
        //TODO:动态获取单位
        // this.unit = ''
        // this.name_ele = '有效波高'
        // console.log(this.data_arr_7.length)
        // console.log(this.data_arr.length)
        this.getLineChart();
    },
        beforeDestroy () {
            bus.off('select_feature')
        },
}
</script>
<style>
.sub-content-client3-info{
    width: 100%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}


.sub-content-client3-info .title {
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
    height: 50px;
    padding-left: 30px;
}

/* 分割线 */
.divider {
    height: 1px;
    background-color: #528693;
    width: 100%;
}

.sub-content-client3-info .attend .attention-icon img {
    width: 27px;
    height: 27px;
}

.sub-content-client3-info .attend .attention-title {
    font-size: 14px;
    color: #b1eded;
    line-height: 28px;
    margin-left: 1%;
}

.sub-content-client3-info .attend .attention-num {
    font-size: 18px;
    color: #ffffff;
    margin: 0 5px;
}

.sub-content-client3-info .attend .attention-person {
    color: #ffffff;
}

.sub-content-client3-info .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px
}

.sub-content-client3-info .static img {
    width: 14px;
    height: 14px
}
.search-bar{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content:space-between;
    margin-left: 5%;

}
</style>