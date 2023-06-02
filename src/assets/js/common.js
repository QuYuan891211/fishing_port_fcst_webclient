export default {    
    getSigleEleValue(name, item){
     if('有效波高'== name){
        return item.ybg
     }else if('最大波高'==name){
        return item.zbg
     }else if('有效波周期'==name){
        return item.yzq
     }else if('最大波周期'==name){
        return item.zzq
     }else if('波向'==name){
        return item.bx
     }else if('波高'==name){
        return item.bg
     }else if('周期'==name){
        return item.zq
     }else if('1/10波高'==name){
        return item.tenthbg
     }else if('1/10周期'==name){
        return item.tenthzq
     }else if('风速'==name){
        return item.ws
     }else if('风向'==name){
        return item.wd
     }else if('大气压'==name){
        return item.bp
     }else if('气温'==name){
        return item.at
     }else if('水温'==name){
        return item.wt
     }else if('相对湿度'==name){
      return item.hu
   }else if('最大风速'==name){
      return item.wsm
   }else if('盐度'==name){
      return item.sl
   }
     
    // alert("测试，测试！！！")
},
getOptionalEleValue(name, item){
   if('有效波高'==name){
      //返回最大波高给optional_ele
      return item.zbg
   }
},
message_disable_function(){
   ElMessage({
      showClose: true,
      message: '此功能尚不可用.',
      type: 'error',
    })
},
notification_info(message){
   ElNotification({
      title: '消息',
      message: message,
      type: 'info',
    })
},
notification_warning(message){
   ElNotification({
      title: '警告',
      message: message,
      type: 'warning',
    })
},
notification_error(message){
   ElNotification({
      title: '错误',
      message: message,
      type: 'error',
    })
},
getSystemTime_without_year_month() {
   // 实例化日期类
   var time = new Date();
   // 获取完整的年份(4位)
   var year = time.getFullYear();
   // 获取月份(0-11,0代表1月)
   var month = time.getMonth() + 1;
   // 获取日期(1-31)
   var date = time.getDate();
   // 获取小时
   var h = time.getHours();
   h = h < 10 ? '0' + h : h;
   // 获取分钟
   var m = time.getMinutes();
   m = m < 10 ? '0' + m : m;
   // 获取秒钟
   var s = time.getSeconds();
   s = s < 10 ? '0' + s : s;
   //测试打印
   console.log(date + "日 " + h + "时");
   
   // 合并返回
   return( date + "日 " + h + "时") ;

},
getSystemTime() {
   // 实例化日期类
   var time = new Date();
   // 获取完整的年份(4位)
   var year = time.getFullYear();
   // 获取月份(0-11,0代表1月)
   var month = time.getMonth() + 1;
   // 获取日期(1-31)
   var date = time.getDate();
   // 获取小时
   var h = time.getHours();
   h = h < 10 ? '0' + h : h;
   // 获取分钟
   var m = time.getMinutes();
   m = m < 10 ? '0' + m : m;
   // 获取秒钟
   var s = time.getSeconds();
   s = s < 10 ? '0' + s : s;
   //测试打印
   console.log(year + "年" + month + "月" + date + "日 " + h + ":" + m + ":" + s);
   
   // 合并返回
   return(year + "年" + month + "月" + date + "日 " + h + ":" + m + ":" + s) ;

},

// 日期格式化：入参 fmt-格式 date-日期
 dateFormat(fmt, date) {
   let ret;
   const opt = {
       "Y+": date.getFullYear().toString(),        // 年
       "m+": (date.getMonth() + 1).toString(),     // 月
       "d+": date.getDate().toString(),            // 日
       "H+": date.getHours().toString(),           // 时
       "M+": date.getMinutes().toString(),         // 分
       "S+": date.getSeconds().toString()          // 秒
       // 有其他格式化字符需求可以继续添加，必须转化成字符串
   };
   for (let k in opt) {
       ret = new RegExp("(" + k + ")").exec(fmt);
       if (ret) {
           fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
       };
   };
   return fmt;
}


}

