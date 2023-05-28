        //实例化鼠标位置控件（MousePosition）
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4), //坐标格式
    projection: 'EPSG:4326',//地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    className: 'custom-mouse-position', //坐标信息显示样式，默认是'ol-mouse-position'
    target: document.getElementById('mouse-position'), //显示鼠标位置信息的目标容器
    undefinedHTML: '&nbsp;'//未定义坐标的标记
    });
export  {    
    mousePositionControl
}
