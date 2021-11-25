<template>
	<view class="wrap">
		<view class="content">
			<view class="title">用户注册</view>
			<input class="u-border-bottom" type="text" v-model="name" placeholder="请输入昵称" />
			<input class="u-border-bottom" type="text" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="passwords_confirmation" placeholder="请确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				passwords_confirmation: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if(this.name && this.$u.test.email(this.email) && this.password && this.passwords_confirmation) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['primary'];
				}
				return style;
			}
		},
		methods: {
			async submit(){
				// 表单验证
				if(!this.name || !this.$u.test.email(this.email) || !this.password || !this.passwords_confirmation === this.password) return
				
				// 提交准备参数
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					passwords_confirmation: this.passwords_confirmation
				}
				// 请求API执行注册
				const registerRes = this.$u.api.authRegister(params)
				// console.log(registerRes);
				this.$u.toast('注册成功')
				// 注册成功后，重定向到登录(redirect)
				const backUrl = uni.getStorageSync('back_url') || 'pages/auth/login'
				setTimeout(() => {
					this.$u.route({
						type: 'redirect',
						url: backUrl
					})
				},1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
.u-border-bottom{
	margin-bottom: 40rpx !important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(173, 201, 253);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
