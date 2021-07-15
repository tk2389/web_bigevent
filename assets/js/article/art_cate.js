$(function() {
	let layer = layui.layer
	let form = layui.form

	function initartcatelist() {
		$.ajax({
			type: "GET",
			url: "/my/article/cates",
			success: function(res) {
				let htmlstr = template('tpl-table', res)
				$('tbody').html(htmlstr);
			}
		});
	}
	initartcatelist()
	let index = null;
	$('#btnadd').on('click', function() {
		index = layer.open({
			title: '添加文章分类',
			type: 1,
			area: ['500px', '250px'],
			content: $('#dialog-add').html()
		});
	});

	$('body').on('submit', '#form-add', function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/my/article/addcates",
			data: $(this).serialize(),
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('新增文章分类失败')
				}
				initartcatelist()
				layer.close(index)
				layer.msg('新增文章分类成功')
			}
		});
	});

	let indexadd = null
	$('tbody').on('click', '#btn-edit', function() {
		indexadd = layer.open({
			title: '修改文章分类',
			type: 1,
			area: ['500px', '250px'],
			content: $('#dialog-edti').html()
		});

		let id = $(this).attr('data-id');
		$.ajax({
			method: "GET",
			url: `/my/article/cates/${id}`,
			success: function(res) {
				form.val('form-edti', res.data)
			}
		});

	});
	
	$('body').on('submit','#form-edti', function (e) {
		e.preventDefault();
		$.ajax({
			method: "POST",
			url: "/my/article/updatecate",
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('更新分类数据失败')
				}
				layer.close(indexadd)
				initartcatelist()
				layer.msg('更新分类数据成功')
			}
		});
	});
	
	$('body').on('click','#btn-del', function () {
		let id = $(this).attr('data-id')
		layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
		  $.ajax({
		  	method: "GET",
		  	url: `/my/article/deletecate/${id}`,
		  	success: function (res) {
		  		if (res.status !== 0) {
		  			return layer.msg('删除失败')
		  		}
				initartcatelist()
				layer.msg('删除成功')
				layer.close(index)
		  	}
		  });
		  layer.close(index);
		});
	});















})
