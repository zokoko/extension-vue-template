// (function($){
//     $.fn.modalInfowindow = function(options){
//         var defaults = {};
//         var options = $.extend(defaults, options);
//         var container=$(this);
//         var width=options.width, height=options.height, title=options.title, content=options.content;
//         //模态层容器
//         var modal=$("<div id='modal'></div>");
//         modal.css("width","100%");
//         modal.css("height","100%");
//         //模态层
//         var modal_div=$("<div class='modal'></div>");
//         modal_div.css("width","100%");
//         modal_div.css("height","100%");
//         //信息框
//         var infoWin=$("<div class='infowin'></div>");
//         infoWin.css("width",width+"px");
//         infoWin.css("height",height+"px");
//         infoWin.css("position","absolute");
//         infoWin.css("top",(container.height()-height)/2+"px");
//         infoWin.css("left",(container.width()-width)/2+"px");
//         //标题
//         var infoWin_title=$("<div class='title'></div>");
//         var infoWin_title_close=$("<div class='close'></div>")
//         infoWin_title_close.on("click",function(){
//             console.log("Close Modal!");
//             modal.hide();
//         });
//         var infoWin_title_content=$("<div class='title_content'></div>")
//         infoWin_title_content.append(title);
//         infoWin_title.append(infoWin_title_close);
//         infoWin_title.append(infoWin_title_content);
//         //内容
//         var infoWin_content=$("<div class='content'></div>");
//         infoWin_content.append(content);
//         //信息框添加标题和内容
//         infoWin.append(infoWin_title);
//         infoWin.append(infoWin_content);
//         //模态层容器添加模态层和信息框
//         modal.append(modal_div);
//         modal.append(infoWin);
//         //将模态层添加到容器
//         container.append(modal);
//     }
// })(jQuery);
// function ShowModal(){
// 	$('#container').modalInfowindow({
// 		width:300,
// 		height:150,
// 		title:"中国",
// 		content:"中国是中华人名共和国的简称"
// 	});
// }
function getIframeContent(id) { //获取iframe中文档内容
	console.log($("#myiframe"))
	var thb = $("#myiframe").contents().find("#modal").html();
	console.log(thb)
	//$("#myiframe")[0].contentWindow.testIframe2("11");
	// var ifr1win = window.frames[0];
	// console.log(ifr1win)
	// ifr1win.test()
	// var doc;
	// if (document.all){ // IE
	// doc = document.frames['myiframe'].document;
	// }else{ // 标准
	// doc = document.getElementById('myiframe').contentDocument;
	// }
	// console.log(doc)
	// return doc.body.innerHTML;
}

//嵌入iframe 对象
function InnerIframe() {

}
InnerIframe.prototype.create = function (url) {
	var m_iframe = document.createElement("iframe");
	m_iframe.scrolling = "no";
	m_iframe.setAttribute('name','myiframe');
	m_iframe.setAttribute('id', 'myiframe');
	m_iframe.setAttribute("frameborder", "0", 0);  //m_iframe.frameborder="0";ie7无效
	m_iframe.setAttribute("width", "100%");
	m_iframe.setAttribute("height", "500px");
	m_iframe.setAttribute('style','margin-top:-183px;');
	//m_iframe.setAttribute('style','margin-top:-200px;margin-left:100px;');
	//m_iframe.style="position: absolute; top: 120px; left: 680px;";
	m_iframe.src = url;
	//var ifr = document.createElement('iframe');  
	//ifr.src = 'http://b.a.com/b.php';  
	if (m_iframe.attachEvent) {
		m_iframe.attachEvent('onload', function () { });
	} else {
		m_iframe.onload = function () {
		// 	var users = [{ ID: 'think8848', Name: 'Joseph Chan', Num: '1', Status: 1 }, { ID: 'aCloud', Name: 'Mary Cheung', Num: '2'}];
		// 	$("#demo").tmpl(users).appendTo('#div_demo');
		// 	//window.frames["myiframe"].document.getElementByIdx_x("btnOk").click();
		};
		$("#iframe_container").append(m_iframe)
		//document.body.appendChild(m_iframe);
		//setTimeout('next()',3000);
		//m_iframe.src = "https://tdp.mycjj.com/api/index";
		//document.body.appendChild(m_iframe);
	}
}
InnerIframe.prototype.setStyle = function (url) {
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}
InnerIframe.prototype.buildContent = function (url) {
	var apiendpoint = "https://www.medwords.co/extensions/candidate.html?candidate=gliom&ext_session_str=DN1%21LFT5YGJAUIE6CSYL5P%21FZ%2BCICDNC%3DQA4X87AVYL%21DTS%21ZL5HXO%23WRML";
	$.get(apiendpoint, function (d) {
		var obj = jQuery.parseJSON(d)
		//var obj = eval("(" + d + ")"); //必须带圆括号
		console.log(obj)
		//var obj = JSON.parse(d);
		//console.log(obj)
		// console.log(d.data)
		var candidates_str = obj.data.candidates;
		var candidates_arr = candidates_str.split('#$#');
		console.log(candidates_arr);
		//data=[];
		//$data['iframe'] = '';
	})
}
// function ShowModal(){
// 	//console.log(console.log(window.frames['myiframe']));
// 	//console.log(window.frames['myiframe'].document.getElementById('button'));
// 	//window.frames['InnerIframe'].document.getElementById('button').click()
// 	window.frames['myiframe'].document.getElementById('container').modalInfowindow({
// 		width:300,
// 		height:150,
// 		title:"中国",
// 		content:"中国是中华人名共和国的简称"
// 	});
// }
// function next(){

// 	console.log(window.frames)
// 	ShowModal();
// 	//window.frames['myiframe'].ShowModal();
// }
//动态加载js
function loadJs(url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if (typeof (callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else {
			script.onload = function () {
				callback();
			}
		}
	}
	script.src = url;
	document.body.appendChild(script);
}
// //动态加载css
// function includeLinkStyle(url) {
// 	var link = document.createElement("link");
// 	link.rel = "stylesheet";
// 	link.type = "text/css";
// 	link.href = url;
// 	document.getElementsByTagName("head")[0].appendChild(link);
// }
//获取鼠标位置
document.onmousemove = function (e) {
	var x = e.pageX;
	var y = e.pageY;
	// do what you want with x and y
};
// //注入iframe        
// function createIfreme() {
// 	var m_iframe = document.createElement("iframe");
// 	m_iframe.scrolling = "no";

// 	m_iframe.setAttribute("frameborder", "0", 0);  //m_iframe.frameborder="0";ie7无效

// 	m_iframe.src = "https://tdp.mycjj.com/api/index";
// 	document.body.appendChild(m_iframe);
// }
var url = location.href;
if (url.indexOf('ncbi.nlm.nih.gov') > -1) {
	$("#id_term").bind('click', function () {
		var iframe = new InnerIframe();
		var keyword = $("#id_term").val();
		var session_str = 'DN1!LFT5YGJAUIE6CSYL5P!FZ+CICDNC=QA4X87AVYL!DTS!ZL5HXO#WRML';
		localStorage.setItem('session_str', session_str);
		$("body").append("<div id='iframe_container' width='100%' height='500px' style='margin-top:-3700px;margin-left:600px;width:600px;height:600px;z-index:1000'></div>")
		iframe.create("https://jxe.zokoko.cn/api/index?keyword="+keyword);
	})
	// var iframe = new InnerIframe();
	// var session_str = 'DN1!LFT5YGJAUIE6CSYL5P!FZ+CICDNC=QA4X87AVYL!DTS!ZL5HXO#WRML';
	// localStorage.setItem('session_str', session_str);
	// $("body").append("<div id='iframe_container' width='100%' height='500px' style='margin-top:-1900px;margin-left:300px;width:600px;height:600px;z-index:1000'></div>")
	// iframe.create("https://jxe.zokoko.cn/api/index");
	//setTimeout('test()', 3000);
	//getIframeContent("myiframe"))
	//iframe.buildContent('https://tdp.mycjj.com/api/index');
	//iframe.setStyle("https://tdp.mycjj.com/plugin.css");
	//iframe.create("https://jxe.zokoko.cn/api/index");






	// var url="https://jxe.zokoko.cn/api/index"
	// iframe.setAttribute('src', url);
	// iframe.setStyle('width', "100%");
	// iframe.setAttribute('height', "500px");



	// setTimeout('getDiv()', 5000);
	// // $.getJSON("https://www.medwords.co/extensions/hello.html",function(d){
	// //     alert(d.hello)
	// // })
	//createIfreme();
	//loadJs("https://tdp.mycjj.com/plugin.js")
}
// // function getDiv()
// // {
// //     //alert('go')
// //     alert($(".modal").html())
// // }