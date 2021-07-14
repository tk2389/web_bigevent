$(function() {
	let form = layui.form
	let layer = layui.layer
	form.verify({
		nickname: function(value) {
			if (value.length > 6) {
				return '昵称长度必须在1~6个字符之间'
			}
		}
	})
	
	// 初始化用户的基本信息
	function inituserinfo() {
		$.ajax({
			type: "GET",
			url: "/my/userinfo",
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('获取用户信息失败')
				}
				//调用 `form.val()` 方法为表单赋值
				form.val('formuserinfo',res.data)
			}
		});
	}
	inituserinfo()
	
	$('#btnreset').on('click', function (e) {
		e.preventDefault();
		inituserinfo()
	});
	
	$('.layui-form').on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/my/userinfo",
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('修改用户信息失败')
				}
				layer.msg('修改用户信息成功')
				window.parent.getuserinfo()
			}
		});
	});
})