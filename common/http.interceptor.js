// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.shop.eduwork.cn', // 请求的本域名
		// method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		// header: {
		// 	'content-type': 'application/json;charset=UTF-8'
		// },
	});
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		config.header.Authorization = "Bearer " + vm.vuex_token
		// 最后需要将config进行return
		return config;
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 响应状态码
		const {statusCode, data} = res
		
		if(statusCode < 400) {
			
			return data;
		} else if(statusCode == 400) {
			// 400错误的请求
			vm.$u.toast(data.message);
			return false;
		} else if(statusCode == 401) {
			// 401的情况有两种，一种是认证未通过；一种是token已失效
			if(data.message == 'Unauthorized') {
				vm.$u.toast('账号密码错误，请重新登录');
			} else {
				// 如果请求了登录的API，就跳转到登录页面
				vm.$u.utils.isLogin()
			}
			
			return false;
		} else if(statusCode == 422) {
			// 422表单验证未通过
			const {errors} = data
			vm.$u.toast(Object.values(errors)[0][0]);
			
			return false;
		} else {
			return false;
		}
		
	}
	
	// patch请求
	vm.$u.patch = (url, params = {}, header = {}) => {
		// 模拟patch请求
		const _params = {
			...params,
			_method: 'PATCH'
		}
		return vm.$u.post(url, _params, header)
	}
}

export default {
	install
}