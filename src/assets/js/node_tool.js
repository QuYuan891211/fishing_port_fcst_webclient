import {red_warning_color, orange_warning_color, yellow_warning_color, blue_warning_color, no_warning_color,no_warning_color_path,blue_warning_color_path,yellow_warning_color_path,orange_warning_color_path,red_warning_color_path} from '../../assets/js/config_data'
export default {
    gernerateId(id){
        return "overlay_" + id
    },
    addNode(fishing_port_list, all_ybg_statics_data_5, selected_time, ele,unit){
    var header_text = selected_time.toString() + 'H'
    // alert(this.fishing_port_list.length)
    for (var i = 0; i < fishing_port_list.length; i++) {
        var father = document.getElementById("overlay-block");
    //获取当前port的overlay元素的id
        var child1 = document.createElement('el-card');
        child1.className = this.gernerateId(fishing_port_list[i].id); 
        
        //ch1_1 header:对头部框颜色进行初始化（根据警报颜色）
        var child1_1 = document.createElement('div');
        child1_1.className = "card-header"
        
        //ch1_1_1 标题文字（例如24小时）
        var child1_1_1 = document.createElement('span');
        child1_1_1.innerHTML=header_text


        var body_text = 0
        //[TO-DO] 有待改进，代码过于复杂  ch1_2_1 body文字（例如有效波高）
        var child1_2_1 = document.createElement('span');
        for(var j = 0; j< all_ybg_statics_data_5.length;j++){
            if(fishing_port_list[i].name == all_ybg_statics_data_5[j].site){
                var time_statis = all_ybg_statics_data_5[j].timeLevelResultList
                for(var k = 0; k<time_statis.length;k++){
                    if(selected_time == time_statis[k].timeLevel){
                        var max = time_statis[k].max
                        var color = this.warning_level_color_img(max)
                        child1_1.setAttribute("style", "background: url(/static/images/" + color +") no-repeat;");
                        body_text = String(max)
                        break;
                    }
                }
            }
        }


        //二级加三级
        child1_1.appendChild(child1_1_1)


        //一级加二级
        child1.appendChild(child1_1)

                // child.innerHTML = "This is a test";
                // console.log(child.nodeType())
        //父节点加一级
        father.appendChild(child1);
    }
                // console.log('第'+i+'个father' + father)
                // console.log(father)
    
        return child1
},


warning_level_color_img(val){
    if(val<2.5){
    return no_warning_color_path
    }else if(val<3.5){
    return blue_warning_color_path
    }else if(val<4.5){
    return yellow_warning_color_path
    }else if(val<6){
    return orange_warning_color_path
    }else{
    return red_warning_color_path
    }
},
    warning_level_color(val){
        if(val<2.5){
        return no_warning_color
        }else if(val<3.5){
        return blue_warning_color
        }else if(val<4.5){
        return yellow_warning_color
        }else if(val<6){
        return orange_warning_color
        }else{
        return red_warning_color
        }
    },

    addNode_detail(fishing_port_list, all_ybg_statics_data_5, selected_time, ele,unit){
        var header_text = selected_time.toString() + 'H'
        // alert(this.fishing_port_list.length)
        for (var i = 0; i < fishing_port_list.length; i++) {
            var father = document.getElementById("overlay-block");
        //获取当前port的overlay元素的id
            var child1 = document.createElement('el-card');
            child1.className = this.gernerateId(fishing_port_list[i].id); 
            
            //ch1_1 header:对头部框颜色进行初始化（根据警报颜色）
            var child1_1 = document.createElement('div');
            child1_1.className = "card-header"
            
            //ch1_1_1 标题文字（例如24小时）
            var child1_1_1 = document.createElement('span');
            child1_1_1.innerHTML=header_text
            
            //ch1_2 body
            var child1_2 = document.createElement('div');
            child1_2.className = "card-body"
    
            var body_text = 0
            //[TO-DO] 有待改进，代码过于复杂  ch1_2_1 body文字（例如有效波高）
            var child1_2_1 = document.createElement('span');
            for(var j = 0; j< all_ybg_statics_data_5.length;j++){
                if(fishing_port_list[i].name == all_ybg_statics_data_5[j].site){
                    var time_statis = all_ybg_statics_data_5[j].timeLevelResultList
                    for(var k = 0; k<time_statis.length;k++){
                        if(selected_time == time_statis[k].timeLevel){
                            var max = time_statis[k].max
                            var color = this.warning_level_color(max)
                            child1_1.setAttribute("style", "background-color: " + color + ";");
                            body_text = String(max)
                            break;
                        }
                    }
                }
            }
            
            child1_2_1.innerHTML=ele + ': ' + body_text + unit
    
            //二级加三级
            child1_1.appendChild(child1_1_1)
            child1_2.appendChild(child1_2_1)
    
            //一级加二级
            child1.appendChild(child1_1)
            child1.appendChild(child1_2)
                    // child.innerHTML = "This is a test";
                    // console.log(child.nodeType())
            //父节点加一级
            father.appendChild(child1);
        }
                    // console.log('第'+i+'个father' + father)
                    // console.log(father)
        
            return child1
    },
}