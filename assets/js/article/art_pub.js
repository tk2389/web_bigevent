$(function() {


	let layer = layui.layer
	let form = layui.form

	// 初始化富文本编辑器
	initEditor()

	initcate()

	function initcate() {
		$.ajax({
			method: "GET",
			url: "/my/article/cates",
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('获取文章分类失败')
				}
				let htmlstr = template('tpl-cate', res)
				$('#cate').html(htmlstr);
				form.render()
			}
		});
	}

	// 1. 初始化图片裁剪器
	var $image = $('#image')

	// 2. 裁剪选项
	var options = {
		aspectRatio: 400 / 280,
		preview: '.img-preview'
	}

	// 3. 初始化裁剪区域
	$image.cropper(options)


	$('#btnimage').on('click', function() {
		$('#coverfile').click()
	});

	$('#coverfile').change(function(e) {
		let files = e.target.files
		if (files.length === 0) {
			return
		}
		var newImgURL = URL.createObjectURL(files[0])

		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', newImgURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域

	});


	let art_state = '已发布'

	$('#caogao').on('click', function() {
		art_state = '草稿'
	});

	// 位表单绑定提交事件
	$('#form-pub').on('submit', function(e) {
		// e.preventDefault();

		let fd = new FormData($(this)[0])
		fd.append('state', art_state)

		$image
			.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
				width: 400,
				height: 280
			})
			.toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
				// 得到文件对象后，进行后续的操作
				fd.append('cover_img', blob)
			})
			
		publisharticle(fd)

	});

	// 定义一个发布文章的的方法
	function publisharticle(fd) {
		$.ajax({
			method: "POST",
			url: "/my/article/add",
			data: fd,
			contentType: false,
			processData: false,
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('发布失败')
				}
				layer.msg('发布成功')
				location.href = '../../../article/art_list.html'
			}
		});
	}


})
