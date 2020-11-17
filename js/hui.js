$(function(){
//    点击游戏规则，出现规则
    $(".rules").click(function(){
        $(".rule").css("display","block");
    })
// 点击关闭，规则隐藏
    $(".rule a").click(function(){
        $(".rule").css("display","none");
    });
// 监听开始游戏按钮
   $(".start").click(function(){
       $(this).stop().fadeOut(100);
    progressint();
       startwolf_animation();


   })
//时间变化
function progressint(){
    // 先设置宽度（重来时就会变回180）
    $(".progress").css({
        width:180
    });
    var time=setInterval(function(){

          var progresswidth =  $(".progress").width();
             progresswidth -=1;
             $(".progress").css({
                 width:progresswidth
             })
//   监听进度条是否走完
         if( progresswidth<= 0){
             clearInterval(time);
             $(".mask").css("display","block")
            // 当进度条走完，狼停止生成
             stopwolf_animation()
         }

    },100)
};
// 点击重新开始
        $(".reStart").click(function(){
            $(".mask").css("display","none");
            progressint()
            startwolf_animation();
            $(".score").text("0")
        });
// 狼出没




// 定义一个狼出现的函数
 function startwolf_animation() {
        // 定义一个数组保存所有狼的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
// 定义一个数组保存所有可能出现的位置
        var  arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];


        var $wolf_img=$("<img src='' class='wolfImage'>" );
        //随机位置，设置一个随机数，在arrpos数组中取值
        var  wolf_pos=Math.floor(Math.random()*9);
        // console.log(wolf_pos)
        // var  wolf_pos=0;

        // 出现的狼类型随机  1-10 1-5灰太狼
     // Math.floor(Math.random()*(max-min+1)+min);
        var $wolf_type=Math.floor(Math.random()*11);
// 修改狼的类型的定义，让我可以拿到数字来
        // console.log($wolf_type);
        // $wolf_type ==0 ? wolf_1:wolf_2;
        if($wolf_type<=5){
                 wolf_typel=wolf_1;
        }else {
            wolf_typel=wolf_2;
        }

//     狼出现的位置随机
        $wolf_img.css({
            position:"absolute",
            left:arrPos[wolf_pos].left,
            top:arrPos[wolf_pos].top,
        })
        // 切换图片路径。让它动起来
     // 如果加var的话，函数外面就无法访问到这个定时器，就无法关闭。  不加var就可以访问了
        // var wolf_time=setInterval(function () {
 //  ----------击打动画-----------------------------------------------------击打动画----------------------------
     // 判断图片有没有到5,/到5就删掉
     //  设置一个全局变量来替代完结的索引5，这样才能判断击打动画
     window.wolf_step=0;
     window.wolf_step_end=5;
         wolf_time=setInterval(function () {

            if(wolf_step===wolf_step_end){
                $wolf_img.remove();
                clearInterval(wolf_time)

         // 这只狼完成后生成下一只狼
                startwolf_animation()
            }
       $wolf_img.attr("src",wolf_typel[wolf_step]);
            wolf_step++;

        },300)

$(".container").append($wolf_img);
// 定义一个游戏规则的方法，将图片传入，启用规则
    gamerule($wolf_img);
    function gamerule($wolf_img) {
        $wolf_img.one("click",function () {
            window.wolf_step=6;
            window.wolf_step_end=9;
            // console.log($wolf_type)
            // 点击图片判断狼是谁，进行加分减分操作
            if($wolf_type <=5){
                // alert("5555")
                // 1-10 1-5灰太狼
          $(".score").text(parseInt( $(".score").text())+10);
            }else {
                $(".score").text(parseInt( $(".score").text())-10);
            }
//回到重新开始的地方，将分数清零
        })
    }
// 拍打动画
    }
// 定义一个狼停止生成的函数
function stopwolf_animation() {
   $(".wolfImage").remove();
    clearInterval(wolf_time)
    }

//--------------------------------
})