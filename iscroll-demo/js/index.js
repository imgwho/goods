window.onload = function(){
  var myScroll = new IScroll('.iscroll',{
    mouseWheel: true,
    scrollbars: false,
   scrollX: true,
				scrollY: false,
    snap: 'div>.c'
  });
  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

/*$(function(){
  var myScroll = new IScroll('.iscroll',{
    mouseWheel: true,
    scrollbars: true,
    fadeScrollbars: false,   // hide scrollbar when not in use
    interactiveScrollbars: true,  //The scrollbar becomes draggable and user can interact with it
    shrinkScrollbars: 'scale'  //When scrolling outside of the boundaries the scrollbar is shrunk by a small amount.  Valid values are: 'clip' and 'scale'.
  });
  
  $(document).on('touchmove',function(e){
    e.preventDefault();
  });

  $('.header').click(function(){
    // scroll element '.main p:nth-child(5)' to the center of vertical
    myScroll.scrollToElement('.main p:nth-child(5)',null,null,true);  
  });
});*/