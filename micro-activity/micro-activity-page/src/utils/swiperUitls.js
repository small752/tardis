/*
 * 页面切换方式1
 * 3D流
 */
export function type_1() {
   page_wiper = new Swiper('.swiper-container',{
        direction 		: 'vertical',
        effect 			: 'coverflow',
        observer		: true,
        observeParents	: true,
        coverflow : {
            rotate		: 80,
            stretch		: 10,
            depth		: 200,
            modifier	: 3,
        },
       onSlideChangeEnd: wiperSlideChangeEnd,
    });
}

/*
 * 页面切换方式1
 * 3d翻转
 */
export  function type_2() {
    page_wiper = new Swiper('.swiper-container',{
        direction 		: 'vertical',
        effect 			: 'flip',
        observer		: true,
        observeParents	: true,
        coverflow : {
            rotate		: 80,
            stretch		: 10,
            depth		: 200,
            modifier	: 3,
        },
        onSlideChangeEnd: wiperSlideChangeEnd,
    });
}

/*
 * 页面切换方式1
 * 卡片式流
 */
export function type_3() {
    var es;
		page_wiper = new Swiper('.swiper-container', {
			direction			: 'vertical',
			lazyLoading 		: true,
			mousewheelControl	: true,
			watchSlidesProgress	: true,
			observer			: true,
			observeParents		: true,
			onInit: function(swiper) {swiper.myactive = 0;},
			onProgress: function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide 		= swiper.slides[i];
					var progress 	= slide.progress;
					var translate, boxShadow,scale,boxShadowOpacity;

					translate		= progress * swiper.height * 0.8;
					scale 			= 1 - Math.min(Math.abs(progress * 0.5), 1);
					boxShadowOpacity= 0;

					slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';

					if (i == swiper.myactive) {
						es = slide.style;
						es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
						es.zIndex=0;
					} else {
						es = slide.style;
						es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
						es.zIndex=1;
					}
				}
			},
			onTransitionEnd: function(swiper, speed) {
				swiper.myactive = swiper.activeIndex;
			},
            onSlideChangeEnd: wiperSlideChangeEnd,
			onSetTransition: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
						es = swiper.slides[i].style;
						es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
				}
			},
		});
	}

/*
 * 页面切换方式1
 * 单页滚动条
 */
export function type_4() {
   page_wiper = new Swiper('.swiper-container',{
        direction 		: 'vertical',
        observer		: true,
        observeParents	: true,
        freeMode : true,
        scrollbar:'.swiper-scrollbar' ,
        scrollbarHide:false,
       onSlideChangeEnd: wiperSlideChangeEnd,
    });
}
