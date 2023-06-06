<template>
    <div class = "left-tool-bar">
        <div v-for="(item, index) in menus" :key="index" @click="selectMenu(index)">
                <div class="menus-item" >
                <div class="map-button">{{ item.title }}</div>
                </div>
        </div>

    </div>
    <div class="wrapper">
        <div class="map" id="olMap">

        </div>



    </div>

    <!-- 叠置层 -->
    <div id="overlay-block">   
         <!-- <div v-for="item in fishing_port_list" :id="gernerateId(item.id)" title="Marker" class="marker">
            测试测试测试测试
    </div> -->
    </div>





    <div class = "bottom-tool-bar">
        <div class="slider-demo-block">
            
            <span class="demonstration">发布时间：{{ release_time }}</span>
            <span class="demonstration">预报时间：{{ fcst_time_show }}</span>
    <el-slider v-model="time_line"  :step="24" show-stops  :min=min_interval :max=interval :marks="marks" :disabled = "time_line_disabled" :show-tooltip="false" :format-tooltip="formatTooltip"/>
  </div>
    </div>

</template>
<script>
// import { tsThisType } from '@babel/types';
// import { ol } from 'dist/static/libs/ol5/ol';
import bus from '../../utils'

import {layer_point_index,select_source,baseurl,interval,min_interval,time_line_marks,intervalMax} from '../../assets/js/config_data'
import {mousePositionControl} from '../../assets/js/map_control_tool'
import port from '../../assets/js/port'
import common from '../../assets/js/common'
import node from '../../assets/js/node_tool'
// import { ol } from 'public/static/libs/ol5/ol';
// import MousePosition from "ol/control/MousePosition";
// import { format } from "ol/coordinate";

export default {
    data() {
        return {
             // 菜单栏数据
             menus: [
                { title: '地图复位' },
                // { title: '港口显隐'}

            ],
            url_load_config : 'http://' + baseurl + ':8085/config/all',
            //请求地址
            url_last_data:'http://' + baseurl + ':8085/fcst/getData',
            map: null,
            data_arr_5:null,
            interval: interval,
            intervalMax:intervalMax,
            min_interval:min_interval,
            selected_ele : '有效波高',//有效波高
            selected_ele_show : '浪高',//有效波高
            unit:'m',
            selected_time:0,
            marks:time_line_marks,
            time_line:0,
            default_time : 5,
            data_arr_5:[],
            option_ele:[],
            time_arr_5:[],
            // temp_time_line_val:0,
            release_time:null,
            // fcst_time_show_pre:null,
            time_line_disabled: false,
            tooltipText:null,
            // time_arr_5:null,
            all_ele_data_5: null,
            all_ybg_statics_data_5: [],
            point_icon_style_path:'./static/images/label/icon32_overlay.png',
            point_selected_icon_style_path:'./static/images/label/icon32_overlay_selected.png',
            point_port_style_path:'./static/images/label/port_icon32_blue.png',
            point_port_data_path:'/static/data/portjson/port_v2.json',
            fcst_time_show:null,
            parser: null,
            select_id:null,
            //map中的图层数组
            layer: new Array(),
            //图层名称数组
            layerName: new Array(),
            //图层可见属性数组
            layerVisibility: new Array(),

            //选中变换的样式
           
            //列表,在加载时导入[]
            fishing_port_list: []
            // selected_name : null
        };
    },
    created(){
        this.getData();
    },
    mounted() {
        // this.initBuoyData();

        // this.initTools();
        this.initMap();
        this.initMarker();
        this.initMarker_port();
        // this.initTool();
        

    },
    methods: {
        //动态生成叠置层id

        // initTools(){
        //     this.tooltipText = getformatTooltip
        // },
        formatTooltip(val){
            console.log(this.time_line)
            this.release_time = this.time_arr_5[0] + '时'

            if(null == this.time_arr_5[val]){
                this.fcst_time_show = "此时段无预报产品"
                return this.fcst_time_show
            }else{
                this.fcst_time_show = this.time_arr_5[val-24] + '时' + ' —— ' + this.time_arr_5[val]+ '时' 
                this.reloadOverlay()
                return this.time_arr_5[val]
            }
            
        },
        //和overlay联动
        reloadOverlay(){

            this.map.getOverlays().clear();

            this.initOverlay()

            
        },

        initOverlay(){
            if(this.fishing_port_list.length <1 || this.all_ybg_statics_data_5.length < 1){
                common.message_error_data
                return 
            }
            node.addNode(this.fishing_port_list, this.all_ybg_statics_data_5, this.time_line, this.selected_ele_show,this.unit)
            for (var i = 0; i < this.fishing_port_list.length; i++) {
                        var user = this.fishing_port_list[i];
                        var loc = [user.lon, user.lat]
                         
                        var point = ol.proj.fromLonLat(loc);
                        
                        
                        let element_classname = node.gernerateId(this.fishing_port_list[i].id)
                        // div.id = element_id
                        // console.log(element_id)
                    //创建叠置层（overlay）要素
                        let ele = document.getElementsByClassName(element_classname)[0]
                        // console.log('ele')
                        // console.log(ele)
                        // let ele = document.getElementById('test')
                        let overlay = new ol.Overlay(
                            {
                                id: user.name,
                                element: ele, //绑定html中的元素
                                // offset: [0, -25],

                                //当不设置浪高且图例为100*50时
                                offset: [-35, -35],

                                
                                // offset: [0, 0], //像素偏移量
                                position: point,
                                // positioning: "center-center",
                                
                                className:'overlay',
                                // 是否要阻止事件冒泡到地图视口(map viewport)。
                                // 如果设置为ture，那么叠置层被放在装载控件的那个div容器中（该div容器css类名为ol-overlaycontainer-stopevent）
                                // 如果设置为false，那么叠置层被放在css类名为ol-overlaycontainer的div容器下，由className属性（默认为'ol-overlay-container ol-selectable'）指定类名的div容器中
                                stopEvent: false
                                // positioning: 'center-center',
                            }
                        )
                        //添加到地图
                        this.map.addOverlay(overlay)
                        // console.log(overlay)
            }
        },
        getData(){
            // const interval = [24,48,72,96,120]

            axios(
                {
            method: 'get',//提交方法
            url: this.url_last_data,//提交地址
            params: {//提交参数
                
                days:this.default_time,
                intervalMax:intervalMax
                // name:this.selected_name
                // timestamp:t
            }}).then((res) => {
                // console.log('30天' + res.data.fcstDataList[0].site)
                // this.initLineChart()
                if("100" == res.data.commonResultCode.code){
                    this.all_ele_data_5 = res.data.fcstDataList
                    this.all_ybg_statics_data_5 = res.data.homeQueryResultList
                    //如果数据给的不全，就不显示数据
                    if(0 == this.all_ele_data_5.length && 0 == all_ybg_statics_data_5.length){
                        common.notification_error("预报产品加载错误，请联系系统管理员")
                        // alert(this.all_ele_data_5.length)
                        this.time_line_disabled = true
                        return
                        }
                    //放入总线
                    // bus.emit("all_ele_data_5", this.all_ele_data_5);
                    bus.emit("all_ybg_statics_data_5", this.all_ybg_statics_data_5);
                    var temp_arr= []
                    for(var i=0;i<this.all_ele_data_5.length;i++){
                        this.data_arr_5.push(common.getSigleEleValue(this.selected_ele, this.all_ele_data_5[i]))
                        // temp_arr.push(this.all_ele_data_5[i].queryTime)
                        temp_arr.push(this.all_ele_data_5[i].queryTime.substring(5,13))
                    }
                    //给time_arr_5去重
                    this.time_arr_5 = temp_arr.filter(function(item,index){
                            return temp_arr.indexOf(item) === index;  // 因为indexOf 只能查找到第一个  
                        });

                    // alert(this.time_arr_5.length)
                } else if ("400" == res.data.commonResultCode.code) {
                    common.notification_error(res.data.commonResultCode.message);
                    this.all_ele_data_5 = []
                    this.all_ybg_statics_data_5=[]
      
                }
                else if ("500" == res.data.commonResultCode.code) {
                    common.notification_warning(res.data.commonResultCode.message)
                    this.all_ele_data_5 = []
                    this.all_ybg_statics_data_5=[]
                }
                else if ("600" == res.data.commonResultCode.code) {
                    common.notification_warning(res.data.commonResultCode.message)
                    this.all_ele_data_5 = []
                    this.all_ybg_statics_data_5=[]

                }

            })
        },
        //港口点位显隐按钮
        portLayerVisibilityControl(){
            port.setInvisibility(this.map)
        },
        //加载港口图标
        initMarker_port(){
            this.map = port.initMarker_port(this.map, this.point_port_data_path, this.point_port_style_path)
        },
        
        /**
            * 创建矢量标注样式函数,设置image为图标ol.style.Icon
            * @param {ol.Feature} feature 要素
            */
        createLabelStyle(feature, is_selected) {
            return new ol.style.Style({
                image: new ol.style.Icon(
                    /** @type {olx.style.IconOptions} */
                    ({
                        anchor: [0.5, 29],
                        //当不设置浪高且图例为100*50时
                        // anchor: [0.5, 29],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,0],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 0.2,
                        //图标的url
                        src: is_selected?this.point_selected_icon_style_path:this.point_icon_style_path
                        // 
                    })),
                text: new ol.style.Text({
                    //位置
                    textAlign: 'center',
                    //基准线
                    textBaseline: 'middle',
                    //文字样式
                    font: 'normal 18px 微软雅黑',
                    //文本内容
                    text: feature.get('name'),
                    //文本填充样式（即文字颜色）
                    fill: new ol.style.Fill({ color: 'white' }),
                    offsetY: 12,
                    scale: 1,
                    stroke: new ol.style.Stroke({ color: '#white', width: 2 })
                })
            });
        },
        /**
            * 添加一个新的标注（矢量要素）
            * @param {ol.Coordinate} coordinate 坐标点
            */
        addVectorLabel(coordinate) {
            //新建一个要素 ol.Feature
            var newFeature = new ol.Feature({
                //几何信息
                geometry: new ol.geom.Point(coordinate),
                //名称属性
                name: '新标注'
            });
            //设置要素的样式
            newFeature.setStyle(this.createLabelStyle(newFeature,false));
            //将新要素添加到数据源中
            this.vectorSource.addFeature(newFeature);
        },
        
        initMarker() {
            
            var shanghai = ol.proj.fromLonLat([121.29, 31.14]);

            //矢量标注的数据源
            var vectorSource = new ol.source.Vector({
                features: []
            });

            //因为要考虑到叠置层，这里传入map
            this.initFeature(vectorSource, this.map)

            //测试
            // console.log(this.map.getOverlays())

            //矢量标注图层
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                name:'点位矢量图层'
            });
            this.map.addLayer(vectorLayer);
            
            // this.initMarker_port();
            /**
        * 为map添加点击事件监听,渲染弹出popup
        */
            var vm=this;
            this.map.on('click', function (evt) {
                
                // vm.map.removeLayer (vm.vectorLayer)
                // var vs = vm.vectorSource.forEachFeatues()
                // var features = vm.vectorSource.getFeatures()
                
                //     for(var i=0; i< features.length;i++){
                //         features[i].setStyle(vm.createLabelStyle(feature,false));
                //     }
                //判断当前单击处是否有要素,捕获到要素时弹出popup
                var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
                if (feature) {
                    //关键一步，通过ID判断是否可被选中
                    if(0 != feature.getProperties().id){
                            // console.log(feature)
                        var layers_collection =  vm.map.getLayers()
                        var layers_arrays = layers_collection.getArray()
                        // console.log('获取layers长度'+layers_arrays.length


                        var target_layer = layers_arrays[layer_point_index]
                      

                        // console.log(target_layer)
                        // console.log('获取layers长度'+layers_arrays.length)
                        var source = target_layer.getSource()
                        var features = source.getFeatures()
                        // vm.initFeature()
                        for(var i=0; i< features.length;i++){
                            features[i].setStyle(vm.createLabelStyle(features[i],false));
                        }
                        // var targetLayer = layers.get


                        // var sources = layers[2].getSource
                        // console.log('获取sources长度'+sources.length)
                        //var coor=features[0].getGeometry().getCoordinates();
                        //var property=features[0].getProperties();
                        //var type=features[0].getGeometry().getType();
                        // console.log(feature.getStyle.getImage)
                        var name = feature.getProperties().name
                        // vm.selected_name = name
                        //向公共组件传选择的名称
                        // vm.sendSelectedNameToFa(name)
                        bus.emit('select_feature', name );
                        // bus.emit('select_feature_7', name );
                        // bus.emit('select_feature_30', name );
                        vm.updateSelectClientInfo(name)
                        // vm.initMarker()
                        feature.setStyle(vm.createLabelStyle(feature,true));
                    }
                    
                } else {
                    
                    //  vm.initMarker()
                     bus.emit('changeActive', {'active':0, 'name':''} );
                }
            });

            /**
        * 为map添加鼠标移动事件监听,当指向标注时改变鼠标光标状态
        */
            this.map.on('pointermove', function (e) {
                var pixel = this.getEventPixel(e.originalEvent);
                var hit = this.hasFeatureAtPixel(pixel);
                this.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        },
        // before_select(){
        //     var selectClick = new ol.interaction.Select({
        //     // 事件类型
        //     condition: ol.events.condition.click,
        //     // 点击后的样式
        //     style: createLabelStyle(feature, false)
        // })
        // },
        
        
        // recoveryFeatures(vectorSource){
        //     this.vectorSource.clear()
        //     this.initFeature(vectorSource)
        // },
        sendSelectedNameToFa(name){

            this.$emit("getSelectedNameByCh",name)

        },


        initFeature(vectorSource, map){
            axios(
                {
                    method: 'get',//提交方法
                    url: this.url_load_config,//提交地址
                    params: {}}).then((res) => {
                    if(100 == res.data.commonResultCode.code){
                        this.fishing_port_list = res.data.fishingPortConfigList
                    // alert(this.fishing_port_list[0].name)
                    // alert(this.fishing_port_list[0].lat)

                // vectorSource.clear
                    for (var i = 0; i < this.fishing_port_list.length; i++) {
                        var user = this.fishing_port_list[i];
                        var loc = [user.lon, user.lat]
                         
                        var point = ol.proj.fromLonLat(loc);

                    //实例化Vector要素,通过矢量图层添加到地图容器中
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(point),
                            //名称属性
                            name: user.name,
                        });
                        iconFeature.setStyle(this.createLabelStyle(iconFeature,false));
                        vectorSource.addFeature(iconFeature);
                        
   
                        // console.log(iconFeature)
                    }
                    this.initOverlay();
        }else{
                    alert(res.data.commonResultCode.message)
                }
                // console.log(res。commonResultCode);
                // alert(res.data.observeConfigList)
            })
        },
       
        //更新指定用户的数据
        updateSelectClientInfo(name){
            // console.log('选中'+name)
             for (var i = 0; i < this.fishing_port_list.length; i++) {
                var user = this.fishing_port_list[i];
                if(user.name == name){
                    bus.emit('changeActive', {'active':1, 'name':name} );
                    break
                }
             }

        },
        initMap() {


            //实例化Map对象加载地图
            this.map = new ol.Map({
                //地图容器div的ID
                target: 'olMap',

                //地图容器中加载的图层:加载影像图(生产环境)
                layers: select_source,


                //地图容器中加载的图层:加载影像图(开发环境)
                // layers: [TiandiMap_img, TiandiMap_cia],


                //地图容器中加载的图层:加载矢量图层(开发环境)
                // layers: [TiandiMap_vec, TiandiMap_cva],
                //地图视图设置
                view: new ol.View({
                    //地图初始中心点
                    center: ol.proj.transform([130, 30], 'EPSG:4326', 'EPSG:3857'),
                    //地图初始显示级别
                    zoom: 5,
                    minZoom:4,
                    maxZoom:9


                }),


            });



            // //鹰眼控件
            // var overviewMapControl = new ol.control.OverviewMap({
            //     layers: [
            //         new new ol.layer.Tile({
            //         source: new ol.source.XYZ({
            //         url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
            //         wrapX: false
            //     })
            //         })
            //     ]
            // });

           
            //比例尺控件
            this.map.addControl(new ol.control.ScaleLine());
             //鼠标坐标控件
        //     var mousePositionControl = new ol.control.MousePosition({
        //     //坐标格式
        //     coordinateFormat: function (coordinate) {
        //         return ol.coordinate.format(coordinate, "经度:{x} &nbsp; 纬度:{y}", 2);
        //     },
        //     //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
        //     projection: "EPSG:4326",
        //     //坐标信息显示样式类名,默认是'ol-mouse-position'
        //     className: "custom-mouse-position",
        //     //显示鼠标位置信息的目标容器
        //     target: document.getElementById("mouse-position"),
        //     //未定义坐标的标记
        //     undefinedHTML: "&nbsp;",
        // });
            this.map.addControl(mousePositionControl);
            var view = this.map.getView()
            var zoom = view.getZoom()
            var center = view.getCenter()
            var rotation = view .getRotation()

            


        },
        /**
         * 地图工具菜单方法集
         * @param {*} index 
         */
        selectMenu(index){
            switch (index){
            case 0:
                this.moveToChinaSea()  // 当表达式的结果等于 0 时,则执行该代码
                break;
            case 1:
                port.setInvisibility(this.map)

            default :
            // this.moveToChinaSea()  // 如果没有与表达式相同的值,则执行该代码
}
        },
        moveToChinaSea(){
            //单击平移按钮
            var view = this.map.getView()
            var wh = ol.proj.fromLonLat([130,30])
            view.setCenter(wh)
            view.setZoom(5)
            
            }
    },
};
</script>

<style>
/* 时间滑块 */
.bottom-tool-bar .slider-demo-block {
  display: flex;
  /* align-items: center; */
  /* justify-content: flex-start; */
      align-items: flex-start;
  width: 50%;
  flex-direction: column
}
.bottom-tool-bar .slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
/* 时间轴标注样式 */
.el-slider__marks-text {
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
  margin-top: 0;
  /* top: -50%; */
  top:150%;
  color: #fff;
  font-size: 120%;
  /* font-weight: 200; */
}

.el-slider__stop {
    /* width: 150%; */
    background-color: #fff;
    border: solid 2px #21b2c3;
    transform: translateX(-50%) translateY(-25%);
      }
.el-slider__tooltip {
    text-align: left;
    font-size: larger;
    background-color: #fff;
  }
  .el-slider__tooltip-wrapper {
      height: 32px;
      transform: translateX(-50%);
      top: -50%;
    }
.bottom-tool-bar .slider-demo-block .demonstration {
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
  font-size: 20px;
  font-weight: bold;
  /* font:'normal 18px 微软雅黑' ; */
  color: white;
  line-height: 44px;
  /* flex: 1; */
  /* margin-left: -50%; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  margin-bottom: 0%;
  /* margin-bottom: 0; */
  /* margin-right: 0%; */
}

.bottom-tool-bar .slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.bottom-tool-bar {
    display: flex;
    position: absolute;
    /* justify-content: flex-start; */
    /* align-items: flex-start; */
    flex-direction:row;
    /* left:0; */
    top:80%;
    left:5%;
    width: 70%;
    
    z-index: 2;
    /* pointer-events: none; */
}
.map {
    width: 100%;
    height: 100vh;

}
/* .map.ol-viewport.maker{
    width: 200px;
    height: 40px;
    line-height: 40px;
    background: burlywood;
    color: yellow;
    text-align: center;
    font-size: 20px;
} */

/* TODO:不起作用 */
.ol-zoom .ol-zoom-in {
    display:none;
}

/* 覆盖层样式 */
.overlay {
    width: 100px;
    height: 50px;
    
    line-height: 50px;
    /* background: url(@/assets/overlay-1-test.png); */
    
    /* background-color: #a3b4c8; */
    /* color: #F9F7F0; */
    text-align: center;
    font-size: 20px;
    border-radius: 10px;
    /* position: relative; */
}
.card-header{
    width: 100%;
    /* background: url(@/assets/no-select.png); */
    background-size: 100%;
    /* background-color:#cdcdcd; */
    height: 100%;
    line-height:100%;
    /* 只把上半部分进行修改边框 */
    /* border-radius: 10px 10px 10px 10px; */
    /* font-size: 10px; */
    /* background: url(); */
    display: flex;
    justify-content: center;
    /* align-items:center; */
    /* text-align: right; */
    font-size: 18px;
    font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
    color: #ffff;
    font-weight:bold;
    /* text-align:center; */
    /* position: absolute; */
    /* bottom: px; */
}
/* .card-body{

    border-radius: 0px 0px 10px 10px;

    display: flex;
    justify-content: center;
    align-items:flex-start;
    line-height: 30px;

    font-size: 16px;
    font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
    background: #F9F7F0;
    color: #072A40;
    font-weight:bold;

} */

/* .ol-overlay {
            position: absolute;
            background-color: #eeeeee;
            -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #cccccc;
            bottom: 12px;
            left: -50px;
            min-width: 280px;
        } */
.left-tool-bar {
    display: flex;
    position: absolute;
    justify-content: flex-start;
    flex-direction:row;
    /* left:0; */
    top: 100px;
    z-index: 2;
    left:1%;
    width: 100%;
    /* pointer-events: none; */
}
.left-tool-bar .menus-item {


    width: 144px;
    height: 49px;
    font-size: 18px;
    line-height: 55px;
    margin-left: 20px;
    margin-bottom: 49px;
    cursor: pointer;
}
.left-tool-bar .map-button {
    background: url(@/assets/no-select.png);
    background-size: 100%;
    color: white;
}
.TooLib{
  float:left;
  position:absolute;
  bottom: 10px;
  z-index:2000;
}
.ButtonLib{
        width: 200px; 
        margin-left: 2px;
        opacity: 0.8; 
        padding:8px;  
        background-color: #428bca;  
        border-color: #357ebd;  
        color: #fff;  
        -moz-border-radius: 10px;  
        -webkit-border-radius: 10px;  
        border-radius: 10px; /* future proofing */  
        -khtml-border-radius: 10px; /* for old Konqueror browsers */  
        text-align: center;  
        vertical-align: middle;  
        border: 1px solid transparent;  
        font-weight: 900;  
        font-size:125%  
}

</style>