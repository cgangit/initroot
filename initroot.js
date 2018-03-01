/**
 * 将视图（body）宽度1/20设置为html结点字体大小即视图宽度为20rem。
 * @auther freeman
 * @version 1.0.0
 * @date 2018.03.01
 */
;(function(win) {
  //创建样式表
  var sheet = (function() {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    win.document.head.appendChild(style);
    return style.sheet;
  })();
  function introot(doc) {
    var font = 16;
    var vw = 640;
    //当传入参数时获取页面设定的渲染宽度（由于该脚本执行时body并未渲染，所以无法获取body宽度）
    if (arguments.length) {
      var intvw = doc.documentElement.getAttribute("data-vw");
      if("undefined" != typeof(intvw) && intvw){
        vw = intvw;
      }
      //当窗口宽度小于所设定宽度时，设置窗口宽度为渲染宽度。
      if (vw > doc.documentElement.clientWidth) {
        vw = doc.documentElement.clientWidth;
      }
    //当未传入参数时获取body宽度为渲染宽度。
    }else if ("undefined" != typeof(document.body.clientWidth)) {
      vw = document.body.clientWidth;
    }
    //将视图宽度20等分。
    font = vw / 20;
    //如果存在样式表则删除。
    if (sheet.cssRules.length) {
      if (sheet.deleteRule) {
        sheet.deleteRule(0);
      } else {
        sheet.removeRule(0);
      }
    }
    //设置根字体大小样式。
    if (sheet.insertRule) {
      sheet.insertRule("html { font-size: " + font + "px}", 0);
    } else if (sheet.addRule) {
      sheet.addRule("html", font + "px", 0);
    } else {
      //sheet.innerText="html { font-size: " + font + "px}";
    }
    return;
  }
  introot(win.document);
  //为加载完成事件和重置窗口大小事件绑定初始化根结点字体大小函数。
  if (win.addEventListener) {
    /*win.addEventListener("load", function() {
      introot(win.document);
    }, false);*/
    win.addEventListener("resize", function() {
      introot(win.document);
    }, false);
  }
})(window);