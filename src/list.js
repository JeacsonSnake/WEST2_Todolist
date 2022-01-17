var choosenav = document.querySelector(".choosenav");
var li1 = choosenav.querySelectorAll("li");
var content = document.querySelector(".content");
var items = content.querySelectorAll('.items');
for (var i = 0; i < li1.length; i++) {
  //设置自定义属性
  li1[i].setAttribute("index", i);
  li1[i].onclick = function () {
    //使用排他思想
    for (var j = 0; j < li1.length; j++) {
      li1[j].className = "";
      items[j].style.display = 'none';
    }
    this.className = "current";
    var index = this.getAttribute("index");
    items[index].style.display = 'block';
  };
}