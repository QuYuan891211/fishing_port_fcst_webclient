<template>
    <!-- 弹窗 -->
    <div v-show="(showSign === 0)" class="left-bar" v-bind:class="{ toLeft: leftActive, toRight: rightActive }"
        :style="{ left: leftbarLeft + '%' }">
        <img class="menu-cover" src="@/assets/nav_bg.png" alt="" />
        <div class="menus-bar">
            <div v-for="(item, index) in menus" :key="index" @click="selectMenu(index)">
                <div class="menus-item" :class="index != active ? 'item-bg' : 'item-bg-select'" @click="this.message_disable">{{ item.title }}</div>
            </div>
        </div>
        <img class="menu-arrow-img" src="@/assets/menu-arrow.png" alt="" @click="leftExpand">
    </div>

</template>
<script>
import common from '../../assets/js/common'
import bus from '../../utils'
export default {
    name: 'menu1',
    props:{
        showSign:{
            type:Number,  //类型判断
            default:0    //默认值
        }
    },
    data() {
        return {
            selected_type:"浮标",
            // 菜单栏数据
            menus: [
                { title: '浮标' },
                { title: '海洋站' },
                { title: '志愿船' },
                { title: '其它' },
            ],
            // 激活菜单选项
            active: 0,
            topBarTop: -8,
            leftbarLeft: 0,
            rightbarRight: -20,
            leftActive: '',
            rightActive: '',
        }
    },
    methods: {
        message_disable(){

                common.message_disable_function()
   

        },
        // 左侧菜单展开
        leftExpand() {
            if (this.leftbarLeft == 0) {
                this.leftbarLeft = -9
                this.leftActive = true
                this.rightActive = false
            } else if (this.leftbarLeft == -9) {
                this.leftbarLeft = 0
                this.leftActive = false
                this.rightActive = true
            }
        },
        // 选择菜单项目
        selectMenu(index) {
            this.active = index
            bus.emit('clickMenu', {'index':index} );
        },
    },
}
</script>
<style>
/* 左部菜单栏样式 */
.left-bar {
    position: absolute;
    /* left:0; */
    top: 163px;
    z-index: 5;
    /* pointer-events: none; */
}

.left-bar .menu-cover {
    width: 300px;
    height: 813px;
}

.left-bar .menu-arrow-img {
    width: 51px;
    height: 147px;
    position: absolute;
    top: 340px;
    left: 190px;
}

.menus-bar {
    position: absolute;
    top: 230px;
    left: 24px;
    color: #8cfeff;
}

.menus-bar .menus-item {
    width: 144px;
    height: 49px;
    font-size: 18px;
    line-height: 55px;
    margin-bottom: 49px;
    cursor: pointer;
}

.menus-bar .item-bg {
    background: url(@/assets/no-select.png);
    background-size: 100%;
}

.menus-bar .item-bg-select {
    background: url(@/assets/select.png);
    background-size: 100%;
    color: #ece847;
}

/* 收起菜单 */
.toLeft {
    animation: myfirst 800ms;
    -moz-animation: myfirst 800ms;
    /* Firefox */
    -webkit-animation: myfirst 800ms;
    /* Safari 和 Chrome */
    -o-animation: myfirst 800ms;
    /* Opera */
}

@keyframes myfirst {
    from {
        left: 0%;
    }

    to {
        left: -9%;
    }
}

@-moz-keyframes myfirst

/* Firefox */
    {
    from {
        left: 0%;
    }

    to {
        left: -9%;
    }
}

@-webkit-keyframes myfirst

/* Safari 和 Chrome */
    {
    from {
        left: 0%;
    }

    to {
        left: -9%;
    }
}

@-o-keyframes myfirst

/* Opera */
    {
    from {
        left: 0%;
    }

    to {
        left: -9%;
    }
}

/* 弹出菜单 */
.toRight {
    animation: mys 700ms;
    -moz-animation: mys 700ms;
    /* Firefox */
    -webkit-animation: mys 700ms;
    /* Safari 和 Chrome */
    -o-animation: mys 700ms;
    /* Opera */
}

@keyframes mys {
    from {
        left: -9%;
    }

    to {
        left: 0;
    }
}

@-moz-keyframes mys

/* Firefox */
    {
    from {
        left: -9%;
    }

    to {
        left: 0;
    }
}

@-webkit-keyframes mys

/* Safari 和 Chrome */
    {
    from {
        left: -9%;
    }

    to {
        left: 0;
    }
}

@-o-keyframes mys

/* Opera */
    {
    from {
        left: -9%;
    }

    to {
        left: 0;
    }
}
</style>