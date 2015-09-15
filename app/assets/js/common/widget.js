/**
组件规定必须在a标签上加上对应的ID名
使用实例
<div class="segmented-control" name="prodProperty">
  <a id="gotoImg" class="control-item active" tab="imgDetails">
    <div><span>图文详情</span></div>
  </a>
  <a id="gotoProd" class="control-item" tab="prodProperty">
    <div><span>产品参数</span></div>
  </a>
  <a id="gotoCom" class="control-item" tab="moreCommens">
    <div><span>评论（88）</span></div>
  </a>
</div>
<div class="card">
  <div class="card-list">
    <div id="imgDetails" class="control-content card-item active"></div>
    <div id="prodProperty" class="control-content card-item"></div>
    <div id="moreCommens" class="control-content card-item"></div>
  </div>
</div>
**/

(function(){
	var widget = {}

	widget.segmented = function(el){
		var getTarget = function (target) {
			var i;
			var segmentedControls = el.querySelectorAll('.segmented-control .control-item');

			for (; target && target !== el; target = target.parentNode) {
				for (i = segmentedControls.length; i--;) {
					if (segmentedControls[i] === target) {
						return target;
					}
				}
			}
		};

		el.addEventListener('touchend', function (e) {
			var activeTab;
			var activeBodies;
			var targetBody;
			var targetTab     = getTarget(e.target);
			var className     = 'active';
			var classSelector = '.' + className;

			if (!targetTab) {
				return;
			}

			activeTab = targetTab.parentNode.querySelector(classSelector);

			if (activeTab) {
				activeTab.classList.remove(className);
			}

			targetTab.classList.add(className);
			if (!targetTab.getAttribute('tab')) {
				return;
			}
			targetBody = el.querySelector("#"+targetTab.getAttribute('tab'));
			if (!targetBody) {
				return;
			}

			activeBodies = targetBody.parentNode.querySelectorAll(classSelector);

			for (var i = 0; i < activeBodies.length; i++) {
				activeBodies[i].classList.remove(className);
			}

			targetBody.classList.add(className);
		});

		// el.addEventListener('click', function (e) { 
		// 	if (getTarget(e.target)) {
		// 		e.preventDefault();
		// 	} 
		// });
	}
	window.RatchetWidget = widget;

})();
/*===========================
AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.RatchetWidget;
}
else if (typeof define === 'function' && define.amd) {
    define(function () {
        return window.RatchetWidget;
    });
}