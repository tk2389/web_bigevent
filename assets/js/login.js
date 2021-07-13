$(function() {
	// 点击“去注册账号”的链接
	$('#link_reg').on('click', function() {
		$('.login-box').hide();
		$('.reg-box').show();
	});

	// 点击“去登陆”的链接
	$('#link_login').on('click', function() {
		$('.reg-box').hide();
		$('.login-box').show();
	});

	// 从 layui 中获取form对象

	let form = layui.form
	let layer = layui.layer

	// 通过 form.verify() 函数自定义校验规则
	form.verify({

		// 自定义了一个叫pwd的校验规则
		pwd: [
			/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
		],
		//校验两次密码是否一致的规则
		repwd:function(value) {
			//通过形参拿到的的确认密码框的内容
			// 还需拿到密码框中的内容
			//然后进行一次等于判断
			//如果判断失败，则return一个提示消息
			let pwd = $('.reg-box [name=password]').val()
			if (pwd !== value) {
				return '两次密码不一致'
			}
			
		}
	})
	
	//监听注册表单的提交事件
	$('#form-reg').on('submit', function (e) {
		e.preventDefault()
		let data = {username:$('#form-reg [name=username]').val(),
		password:$('#form-reg [name=password]').val()
		}
		$.post("/api/reguser", data ,
			function (res) {
				if (res.status !== 0) {
					return layer.msg(res.message);
;
				}
				layer.msg('注册成功请登录');
				// 注册成功完延迟三秒点击去登陆
				setTimeout(function() {
					$('#link_login').click()
				},3000)
			},
		);
	});
	
	//监听登录表单的提交事件
	$('#form-login').submit(function (e) { 
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/api/login",
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('登陆失败')
				}
				layer.msg('登陆成功')
				//登录成功之后将得到的 token 字符串保存到 本地存储
				localStorage.setItem('token',res.token)
				// 登陆成功之后跳转到后台主页
				location.href = 'index.html'
				
			}
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


})
