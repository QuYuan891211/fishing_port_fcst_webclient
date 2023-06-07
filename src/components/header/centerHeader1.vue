<template>
    <div class="top-bar fromTop" style="{ top: 8% }">
        <div class="top-bar-left d-flex j-end a-center">
            <!-- <img src="@/assets/top_title.png" alt=""> -->
            <!-- <img class="logo" src="@/assets/nmefclogo.png" alt=""> -->
            <text class="title">渔港海浪预警报平台</text>
        </div>
        <div class="top-bar-right d-flex j-end a-center">
            <div class="time">{{ curTime }}</div>
            <div class="week">{{ curWeek }}</div>
            <!-- <div class="weather">32℃</div> -->
            <!-- <div class="weather"><img src="@/assets/weather.png" alt=""></div> -->
            <!-- <div class="weather">{{weather}}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'centerHeader1',
    props:{
    },
    data() {
        return {
            topBarTop: -8,
            curWeek: '',
            curTime: '',
            weather: '多云',
        }
    },
    methods: {
        // 取得当天日期的数据
        getDate() {
            var date = new Date()
            this.curWeek = '星期' + '日一二三四五六'.charAt(date.getDay())
            var year = date.getFullYear()
            var month = date.getMonth()+1
            var day = date.getDate()
            var hour = date.getHours()
            var min = date.getMinutes()
            var second = date.getSeconds()
            if (month < 10) {
                month = '0' + month
            }
            if (day < 10) {
                day = '0' + day
            }
            if (hour < 10) {
                hour = '0' + hour
            }
            if (min < 10) {
                min = '0' + min
            }
            if (second < 10) {
                second = '0' + second
            }
            this.curTime = year + "-" + month + "-" + day + " " + hour + ':' + min + ':' + second
        },
        // 顶部信息展开
        topExpand() {
            if (this.topBarTop == -8) {
                this.topBarTop = 0
            }
        },
    },
    // 调用各个数据方法
    mounted() {
        setInterval(() => {
            this.getDate()
        }, 1000)
    },
}
</script>
<style>
/* 顶部样式 */
.top-bar {
    width: 100%;
    height: 80px;
    background: url(../../assets/top_bg1.png);
    position: absolute;
    opacity: 2;
    z-index: 6;
    /* top:0; */
    left: 0;
}

.top-bar .top-bar-left {
    position: absolute;
    top: 0;
    left: 0;

}
/* test */
/* .top-bar .top-bar-left img {
    width: 596px;
} */
.top-bar .top-bar-left {
    
    font-family: PangMenZhengDao;
    /* font-weight: bolder; */
    color: white;
    height: 70px;
    letter-spacing: 3px;
    line-height: 23px;
    font-size: 40px;
    /* margin-left: 2px; */
    
}
.top-bar .top-bar-right {
    font-family: PangMenZhengDao;
    /* color: #b1eded; */
    color: white;
    height: 70px;
    letter-spacing: 3px;
    line-height: 23px;
    font-size: 23px;

}
.top-bar .top-bar-left .logo {
    /* margin-left: px; */
        width: 80px;
        height:80px;
        margin-right: 10px;
    }

.top-bar .top-bar-right .degree {
    margin-right: 30px;
}

.top-bar .top-bar-right .week {
    margin-right: 15px;
}

.top-bar .top-bar-right .weather,
.top-bar .top-bar-right .time {
    margin-right: 15px;
}

/* 头部出现 */
.fromTop {
    animation: ft 2000ms;
    -moz-animation: ft 2000ms;
    /* Firefox */
    -webkit-animation: ft 2000ms;
    /* Safari 和 Chrome */
    -o-animation: ft 2000ms;
    /* Opera */
}

@keyframes ft {
    from {
        top: -8%;
    }

    to {
        top: 0;
    }
}

@-moz-keyframes ft

/* Firefox */
    {
    from {
        top: -8%;
    }

    to {
        top: 0;
    }
}

@-webkit-keyframes ft

/* Safari 和 Chrome */
    {
    from {
        top: -8%;
    }

    to {
        top: 0;
    }
}

@-o-keyframes ft

/* Opera */
    {
    from {
        top: -8%;
    }

    to {
        top: 0;
    }
}

/* flex布局  http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html*/
.d-flex {
    display: flex;
}

.d-block {
    display: block;
}

.d-inline-block {
    display: inline-block;
}

.flex-1 {
    flex: 1;
}

.flex-column {
    flex-direction: column;
}

.flex-row {
    flex-direction: row;
}

.flex-wrap {
    flex-wrap: wrap;
}

.flex-nowrap {
    flex-wrap: nowrap;
}

.flex-shrink {
    flex-shrink: 0;
}

/* justify-content属性定义了项目在主轴上的对齐方式 */
.j-start {
    justify-content: flex-start;
}

.j-center {
    justify-content: center;
}

.j-end {
    justify-content: flex-end;
}

.j-sb {
    justify-content: space-between;
}

.j-around {
    justify-content: space-around;
}

/* align-items属性定义项目在交叉轴上如何对齐。 */
/*flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 */
.a-center {
    align-items: center;
}

.a-start {
    align-items: flex-start;
}

.a-end {
    align-items: flex-end;
}

.a-stretch {
    align-items: stretch;
}

/* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 */
.a-self-start {
    align-self: flex-start;
}

.a-self-auto {
    align-self: auto;
}

.a-self-end {
    align-self: flex-end;
}

.a-self-stretch {
    align-self: stretch;
}

.a-self-baseline {
    align-self: baseline;
}
.title{
    margin-left: 3px;
}
</style>