<template>
  <!-- 学校基本信息 -->
  <div class="sub-content-info">
    <div class=title>要素统计</div>
    <div style="display:flex">
      <div style="position:relative; height:200px; width:45%">
        <div class="pie-bottom-icon">
          <img src="@/assets/bottom.png" alt="">
        </div>
        <div class="pie-bg-icon img-blink">
          <img src="@/assets/pie-bg.png" alt="">
        </div>
        <div class="pie-icon img-bounce">
          <img src="@/assets/ele.png" alt="">
        </div>
      </div>
      <div class="static-list">
        
        <div class="static-bg">
          <div class="name">海浪</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">9 <span
              style="color: #5cb2fa;font-size:14px;">个</span> </div>
        </div>
        <div class="static-bg">
          <div class="name">气象</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">7 <span
              style="color: #5cb2fa;font-size:14px;">个</span> </div>
        </div>
        <div class="static-bg">
          <div class="name">海温</div>
          <div style="color: #ffffff;font-size:23px;text-align: center;padding:3px 0;">1 <span
              style="color: #5cb2fa;font-size:14px;">个</span> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'subContent3'
}
</script>
<style>
.sub-content-info{
    width: 49%;
    margin-left: 1%;
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


/* 分割线 */
.divider{
	height:1px;
	background-color: #528693;
	width:100%;
}

.sub-content-info .pie-icon img {
  width: 180px;
  height: 180px;
  position: absolute;
  /* bottom: 8%; */
  left: 1px;
  margin-top: 1%;
}
.static-list{
  height: 100px;
  /* margin-bottom: %; */
}
.sub-content-info .pie-bg-icon img {
  width: 121px;
  height: 80px;
  position: absolute;
  top: 4%;
  left: 15%;
}

.sub-content-info .pie-bottom-icon img {
  width: 151px;
  height: 81px;
  position: absolute;
  bottom: 8%;
  left: 8%;
}

.sub-content-info .static{
	display: flex;
	align-items: center;
	margin-bottom:15px;
}
.sub-content-info .static img{
	width:14px;
	height:14px;
}

/* 图片闪烁 */
.img-blink{
	animation: fade 1s infinite;
	-moz-animation: fade 1s infinite; /* Firefox */
	-webkit-animation: fade 1s infinite; /* Safari 和 Chrome */
	-o-animation: fade 1s infinite; /* Opera */
}
@keyframes fade {
	from {opacity: 1.0;}
	50% {opacity: 0.4;}
	to {opacity: 1.0;}
}
@-moz-keyframes fade /* Firefox */ {
	from {opacity: 1.0;}
	50% {opacity: 0.4;}
	to {opacity: 1.0;}
}
@-webkit-keyframes fade /* Safari 和 Chrome */ {
	from {opacity: 1.0;}
	50% {opacity: 0.4;}
	to {opacity: 1.0;}
}
@-o-keyframes fade /* Opera */ {
	from {opacity: 1.0;}
	50% {opacity: 0.4;}
	to {opacity: 1.0;}
}

</style>