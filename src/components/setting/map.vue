<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
export default {
	data(){
		return {
		
		};
	},
	mounted(){
		let map, geolocation, _this = this;
		map = new AMap.Map('container', {
		    resizeEnable: true,
		    zoom:12       
		});
		map.plugin('AMap.Geolocation', function () {
		    geolocation = new AMap.Geolocation({
		        enableHighAccuracy: true,//是否使用高精度定位，默认:true
		        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		        showButton: true,        //显示定位按钮，默认：true
		        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		        buttonOffset: new AMap.Pixel(10, 60),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
		        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
		        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		    });
		    map.addControl(geolocation);
		    geolocation.getCurrentPosition();
		    // 定位之后的回调
		    AMap.event.addListener(geolocation, 'complete', _this.onComplete);//返回定位信息
		    AMap.event.addListener(geolocation, 'error', _this.onError);      //返回定位出错信息
		});

		// 添加地图控件
		AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
	        // 添加缩放控件
	        map.addControl(new BasicControl.Zoom({
	            // position: 'rb',
	            position: { bottom: '60px',right: '20px' }
	        }));
	        //图层切换控件
	        map.addControl(new BasicControl.LayerSwitcher({
	            // position: 'rt',
	            position: { top: '50px',right: '20px' }
	        }));
	    });
	},
	methods: {
		//解析定位结果
		onComplete(data) {
		    var str=['定位成功'];
		    str.push('经度：' + data.position.getLng());
		    str.push('纬度：' + data.position.getLat());
		    if(data.accuracy){
		        str.push('精度：' + data.accuracy + ' 米');
		    }//如为IP精确定位结果则没有精度信息
		    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
		    console.info(str);
		},
		//解析定位错误信息
		onError(data) {
		    console.info('定位失败');
		}
	}
}
</script>

<style scoped>
	#container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
	}
	.amap-logo,
	.amap-copyright {
	  	display: none !important;
	}
</style>