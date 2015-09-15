<div class="swiper-wrapper">
<% for(var i=0; i<imgList.length; i++){%>
	<div class="swiper-slide">
		<img src="<%= imgList[i] %>">
	</div>
<%}%>
</div>
<!-- If we need pagination -->
<div class="swiper-pagination"></div>