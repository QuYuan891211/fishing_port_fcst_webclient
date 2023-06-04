export default {
    gernerateId(id){
        return "overlay_" + id
    },
    addNode(fishing_port_list, all_ybg_statics_data_5,header_text,ele, body_text,unit){
    var header_text = header_text + 'H'
    // alert(this.fishing_port_list.length)
    for (var i = 0; i < fishing_port_list.length; i++) {
    var father = document.getElementById("overlay-block");
    //获取当前port的overlay元素的id
        var child1 = document.createElement('el-card');
        child1.className = this.gernerateId(fishing_port_list[i].id); 
  
        //ch1_1 header:对头部框颜色进行初始化（根据警报颜色）
        var child1_1 = document.createElement('div');
        child1_1.className = "card-header"
        // child2.setAttribute("style", "background-color: #F53240;");
        // child2.setAttribute("style", "background-color: #CDCDCD;");
        // child2.setAttribute("style", "background-color: #535353;");
        child1_1.setAttribute("style", "background-color: #A5A5AF;");


        //ch1_1_1 标题文字（例如24小时）
        var child1_1_1 = document.createElement('span');
        child1_1_1.innerHTML=header_text
        
        //ch1_2 body
        var child1_2 = document.createElement('div');
        child1_2.className = "card-body"

        
        //ch1_2_1 body文字（例如有效波高）
        var child1_2_1 = document.createElement('span');
        child1_2_1.innerHTML=ele + ': ' + body_text+ unit

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
}
}