<template>
    <div class = "left-tool-bar">
        <div v-for="(item, index) in menus" :key="index" @click="selectMenu(index)">
                <div class="menus-item" >
                <div class="map-button">{{ item.title }}</div>
                </div>
        </div>
        
        <!-- <div class="map-button" id="panto" @click="moveToChinaSea()"></button> -->
    </div>
    <div class="wrapper">
        <div class="map" id="olMap"></div>
    </div>

</template>
<script>
import { tsThisType } from '@babel/types';
// import { ol } from 'dist/static/libs/ol5/ol';
import bus from '../../utils'
import {layer_point_index,select_source,baseurl,GaodeMap_img_wms,TiandiMap_img,TiandiMap_cia,TiandiMap_vec,TiandiMap_cva,GaodeMap_img_wms_old} from '../../assets/js/config_data'
import {mousePositionControl} from '../../assets/js/map_control_tool'
import port from '../../assets/js/port'
// import MousePosition from "ol/control/MousePosition";
// import { format } from "ol/coordinate";

export default {
    data() {
        return {
             // 菜单栏数据
             menus: [
                { title: '地图复位' },
                { title: '港口显隐'}

            ],
            url_load_config : 'http://' + baseurl + ':8085/config/all',
            map: null,

            point_icon_style_path:'./static/images/label/icon32.png',
            point_selected_icon_style_path:'./static/images/label/icon32_selected.png',
            point_port_style_path:'./static/images/label/port_icon32_blue.png',
            point_port_data_path:'/static/data/portjson/port_v2.json',

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
            buoyList: []
            // selected_name : null
        };
    },
    mounted() {
        // this.initBuoyData();
        this.initMap();
        this.initMarker();
        this.initMarker_port()

    },
    methods: {
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
                        anchor: [0.5, 30],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,10],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 1,
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
                    font: 'normal 14px 微软雅黑',
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
            
            this.initFeature(vectorSource)

            //矢量标注图层
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                name:'观测点位矢量图层'
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


        initFeature(vectorSource){
            axios(
                {method: 'get',//提交方法
            url: this.url_load_config,//提交地址
            params: {}}).then((res) => {
                if(100 == res.data.commonResultCode.code){
                    this.buoyList = res.data.observeConfigList
                    // alert(this.buoyList[0].name)
                    // alert(this.buoyList[0].lat)

                // vectorSource.clear
                for (var i = 0; i < this.buoyList.length; i++) {
                    var user = this.buoyList[i];
                    var loc = [user.lon, user.lat]
                    
                    var point = ol.proj.fromLonLat(loc);
                    //实例化Vector要素,通过矢量图层添加到地图容器中
                    var iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(point),
                        //名称属性
                        name: user.name,

            //  
                });
                iconFeature.setStyle(this.createLabelStyle(iconFeature,false));
                vectorSource.addFeature(iconFeature);
            }
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
             for (var i = 0; i < this.buoyList.length; i++) {
                var user = this.buoyList[i];
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
                    center: ol.proj.transform([130, 27], 'EPSG:4326', 'EPSG:3857'),
                    //地图初始显示级别
                    zoom: 5,
                    minZoom:4,
                    maxZoom:11


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
            var wh = ol.proj.fromLonLat([130,27])
            view.setCenter(wh)
            view.setZoom(5)
            
            }
    },
};
</script>

<style scoped>
.map {
    width: 100%;
    height: 100vh;
}

/* TODO:不起作用 */
.ol-zoom .ol-zoom-in {
    display:none;
}
.left-tool-bar {
    display: flex;
    position: absolute;
    justify-content: flex-start;
    flex-direction:row;
    /* left:0; */
    top: 100px;
    z-index: 5;
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