//上线需修改：IP
//dev
let baseurl = 'localhost'
let interval = 121
let min_interval = 24
let intervalMax = 120
//警报颜色配置
let red_warning_color = '#F53240'
let orange_warning_color = '#F47000'
let yellow_warning_color = '#F9BE02'
let blue_warning_color = '#008F95'
let no_warning_color = '#A5A5AF'
//redo警报颜色图片位置
let red_warning_color_path = 'red.png'
let orange_warning_color_path = 'orange.png'
let yellow_warning_color_path = 'yellow.png'
let blue_warning_color_path = 'blue.png'
let no_warning_color_path = 'grey.png'




let time_line_marks = 
    {
        //标记和样式设置
        // 0:'0H',
        24: '24H',
        48:'48H',
        72:'72H',
        96:'96H',
        120:'120H'
    }

        let ele_list = [
            {
                "id": 1,
                "name": "有效波高"
            },
            // {
            //     "id": 2,
            //     "name": "最大波高"
            // },
            // {
            //     "id": 3,
            //     "name": "风速"
            // },
            // {
            //     "id": 4,
            //     "name": "风向"
            // },
            // {
            //     "id": 5,
            //     "name": "有效波周期"
            // },
            // {
            //     "id": 6,
            //     "name": "最大波周期"
            // },
            // {
            //     "id": 7,
            //     "name": "大气压"
            // },
            // {
            //     "id": 8,
            //     "name": "气温"
            // },
            // {
            //     "id": 9,
            //     "name": "水温"
            // },
            // {
            //     "id": 10,
            //     "name": "波高"
            // },
            // {
            //     "id": 11,
            //     "name": "波向"
            // },
            // {
            //     "id": 12,
            //     "name": "周期"
            // },
            // {
            //     "id": 13,
            //     "name": "1/10波高"
            // },
            // {
            //     "id": 14,
            //     "name": "1/10周期"
            // },
            // {
            //     "id": 15,
            //     "name": "最大风速"
            // },
            // {
            //     "id": 16,
            //     "name": "相对湿度"
            // },
            // {
            //     "id": 17,
            //     "name": "盐度"
            // }
        ]
//pro
// let baseurl = '128.5.9.127'

//上线需修改：图层index
//dev
let layer_point_index = 1
//pro
// let layer_point_index = 2


            let TiandiMap_vec = new ol.layer.Tile({
                name: "天地图矢量图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            let TiandiMap_cva = new ol.layer.Tile({
                name: "天地图矢量注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            let TiandiMap_img = new ol.layer.Tile({
                name: "天地图栅格图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    // url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                    // params:{
                    //     LAYERS:"observer:geotools_coverage"
                    // },
                    wrapX: false
                }),
                preload:Infinity
            });

            var TiandiMap_cia = new ol.layer.Tile({
                name: "天地图栅格注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            //内网自建地图引擎图层
            var GaodeMap_img_wms = new ol.layer.Tile({
                name: "高德影像图层_自建地图引擎",
                source: new ol.source.TileWMS({
                    // url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                    params:{
                        'FORMAT': 'image/png',
                        'VERSION': '1.1.1',
                        tiled: true,
                        STYLES: '',
                        LAYERS:"observer:gaode_part_imgAndMark"
                    },
                    wrapX: false
                }),
                preload:Infinity
            });


                        //内网自建地图引擎图层
            var GaodeMap_img_wms_old = new ol.layer.Tile({
                name: "高德影像图层_自建地图引擎",
                source: new ol.source.TileWMS({
                                    // url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                params:{
                    LAYERS:"observer:geotools_coverage"
                    },
                    wrapX: false
                    }),
                    preload:Infinity
                            });


//上线需修改：source
//dev-栅格
// let select_source = [TiandiMap_img, TiandiMap_cia]
//dev2
//dev-矢量
// let select_source = [TiandiMap_vec, TiandiMap_cva]
//pro
let select_source = [GaodeMap_img_wms]




export {
    layer_point_index,
    select_source,
    baseurl,
    GaodeMap_img_wms,
    GaodeMap_img_wms_old,
    TiandiMap_img,
    TiandiMap_cia,
    TiandiMap_vec,
    TiandiMap_cva,
    interval,
    time_line_marks,
    min_interval,
    intervalMax,
    red_warning_color,
    orange_warning_color,
    yellow_warning_color,
    blue_warning_color,
    no_warning_color,
    red_warning_color_path,
    orange_warning_color_path,
    yellow_warning_color_path,
    blue_warning_color_path,
    no_warning_color_path,
    ele_list
}