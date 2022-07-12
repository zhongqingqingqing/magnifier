//1.封装查询函数

//1-1查询单一元素
function $(selector) {
  return document.querySelector(selector);
}

//1-2查询多个元素
function $$(selector) {
  return document.querySelectorAll(selector);
}

//2.初始化图片对象
var imgs = {
  //缩略图
  small: ["imgA_1.jpg", "imgB_1.jpg", "imgC_1.jpg"],
  //原图
  middle: ["imgA_2.jpg", "imgB_2.jpg", "imgC_2.jpg"],
  //大图
  large: ["imgA_3.jpg", "imgB_3.jpg", "imgC_3.jpg"],
};

//3.获得需要操作的DOM
var middleImg = $(".left-img");
var largeImg = $(".right-img");
var smallImg = $(".img-list");
var mask = $(".mask");

//4.初始化：渲染缩略图
function init() {
  var str = "";
  for (var i = 0; i < imgs.small.length; i++) {
    str +=
      '<li style="background-image:url(./images/' + imgs.small[i] + ')"></li>';
  }
  // 加入ul中
  smallImg.innerHTML = str;

  //默认选中第一张
  var firstLi = $(".img-list li");
  firstLi.style.border = "2px solid #000";
}

//7-2绑定事件
function handleEvent() {
  //5.给每个li添加点击事件（使用事件委托）
  smallImg.addEventListener("click", smallImgChange);
  //6-1鼠标移动事件
  middleImg.addEventListener("mousemove", maskShow);
  //6-2鼠标移出事件
  middleImg.addEventListener("mouseleave", maskHide);
}

//缩略图点击事件
function smallImgChange(e) {
  //当点击的是缩略图时
  if (e.target.tagName === "LI") {
    //获得所有的li元素
    var lis = $$(".img-list li");
    //清除之前缩略图的选中样式
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.border = "1px solid #eee";
    }

    //给选中的缩略图添加选中样式
    e.target.style.border = "2px solid #000";

    //把伪数组转化成真数组,再由数组得到当前点击的缩略图的下标
    // var smallArr = Array.prototype.slice.call(lis);//转化成真数组
    // var index = smallArr.indexOf(e.target);//得到下标
    var index = Array.prototype.indexOf.call(lis, e.target);

    //原图随之改变
    middleImg.style.backgroundImage =
      "url(./images/" + imgs.middle[index] + ")";
    //大图随之改变
    largeImg.style.backgroundImage = "url(./images/" + imgs.large[index] + ")";
  }
}

//6.鼠标移动、移出事件
//6-1移动
function maskShow(e) {
  //遮罩层和大图展示
  mask.style.opacity = 1;
  largeImg.style.opacity = 1;

  //得到遮罩层到背景图（原图）的距离(鼠标永远落在遮罩层的中心点)
  var left = e.clientX - middleImg.offsetLeft - mask.offsetWidth / 2;
  var top = e.clientY - middleImg.offsetTop - mask.offsetHeight / 2;

  //最大距离（不能超过边界）
  var maxLeft = middleImg.offsetWidth - mask.offsetWidth;
  var maxTop = middleImg.offsetHeight - mask.offsetHeight;

  //边界判断
  if (left <= 0) {
    left = 0;
  } else if (left >= maxLeft) {
    left = maxLeft;
  }

  if (top <= 0) {
    top = 0;
  } else if (top >= maxTop) {
    top = maxTop;
  }

  //根据最终的left和top，使mask移动（相对于原图）
  mask.style.left = left + "px";
  mask.style.top = top + "px";

  //根据left和top使大图的位置随之变动
  largeImg.style.backgroundPositionX = -left + "px";
  largeImg.style.backgroundPositionY = -top + "px";
}

//6-2移出
function maskHide(e) {
  //遮罩层和大图隐藏
  mask.style.opacity = 0;
  largeImg.style.opacity = 0;
}

//7.封装函数,一键启动
function main() {
  init(); //初始化
  handleEvent(); //注册事件
}

main();
