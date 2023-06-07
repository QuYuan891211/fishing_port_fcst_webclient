<template>
    <div class="sub-content-info-overview">
        <!-- TODO:标题和时间放到同一行 -->
        <div class="title">预警报信息</div>
        <div class="last-data-bar">
            <div class="demo-collapse">

	<div>
		<el-collapse v-model="activeNames" accordion>
			<el-collapse-item v-for="(item, index) in collapse_list" :key="index" :name="index">
				<template #title>
                    <div>
                        <img class="time-icon" src="@/assets/late.png" alt="">
                    </div>
					<span class="collapse-title flex" slot="title"
						>{{ item.name }}
					</span>
                
				</template>
				<template #right-icon>
					<el-icon><ele-CaretBottom /></el-icon>
				</template>
				<div> <el-table class="last-data-table"
            :data="item.site_list"
            :scrollbar-always-on="true"
            :highlight-current-row="true"
            :row-class-name="tableRowClassName"
            :header-cell-style="{
            background: '#003460',
            color: '#ffffff',
            fontWeight: '1500',
            fontSize: '16px',
      }"
      :cell-style="{
            background: '#003460',
            // color: '#ffffff'
            fontWeight: '600',
            fontSize: '20px',
            // background:'#178CA4',
            color:'#ffffff'
            
      }"

        >
        <!-- 此处强制列宽 -->
        <el-table-column width="100px" class="last-data-table-column"  align="center" type="index" label="序号" />
    <el-table-column  width="300px" class="last-data-table-column"  align="center" prop="site" label="名称" />
    <el-table-column width="320px" class="last-data-table-column"  align="center" prop="scope" label="有效波高（米）" />
    <el-table-column label="警报级别" width="230">
        <template #default="{ row }">
          <div style="display: flex; align-items: center;text-align: center;">
            <el-image class="warning_img" style="width: 104px; height: 42px" :src="require('../../assets/warning_icon/'+row.warning_level_img)" :fit="fit" />
          </div>
        </template>
      </el-table-column>
    <!-- <el-table-column class="last-data-table-column" align="center" prop="min" label="有效波高1" /> -->
    <!-- <el-table-column class="last-data-table-column" align="center" prop="max" label="有效波高2" /> -->
    
  </el-table></div>
			</el-collapse-item>
		</el-collapse>
	</div>

 
  </div>
        </div>
    </div>
</template>
<script>
import node from '../../assets/js/node_tool'
import bus from '../../utils'
import { ref } from 'vue'
// import { allGeneratedPositionsFor } from '_@jridgewell_trace-mapping@0.3.17@@jridgewell/trace-mapping'
import common from '../../assets/js/common'
import {baseurl}  from '../../assets/js/config_data'
// import { time } from 'console'
// import test from 'node:test'
export default {
    name: 'subContent6',
    // 监听的两个列表，注意在此组件内如果更新这两个列表，无法同步到map组件

    data() {
        return {
                all_ybg_statics_data_5:null,
                fishing_port_list:null,
                collapse_list : [
              {
                name: '24小时警报',
                time_level:24,
                id: 1,
                content: '无',
                site_list:[]
              },
              {
                name: '48小时警报',
                time_level:48,
                id: 2,
                content: '无',
                site_list:[]
              },
                {
                name: '72小时警报',
                time_level:72,
                id: 3,
                content: '无',
                site_list:[]
              },
                {
                name: '96小时警报',
                time_level:96,
                id: 4,
                content: '无',
                site_list:[]
              },
                {
                name: '120小时警报',
                time_level:120,
                id: 5,
                content: '无',
                site_list:[]
              },
            ],
            
            activeNames: [],
            url_last_data : 'http://'+ baseurl+':8085/fcst/filterlastAll',
            url_query_data: 'http://'+ baseurl+':8085/fcst/queryAll',
            data_wave:null,
            default_time:31,
            all_ele_data_5:[],
            // value1 : ref('')
            select_time : '',
            default_dateTimePicker_time:null
        }
    },
    methods: {
            //按照max的大小进行排序
            sort(){
              for(var i = 0; i< this.collapse_list.length;i++ ){
                  this.collapse_list[i].site_list.sort((a,b) => b.max - a.max);
              }
              
            },
            //站点信息的工程
            createSiteInfo(site,max,min,time,scope,warning_level_img){
            var obj = {
              // index:index,
              site: site,
              max: max,
              min:min,
              time:time,
              scope:scope,
              warning_level_img:warning_level_img,
              
              setIndex: function(index){
              this.index = index
              },
              setWarning_level_img: function(warning_level_img){
              this.warning_level_img = warning_level_img
              },
              setScope: function(scope){
              this.scope = scope
              },
              setSite: function(site){
              this.site = site
              },
              setMax: function(max){
              this.max = max
              },
              setMin: function(min){
              this.min = min
              },
              setTime: function(time){
                this.time = time
              }
            }
            return obj
          },
        visible_change(callback){
            if(callback){
                // alert('open')
                this.select_time = this.default_dateTimePicker_time
            }
        },
        handleDateChange(){
            this.getQueryAllData()
        },
        // select_time(){
        //     alert("select")
        // },

        tableRowClassName(val){
            if(val.row.max >= 2.5 && val.row.max < 3.5){
                return 'blue-level-bg'
            }else if(val.row.max >= 3.5 && val.row.max < 4.5){
                return 'yellow-level-bg'
            }else if(val.row.max >= 4.5 && val.row.max < 6){
                return 'orange-level-bg'
            }else if(val.row.max >= 6){
                return 'red-level-bg'
            }
            return 'normal-bg'
        },
        test(){
          console.log(this.collapse_list)
        }
    },
    created(){
        // var systemTime = new Date();

        // this.default_dateTimePicker_time = new Date(systemTime.getFullYear(),systemTime.getMonth()+1,systemTime.getDate,8,0,0)
        this.default_dateTimePicker_time = new Date()
        this.default_dateTimePicker_time.setHours(8)
        this.default_dateTimePicker_time.setMinutes(0)
        this.default_dateTimePicker_time.setSeconds(0)
        this.default_dateTimePicker_time.setMilliseconds(0)
        
    },
    mounted() {
      //监听从map组件传来的
        bus.on('all_ybg_statics_data_5', val =>{
          // alert('1')
          this.all_ybg_statics_data_5 = val
          //TO-DO 因为数据结构的问题，此处过于复杂，需要调整结构
          if(null != this.all_ybg_statics_data_5 && this.all_ybg_statics_data_5.length > 0){
              //加入设定的集合
              for(var i=0; i< this.collapse_list.length;i++){
                //得到各个时效
                var selected_time = this.collapse_list[i].time_level
                    //循环各个站点
                    
                    for(var j=0; j < this.all_ybg_statics_data_5.length; j++){
                      //得到单个站点的各个时效警报信息
                        var site = this.all_ybg_statics_data_5[j].site
                        var time_statis_list = this.all_ybg_statics_data_5[j].timeLevelResultList

                        for(var k = 0; k <  time_statis_list.length; k++){
                        
                            if(selected_time == time_statis_list[k].timeLevel){
                                var max = time_statis_list[k].max
                                var min = time_statis_list[k].min
                                var scope = min + ' — ' + max
                                var warning_level_img = node.warning_level_color_img(max)
                                // alert(max)
                                if(max >= 2.5){
                                  
                                  var site = this.createSiteInfo(site,max,min,selected_time,scope,warning_level_img)
                                  this.collapse_list[i].site_list.push(site)
                      
                                }
                          
                                break;
                            }
                        }
                
                }

              }
          }
          

          this.sort()
          
        })
        //暂时没有使用
        bus.on('fishing_port_list', val =>{

          this.fishing_port_list = val
        })

        this.test()
    },
    beforeDestroy () {
            //关闭监听
            bus.off('all_ybg_statics_data_5')
            bus.off('fishing_port_list')
    },
}
</script>
<style scoped>

/deep/ .el-collapse-item__header{
  font-size: 20px;
  color: #fff;
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
  /* background-color: #178CA4; */
  /* background-color: #072A40; */
  background: url(../../assets/header-bg.png);
}
/deep/ .el-collapse-item__wrap{
  font-size: 14px;
  height: 235px;
  line-height: 30px;
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
  /* background-color: #178CA4; */
  background-color: #003460;
  /* position: relative; */
}

/deep/ .el-collapse-item__content {
      padding: 0;
      color:black;
      font-size: 16px;
      font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
    }
/* 每个折叠栏标题前的图标 */
.time-icon{
  width: 60%;
  height: 60%;
  align-items: center;
  margin-top: 20%;
  margin-left: 10%;
}
.warning_img{
  align-items: center;
}
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
.last-data-table{
    width: 100%;
    height:250px;
    max-height: 250px;
    /* 表格字体颜色 */
    /* color:black; */

}
.last-data-bar{
    margin-left: 2%;
    margin-right: 2%;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .message-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.last-data-table >>> .blue-level-bg{
  background: #008F95;
}
.el-table >>> .yellow-level-bg{
  background: #F9BE02;
  /* background: #f89100; */
  /* background: #df433c; */
}
.el-table >>> .orange-level-bg{
  background: #F47000;
}
.el-table >>> .red-level-bg{
  background: #F53240;
}
.el-table >>> .normal-bg{
  background: #003460;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #003460 !important;
  /* color: #f19944;  */

}

.el-time-spinner__wrapper{

  width: 100% !important;

}

.el-scrollbar:nth-of-type(2){

  display: none;

}


/* .last-data-table-column-time{
    width: 10%;
    
}
.last-data-table-column{
    width: 5%;
    
} */
</style>