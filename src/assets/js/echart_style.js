var markline_wave = {
    
        symbol:"none",              //去掉警戒线最后面的箭头
        label:{
                position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
         data : [{
                        
                silent:false,             //鼠标悬停事件  true没有，false有
                lineStyle:{               
                           type:"dotted",//警戒线的样式  ，虚实 
                           color:"#df433c",// 颜色
                           width:2
                       },
                           label:{
                           position:'end',
                           formatter:"红",
                           color:"#df433c",// 颜色
                           fontSize:'14'
                       },
                       yAxis:6         // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                      
                   },
                   {
                     
                       silent:false,             //鼠标悬停事件  true没有，false有
                       lineStyle:{               //警戒线的样式  ，虚实  颜色
                           type:"dotted",
                           color:"#FCB071",
                           width:2
                       },
                       label:{
                           position:'end',
                           formatter:"橙",
                           color:"#FCB071",
                           fontSize:'14'
                       },
                       yAxis:4.5           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                 
                   },
                   {
                     
                    silent:false,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"dotted",
                        color:"#FFD253",
                        width:2
                    },
                    label:{
                        position:'end',
                        formatter:"黄",
                        color:"#FFD253",
                        fontSize:'14'
                    },
                    yAxis:3.5           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              
                },
                   {
                     
                    silent:false,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"dotted",
                        color:"#99D0D9",
                        width:2
                         
                    },
                    label:{
                        position:'end',
                        formatter:"蓝",
                        color:"#99D0D9",
                        fontSize:'14'
                    },
                    yAxis:2.5           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              
                }
                ]
    }
    export {
        
        markline_wave
    }

