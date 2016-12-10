    /*
      事件统计

      分享设置

    */
    function g_get_spsf(){
        var c = navigator.userAgent;
        var b = document.referrer;
        var d = "debug";
        if (c.match(/micromessenger/gi)) {
          d = "wx"
        } else {
          if (c.match(/weibo/gi) || b.match(/weibo\.com/gi)) {
            d = "wb"
          } else {
            if (c.match(/yixin/gi)) {
            d = "yx"
            } else {
              if (c.match(/qq/gi) || b.match(/(qq|qzone)\.com/gi)) {
              d = "qq"
              }
            }
          }
        }
        return d;
      }
      function g_count_event(eventid){
        //统计链接 
        var counturl="http://sps.163.com/func/?"; 
        //定义字段
        var spst="spst=5&";//分类
        var spss="spss=newsapp&";//起始来源 
        var spsf="spsf="+g_get_spsf()+"&";//当前来源
        var modelid="modelid=kxyk_falsenews&";//项目标识 
        var eventid="eventid="+eventid;//自定义事件 counturl=counturl+spst+spss+spsf+modelid+eventid;
        neteaseTracker(false,counturl,"","sps");
      }
      
      //默认分享设置
      function share_init(title,desc,url,img){
        h5Share.init({
          title: title,
          desc: desc,
          url: url,
          img: img
        });
      }
      //自定义分享
      function share_shareData(title,desc){
        h5Share && h5Share.conf({
          desc:desc,
          title:title
        });
        
      }
      
      //设置分享
      
      function share_share(){
        h5Share.share();
      }
      
      //分享成功
      window.__newsapp_share_done = function(rs) {
        //alert("share done!");
      };

 //根据名字  新闻id 动态修改页面显示
  //取得url传值
  function getUrlValue(name) {
      var targetStr="";
      var str=decodeURI(window.location.href);
      //var str = window.location.href;   //location.search是从当前URL的?号开始的字符串
      var arr=str.split("?");
      if(arr.length<2)return;
      str=arr[1];
      if (str.indexOf(name) != -1) {
          var pos_start = str.indexOf(name) + name.length + 1;
          var pos_end = str.indexOf("&", pos_start);
          if (pos_end == -1) {
              //alert(name+"="+str.substring(pos_start));
              targetStr=str.substring(pos_start)
          } else {
              //var len=pos_end-pos_start;
              //alert(name+"="+str.substring(pos_start,pos_end));
              targetStr=str.substring(pos_start,pos_end);
          }
      }
      return (targetStr);
      //return encodeURI(targetStr);
  }

//====================================================================================
/* indexView   click_btn_start
自定义事件：打开当前链接 newsView    click_btn_create
*/
function replaceAllStr(str,n,o){
    //var newstr=str.replace(new RegExp("$1","g"),"马英臣");
    newstr=str.replace(/\$1/g, n);
    //var newstr=str.replace(o,n);
    return newstr;
}

function checkIsPicture(str){
    return (str.indexOf(".png") != -1) || (str.indexOf(".gif") != -1) || (str.indexOf(".jpg") != -1) || (str.indexOf(".jpeg") != -1);
}

function checkIsText(str){
    if(!checkIsPicture(str)&&str!=""){
        return true;
    }
    return false;
}


var shareDes="";
var shareUrl="";
var shareImg="";
var game_model="public";

//－－－－－－－－－－－－－－－－－－－生成内容显示
function showContentItem(content,index,name){
    var txt = document.getElementById("id_txt_item"+index);
    var img = document.getElementById("id_img_item" + index);
    
    if(content==""){//不显示
        txt.style.display="none";
        img.style.display="none";
    } else if(checkIsPicture(content)){//显示图片
        txt.style.display = "none";
        img.style.display = "inline";
        img.src=content;
    }else{//显示文本
        txt.style.display = "inline";
        img.style.display = "none";
        var _content = replaceAllStr(content,name,"$1");
        //_content="我是测试文本。。";
        txt.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+_content;
        if(shareDes==""){
          shareDes=_content.substr(0,100);
        }
    }
}


function createNews(name,index){

  if(!name || g_data.length<1)return;
  if(game_model=="test"){
      document.getElementById("id_testIndex").innerHTML = (index + 1) + "/" + g_data.length;
  }
  
  //alert(name+":"+id);
  var data=g_data[index]
  //检索标题 内容1  内容3  评论1  评论2

  var title=replaceAllStr(data["title"],name,"$1");
  var from=data["from"];
  var time=data["time"];
  var replay_num=data["replay_num"];
  var content1=data["content1"];
  var content2=data["content2"];

  var replay1=data["replay1"];
  var replay2=data["replay2"];
  var top1_num=data["top1_num"];
  var top2_num=data["top2_num"];

  if(content1==""&&content2==""){
      return;
  }
  
  if(document.getElementById("id_root").style.display != "inline"){
      document.getElementById("id_root").style.display = "inline";
  }
  
  //确定显示内容类型 0 不显示  1显示文本  2显示图片
  showContentItem(content1,1,name);
  showContentItem(content2,2,name);
  
  //题目
  document.title=title;

  document.getElementById("id_title").innerHTML=title;
  document.getElementById("id_from").innerHTML=from;
  document.getElementById("id_time").innerHTML=time;
  document.getElementById("id_num_gt").innerHTML=replay_num;

  document.getElementById("id_name_ht1").innerHTML="网易火星网友";
  document.getElementById("id_num_z1").innerHTML=top1_num;
  document.getElementById("id_content_ht1").innerHTML=replay1;
  
  document.getElementById("id_name_ht2").innerHTML="网易火星网友";
  document.getElementById("id_num_z2").innerHTML=top2_num;
  document.getElementById("id_content_ht2").innerHTML=replay2;
}

var g_name = getUrlValue("name");
var g_index = getUrlValue("index");
if(game_model=="test"){
    g_index=0;
    document.getElementById("id_testIndex").style.display = "inline";
}
createNews(g_name,g_index);

shareUrl=window.location.href;
//shareImg = "http://" + window.location.host + window.location.pathname.replace("/index.html","/resource/assets/preload/img_icon140.png");
shareImg=window.location.href.replace("/game.html","/resource/assets/preload/img_icon140.png");

//－－－－－－－－－－－－－－－－－－－设置分享 统计

var Events = {
    goToIndex: "event_gotoindex",
    showNewsView: "event_shownews",
}

//统计
function onClickGoToIndex(){
    if(game_model=="test"){
        g_index+=1;
        createNews(g_name,g_index);
        if(g_index==g_data.length-1){
            game_model="pub";
        }
    }else{
        g_count_event(Events.goToIndex);
        window.location.href = "index.html";
    }
}
g_count_event(Events.showNewsView);

//分享
h5Share.init({
    title: document.title,
    desc: shareDes,
    url: shareUrl,
    img: shareImg
});

h5Share && h5Share.conf({
    desc: shareDes,
    title: document.title
});

function onClickShare(){
    h5Share.share();
}








