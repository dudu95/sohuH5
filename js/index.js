/**
 * Created by Administrator on 2016-12-30.
 */
$(function(){
    
    var photos_urls = [
        'images/loading.gif','images/p1_bg.png','images/p1_sohu.png',
        'images/p1_zouguo.png','images/p2_bg.png','images/p2_tuandui.png',
        'images/p_touch01.png','images/arrow.png','images/logo.png',
        'images/music.png','images/p_touch01.png','images/p3_arrow.png',
        'http://mfiles.sohu.com/tv/ott/2017/images/p3_bg.jpg','images/p3_close.png','images/p4_bg.png',
        'images/P4_pic.png','images/p4_text.png','images/p5_bg.png',
        'images/p5_pic01.png','images/p5_pic02.png','images/p5_pic03.png',
        'images/p5_pic04.png','images/p5_pic05.png','images/p5_text.png',
        'images/p6_pic03.png','images/p6_text.png','images/p7_bg.png',
        'images/p7_pic01.png','images/p7_pic02.png','images/p7_text.png',
        'images/p7_TV.png','images/share.png'
    ];

    new preLoader(photos_urls, {
        onProgress: function(){
            var percent = Math.floor((100 / this.queue.length) * this.completed.length);
            $('.preloader').text('Loading '+ percent + '%');
            if(percent==96){
                $('.preload').css('display','none');
            }
        },
         onComplete: function(){
             p1_sohu.addClass("move_in");
         }
    });

    //定义变量
    var p1_sohu = $(".p1_sohu");
    var p1_zouguo = $(".p1_zouguo");
    var p1_touch = $(".p1_touch");
    var p2_touch = $(".p2_touch");
    var page1 = $(".page1");
    var page2 = $(".page2");
    var p2_ourTeam = $(".p2_ourTeam");
    var p3_bg = $(".p3_bg");
    var page3 = $(".page3");
    var p3_close = $(".p3_close");
    var page4 = $(".page4");
    var p4_pic = $(".p4_pic");
    var p4_text = $(".p4_text");
    var p4_touch = $(".p4_touch");
    var page5 = $(".page5");
    var p5_pic01 = $(".p5_pic01");
    var p5_pic02 = $(".p5_pic02");
    var p5_pic03 = $(".p5_pic03");
    var p5_pic04 = $(".p5_pic04");
    var p5_pic05 = $(".p5_pic05");
    var p5_text = $(".p5_text");
    var p5_touch = $(".p5_touch");
    var page6 = $(".page6");
    var p6_text = $(".p6_text");
    var p6_arrow = $(".p6_arrow");
    var page7 = $(".page7");
    var p7_pic01=$('.p7_pic01');
    var p7_pic02=$('.p7_pic02');
    var audio = document.getElementById('audio');


    $('.preload').on("touchmove",function(event){
        return false;
    });
    page1.on("touchmove",function(event){
        return false;
    });
    page2.on("touchmove",function(event){
        return false;
    });
    page4.on("touchmove",function(event){
        return false;
    });
    page5.on("touchmove",function(event){
        return false;
    });
    page6.on("touchmove",function(event){
        return false;
    });
    page7.on("touchmove",function(event){
        return false;
    });

    //第一屏动画
    p1_sohu.on("webkitAnimationEnd",function(){
        p1_sohu.css({
            opacity: "1",
            bottom: "43%",
            transform:"perspective(200px) rotateX(0deg) scale(0.6)"
        }).addClass("fade_out");
        p1_zouguo.css("display","block").addClass("move_in2");
        p1_zouguo.on("webkitAnimationEnd",function(){
            p1_touch.css("display","block");
        })
    });

    //从第一屏到第二屏
    p1_touch.on("click",function(){
        page1.addClass("fade_out");
        page2.addClass("fade_in").css("transform","translateY(-100%)");
        p2_ourTeam.css("display","block").addClass("move_in3");
        p2_ourTeam.on("webkitAnimationEnd",function(){
            p2_touch.css("display","block");
        })
    });

    //第三屏动画

    //从第二屏到第三屏
    p2_touch.on("click",function(){
        page1.css("display","none");
        page2.css("display","none");
        page3.addClass("fade_in");
        slider.init();
    });

    //移动处理
    var slider = {
        //判断设备是否支持touch事件
        touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        slider:p3_bg.get(0),

        events:{
            index:0,
            slider:p3_bg.get(0),
            currentPos:0,
            flag:1,
            dis:p3_bg.width()-document.body.clientWidth,

            handleEvent:function(event){
                var self = this;
                if(event.type == 'touchstart'){
                    self.start(event);
                }else if(event.type == 'touchmove'){
                    self.move(event);
                }else if(event.type == 'touchend'){
                    self.end(event);
                }
            },
            start:function(event){
                var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
                startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值ֵ
                isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动

                this.slider.addEventListener('touchmove',this,false);
                this.slider.addEventListener('touchend',this,false);
            },

            move:function(event){
                //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                var touch = event.targetTouches[0];
                endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
                //isScrolling为1时，表示纵向滑动，0为横向滑动
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
                if(endPos.x<0){
                    this.flag=-1;
                }
                if(isScrolling === 0){
                    event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                    //判断首尾
                    if(this.currentPos==0&&endPos.x>0){
                        //this.currentPos = this.p3_bg-this.p3_width;
                        this.currentPos = -this.dis;
                    }
                    if(this.currentPos==-this.dis&&endPos.x<0){
                        this.currentPos = 0;
                    }
                    //改变left值
                    if((this.currentPos + 15*(this.flag))>0){
                        this.slider.style.left = "0px";
                    }
                    else if((this.currentPos + 15*(this.flag))<-this.dis){
                        this.slider.style.left = -this.dis+"px";
                    }
                    else{
                        this.slider.style.left = this.currentPos + 15*(this.flag) + 'px';
                    }
                    //保存上一次的left值
                    this.currentPos = parseInt(this.slider.style.left);
                    this.flag = 1;
                }
                if(isScrolling === 1){
                    event.preventDefault();
                }
            },

            end:function(event){
                //解绑事件
                this.slider.removeEventListener('touchmove',this,false);
                this.slider.removeEventListener('touchend',this,false);
            }
        },

        init:function(){
            var self = this;
            self.slider.addEventListener('touchstart',self.events,false);
        }
    };


    //第三屏到第四屏
    p3_close.on("click",function(){
        page3.css("display","none");
        page4.addClass("fade_in");
        p4_pic.addClass("fade_in");
        p4_text.addClass("move_in4");
        p4_text.on("webkitAnimationEnd",function(){
            p4_touch.css("display","block");
        })
    });

    //从第四屏到第五屏
    p4_touch.on("click",function(){
        page4.css("display","none");
        p5_pic01.addClass("p5_pic01_animate");
        p5_pic02.addClass("p5_pic02_animate");
        p5_pic03.addClass("p5_pic03_animate");
        p5_pic04.addClass("p5_pic04_animate");
        p5_pic05.addClass("p5_pic05_animate");
        p5_text.addClass("move_in");
        p5_text.on("webkitAnimationEnd",function(){
            p5_touch.css({
                display:"block",
                zIndex:"10000"
            });
        })
    });

    //第五屏到第六屏
    p5_touch.on("click",function(){
        page5.css("display","none");
        page6.addClass("fade_in");
        p6_text.addClass("p6_text_animate");
        p6_text.on("webkitAnimationEnd",function(){
           p6_arrow.css("display","block").addClass("p6_arrow_animate");
        });
    });

    //从第六屏到第七屏
    page6.on("click",function(){
        page6.css("display","none");
        //第七屏动画
        $(".p7_text").addClass("p7_text_animate");
        p7_pic01.animate({'opacity':1},1500);
        setInterval(function(){
            var opflag=p7_pic01.css('opacity');
            if(opflag==1){
                p7_pic01.animate({'opacity':0},1499);
                p7_pic02.animate({'opacity':1},1499);
            }
            else if(opflag==0){
                p7_pic02.animate({'opacity':0},1499);
                p7_pic01.animate({'opacity':1},1499);
            }
        },1500);
    });

    //music
    var music_icon=$('.music_icon');
    music_icon.on('click',function(){
        var runflag=$(this).css('animation-play-state');
        if(runflag=='running'){
            audio.pause();
            $(this).css({'animation-play-state':'paused','-webkit-animation-play-state':'paused'});
        }else{
            audio.play();
            $(this).css({'animation-play-state':'running','-webkit-animation-play-state':'running'});
        }
    });

    $("html").one("touchstart",function(){
        audio.play();
    })
});