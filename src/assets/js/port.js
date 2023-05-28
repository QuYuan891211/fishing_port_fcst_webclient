export default { 
        //1. 加载港口数据
        // load_port_info(){
        //     axios.get('/static/data/portjson/port.json')
        //         .then((data) => {
        //           console.log(data)
        //           return data
        //         })
        // },

        //初始化港口点位
        initMarker_port(map,json_path, icon_path){
            var sum = 0
            //0. 声明矢量标注的数据源
            var vectorSource = new ol.source.Vector({
            features: []
            });
            // 1. 加载港口数据
            axios.get(json_path)
            .then((res) => 
            {   
                if(200== res.status){

                
                var portList = res.data
                // console.log(portList)
                // alert(portList.length)
            for (var i = 0; i < portList.length; i++) {
                sum += 1
                //2.获取点位名称与经纬度
                var name = portList[i].name;
                // alert(name)
                var loc = [Number(portList[i].lon), Number(portList[i].lat)]
                
                // 3. 创建一个点的对象，将经纬度赋值到point属性
                var point = ol.proj.fromLonLat(loc);

                //4. 创建一个矢量特征，将点、名称赋值到属性
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(point),
                    //名称属性
                    name: name,
                    id: 0
                });
                // console.log(iconFeature)
                iconFeature.setStyle(this.createLabelStyle_port(iconFeature,icon_path));
                vectorSource.addFeature(iconFeature);
            }
        }else{
            return
        }
    
        })
        
        //5. 创建矢量标注图层
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            name:'港口点位矢量图层',
            visible:false

        });
        
        map.addLayer(vectorLayer);
        // alert(sum)
        return map
    },

    createLabelStyle_port(feature,icon_path) {
        // alert('111')
        return new ol.style.Style({
            image: new ol.style.Icon(
                /** @type {olx.style.IconOptions} */
                ({
                    anchor: [0.5, 35],
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
                    src: icon_path
                    // 
                })),
            text: new ol.style.Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'middle',
                //文字样式
                font: 'normal 20px 微软雅黑',
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
    //港口图标显隐
    setInvisibility(map, isVisible){
        var layers = map.getLayers(); //获取地图中所有图层
        // console.log(layers)
        for (var i = 0; i < layers.getLength(); i++) {
            var layer_name = layers.item(i).get('name');
            if ( '港口点位矢量图层' == layer_name ){
                //判断图层当前状态是否可见
                if(layers.item(i).getVisible()){
                    layers.item(i).setVisible(false); //不显示图层
                }else{
                    layers.item(i).setVisible(true);//显示图层
                }
                break;
            }
        }
    },

    
}