<template>
  <!-- 学校基本信息 -->
  <div class="sub-content-client1-info">
    <div class=title>数据总览</div>
    <div style="display:flex">
      <div style="padding-left: 50px;width:30%;">
        <div style="display:flex">
          <div>
            <img class="area-icon" src="@/assets/build.png" alt="">
          </div>
          <div style="margin-bottom:5%;">
            <div class="subtitle">当前用户名称</div>
            <div class="content">XXXX大学</div>
          </div>
        </div>
        <div style="display:flex;margin-bottom:5%">
          <div>
            <img class="build-icon" src="@/assets/build.png" alt="">
          </div>
          <div>
            <div class="subtitle">当前设备数量</div>
            <div class="content">60 <span class="unit">个</span></div>
          </div>
        </div>
        <div style="display:flex;margin-bottom:5%">
          <div>
            <img class="build-icon" src="@/assets/build.png" alt="">
          </div>
          <div>
            <div class="subtitle">设备类型数量</div>
            <div class="content">1 <span class="unit">种</span></div>
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
  name: 'subContentClient1',
  data() {
        return {
        }
  },
  methods: {
  },
}
</script>
<style>
.sub-content-client1-info{
    width: 100%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}


.sub-content-client1-info .title {
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

.sub-content-client1-info .subtitle {
  font-size: 14px;
  color: #b1eded;
  margin-bottom: 5px;
}

.sub-content-client1-info .content {
  font-size: 20px;
  line-height: 34px;
  color: #ffffff;
}

.sub-content-client1-info .unit {
  font-size: 14px;
  line-height: 28px;
  color: #b1eded;
}

.sub-content-client1-info .area-icon,
.sub-content-client1-info .build-icon {
  width: 17px;
  height: 13px;
  margin-right: 11px;
}

.sub-content-client1-info .light-bg img {
  width: 287px;
  height: 202px;
}

.sub-content-client1-info .cube-icon img {
  width: 121px;
  height: 123px;
  position: absolute;
  top: 12%;
  left: 32%;
}


.sub-content-client1-info .school-title {
  color: #b1eded;
  font-size: 14px;
  margin-left: 10px;
}

.sub-content-client1-info .school-num {
  color: #b1eded;
  font-size: 25px;
  padding: 0 7px
}

.sub-content-client1-info .static-bg {
  margin-top: 12px;
  background: url(../../assets/static-bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 206px;
  height: 66px;
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