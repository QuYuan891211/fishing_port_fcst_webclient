<template>
  <!-- 学校基本信息 -->
  <div class="sub-content-info">
    <div class=title>预报模式数据调入</div>
    <div style="display:flex">
      <div style="padding-left: 30px;">
        <div style="display:flex">
          <div>
            <img class="area-icon" src="@/assets/build.png" alt="">
          </div>
          <div style="margin-bottom:2%;">
            <div class="subtitle">预报模型</div>
            <!-- <div class="content">国家海洋环境预报中心西北太海浪数值预报系统 </div> -->
            <el-select class="model-select"   size="small" v-model="selected_model" placeholder="Select">
                <el-option
                  v-for="item in options_model"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
           </el-select>
          </div>
          
        </div>
        <div style="display:flex">
          <div>
            <img class="area-icon" src="@/assets/build.png" alt="">
          </div>
          <div style="margin-bottom:2%;">
            <div class="subtitle">模型驱动场</div>
            <!-- <div class="content">国家海洋环境预报中心西北太海浪数值预报系统 </div> -->
            <el-select class="model-select"   size="small" v-model="selected_force" placeholder="Select">
                <el-option
                  v-for="item in options_force"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
           </el-select>
          </div>
          
        </div>
        
        <div style="display:flex;margin-bottom:0%">
          <div>
            <img class="build-icon" src="@/assets/build.png" alt="">

          </div>
          <div>
            <div class="subtitle">最近起报时间</div>
            <div class="content">2023-01-01 08:00</div>
          </div>
        </div>
        <!-- <div style="display:flex;margin-bottom:0%">
          <div>
            <img class="build-icon" src="@/assets/build.png" alt="">
          </div>
          
          <div>
            <div class="subtitle">当前预报要素</div>
            <div class="content">有效波高 </div>

          </div>
        </div> -->
        <div style="display:flex;margin-bottom:0%">
          <div>
            <img class="build-icon" src="@/assets/build.png" alt="">
          </div>
          
          <div>
            <div class="subtitle">预报时效 / 时间分辨率</div>
            <div class="content">120小时 / 逐小时 </div>

          </div>
        </div>
        
      </div>
      <div style="position:relative; width:50%;">
        <div class="cube-icon img-bounce">
          <img src="@/assets/file.png" alt="">
        </div>
        <div class="light-bg">
          <img src="@/assets/light-bg.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'subContent1',
  data() {
        return {
          selected_model: '西北太海浪数值预报',
          selected_force: 'GRAPES',
          
            options_model : [
            {
              value: '西北太海浪数值预报',
              label: '西北太海浪数值预报',
            },
            {
              value: 'AI海浪预报模型',
              label: 'AI海浪预报模型',
              disabled: true,
            },{
              value: '自主海浪模式-FVWAM',
              label: '自主海浪模式-FVWAM',
              disabled: true,
            },{
              value: '自主海洋环流模式-妈祖',
              label: '自主海洋环流模式-妈祖',
              disabled: true,
            }
],

              options_force : [
                          {
                            value: 'GRAPES',
                            label: 'GRAPES',
                          },
                          {
                            value: 'EC',
                            label: 'EC',
                            disabled: true,
                          },{
                            value: 'GFS',
                            label: 'GFS',
                            disabled: true,
                          }
                        ]
        }
  },
  methods: {
  },
}
</script>
<style>
.model-select{

}
.sub-content-info{
    width: 49%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}


.sub-content-info .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 1px;
    color: #b1eded;
    margin-top: 8px;
    background: url(../../assets/rightcotent1_title_bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 221px;
    height: 60px;
    padding-left: 30px;
}

.sub-content-info .subtitle {
  font-size: 14px;
  color: #b1eded;
  margin-bottom: 0px;
}

.sub-content-info .content {
  font-size: 16px;
  line-height: 34px;
  color: #ffffff;
}

.sub-content-info .unit {
  font-size: 14px;
  line-height: 28px;
  color: #b1eded;
}

.sub-content-info .area-icon,
.sub-content-info .build-icon {
  width: 17px;
  height: 13px;
  margin-right: 11px;
}

.sub-content-info .light-bg img {
  width: 287px;
  height: 202px;
  margin-top: 5%;
  
}

.sub-content-info .cube-icon img {
  width: 180px;
  height: 180px;
  position: absolute;
  top: 30%;
  left: 20%;
}


.sub-content-info .school-title {
  color: #b1eded;
  font-size: 14px;
  margin-left: 10px;
}

.sub-content-info .school-num {
  color: #b1eded;
  font-size: 25px;
  padding: 0 7px
}

.sub-content-info .static-bg {
  margin-top: 10px;
  background: url(../../assets/static-bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 206px;
  height: 50px;
}

.static-bg .name {
  color: #b1eded;
  font-size: 14px;
  text-align: center;
}

.bar-chart canvas {
  width: 450px !important;
  height: 300px !important;
  left: 6% !important;
  top: -15% !important;
}

/* 分割线 */
.divider{
	height:1px;
	background-color: #528693;
	width:100%;
}

/* 图片弹跳 */
.img-bounce{
	animation: bounce 1s linear infinite;
	-moz-animation: bounce 1s linear infinite; /* Firefox */
	-webkit-animation: bounce 1s linear infinite; /* Safari 和 Chrome */
	-o-animation: bounce 1s linear infinite; /* Opera */
}
@keyframes bounce {
	25% {transform: translateY(-5px);}
	50%, 100% {transform: translateY(0);}
	75% {transform: translateY(5px);}
}
@-moz-keyframes bounce /* Firefox */ {
	25% {transform: translateY(-5px);}
	50%, 100% {transform: translateY(0);}
	75% {transform: translateY(5px);}
}
@-webkit-keyframes bounce /* Safari 和 Chrome */ {
	25% {transform: translateY(-5px);}
	50%, 100% {transform: translateY(0);}
	75% {transform: translateY(5px);}
}
@-o-keyframes bounce /* Opera */ {
	25% {transform: translateY(-5px);}
	50%, 100% {transform: translateY(0);}
	75% {transform: translateY(5px);}
}
</style>