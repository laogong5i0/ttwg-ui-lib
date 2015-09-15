<div class="sku-body">
	<div class="close"><span class="icon icon-close dark-grey"></span></div>
	<div class="sku-row header">
		<div class="img">
			<img src="http://placehold.it/40x40">
		</div>
		<div class="body">
			<h6><%= title %></h6>
			<div>
				<ins class="red">￥<%= displayPrice %></ins>
	  			<del><%= costPrice %>元</del>
			</div>
		</div>
	</div>
	<div class="sku-row">
		颜色规格
	</div>
	<div class="sku-row clearfix">
		<div class="pull-left">购买数量</div>
		<div class="pull-right buy-num">
			<div id="skuDecrease" class="sign-decrease">-</div>
			<div class="num-display">1</div>
			<div id="skuPlus" class="sign-plus">+</div>
		</div>
	</div>
	<div class="sku-row">
		<div>商品总额</div>
		<div>￥80.00</div>
	</div>
	<nav class="bar bar-tab">
		<a id="car-entrance" class="tab-item b-orange" href="#">加入购物车</a>
		<a class="tab-item b-red" href="#">立即购买</a>
	</nav>
</div>