<ul>
<% map.list.forEach(function(val, index){ %>
	<li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="<%=val.picUrl%>" />
      <div class="media-body">
        <h4><%= val.title %></h4>
        <p>
        	<strong>￥<%= val.displayPrice %></strong> 
        	<del>40.00</del>
        </p>
        <p>
        	<span>已售 <%= val.saleVolume %> 件</span>
        	<span>评论 120</span>
        </p>
      </div>
    </a>
  </li>
<% }) %>
</ul>