<img class="media-object pull-left" src="http://placehold.it/42x42">
<div class="media-body">
	<h6>
		<span><%= nickName %></span>
		<span><%= buyTime() %></span>
	</h6>
	<p>
		<span class="icon icon-star"></span>
		<span class="icon icon-star"></span>
		<span class="icon icon-star"></span>
		<span class="icon icon-star"></span>
		<span class="icon icon-star"></span>
	</p>
</div>
<div>
	<p><%= description %></p>
</div>
<div>
	<% _.each(entityPicUrl, function(data, index){ %>
		<img src="<%= 'http://placehold.it/42x42' %>">
	<%})%>
</div>
<div>
	<p>
		<span><%= skuInfo() %></span>
	</p>
</div>
<div>
	<p>购买时间：<%= orderTime() %></p>
</div>