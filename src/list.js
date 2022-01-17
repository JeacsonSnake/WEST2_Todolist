window.addEventListener("load", load());  //页面加载完毕调用load函数
document.getElementById("clear-btn").onclick = clear();



document.addEventListener('keyup', function (keyEvent) {
  if(keyEvent.key == 'enter'){
      addTodolist();
  }
});


function addTodolist() {
  var obj_list = {
      todo: "",   //存储用户输入的数据
      done: false     //初始化用户输入的数据位于进行中
  };

  var tempDone = document.getElementById("add-list").value.trim(); //String切两边空格
  if (tempDone.length === 0){ //判断添加的内容是否为空
      alert("添加的内容不能为空!");
      return;
  }

  obj_list.todo = tempDone;

  todolist.push(obj_list);

  saveData(todolist);

  document.getElementById("add-list").value = "";     //初始化输入框
  load();     //将用户输入的数据添加至dom节点
  document.getElementById("add-list").focus();
}


function load(){
  
  var todo = document.getElementById("todolist");
  var done = document.getElementById("donelist");

  var todoString = "";
  var doneString = "";


  document.getElementById("add-list").focus();

  todolist = loadData();

  //todolist数组对象里若包含用户输入数据，则将其添加至dom节点；若为空对象，则初始化页面。
  if (todolist != null){
      for (var i=0; i<todolist.length; i ++){
          if(!todolist[i].done){
              todoString += "<li  class='dlist todolist'>"
//通过onchange事件，复选框值有改变则调用update函数，并改变输入数据“done”属性的布尔值，这样
//下次load()后，这段数据会进入不同的分组，未完成的事项分入已完成事项组，已完成事项分入未完成事项组
//点击事项调用edit函数
//点击“-”，调用remove函数

                  + "<input type='checkbox' " 
                  + "onchange='update("+i+", \"done\", true)'> class='choose-box'"
                  + "<span id='sp-"+i+"' onclick='edit("+i+")'>" + todolist[i].todo + "</span>" +
                  "<a onclick='remove("+i+")'>-</a>" +
                  "</li>";    //将每次用户输入的数据，通过节点<p>利用id标记，以便后续编辑功能定位
          }
          else{
              doneString += "<li class='dlist donelist'>"
                  + "<input type='checkbox' "
                  + "onchange='update("+i+", \"done\", false)' class='choose-box' checked>"
                  + "<span id='sp-"+i+"' onclick='edit("+i+")'>" + todolist[i].todo + "</span>"
                  + "<a onclick='remove("+i+")'>-</a>"
                  + "</li>";
          }
      }
      todo.innerHTML = todoString;
      done.innerHTML = doneString;
  }
  else {
      todo.innerHTML = "";
      done.innerHTML = "";
  }
}

function edit(i) {
  var p = document.getElementById('sp-' + i),
      pContent = p.innerHTML,
      inputId;

      p.innerHTML = "<input type='text' id='input-"+i+"' value='"+pContent+"'>";
      inputId = document.getElementById('input-'+i);
      inputId.focus();
      inputId.setSelectionRange(0, inputId.value.length);
      inputId.onblur = confirm;   //表单控件失去焦点，调用confirm函数，即对页面内容进行更新
      inputId.onkeydown = enter;     //对按键事件进行监控
//通过upadate函数对todolist数组相应项进行更新，将用户输入的内容写入到todolist数组相应项的todo属性中
  function confirm() {
      if (inputId.value.length === 0) {
          p.innerHTML = pContent;
          alert("内容不能为空");
      }
      else {
          update(i, "todo", inputId.value);   //修改事项内容后，更新数组里对应项"todo"属性的值，以便更新dom节点
      }
  }
//结合key事件，按下enter键，调用confirm函数
  function enter(e) {
      if (e.key == 'enter'){
          confirm();
      }
  }

}

function update(i, field, value) {
  todolist[i][field] = value;
  saveData(todolist);
  load();
}

function remove(i) {
  todolist.splice(i, 1);

  saveData(todolist); //相同名称的缓存会覆盖，更新缓存

  load();
}

function saveData(data) {
  localStorage.setItem("West2TodoList", JSON.stringify(data));   //JS对象转换成JSON对象存进本地缓存
}


function loadData() {
  var hisTory = localStorage.getItem("West2TodoList");
  if(hisTory !=null){
      return JSON.parse(hisTory);     //JSON对象转换为JS对象
  }
  else { return []; }
}

function clear() {
  localStorage.clear();
  load();
}

