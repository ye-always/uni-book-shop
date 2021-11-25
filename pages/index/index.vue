<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="slides" name="img_url"></u-swiper>
		<!-- 内容头部 -->
		<view class="u-text-center u-m-t-10">
			<u-tabs :list="sortList" bar-width="100" item-width="160" :is-scroll="false" :current="currentSort" @change="changeSort"></u-tabs>
		</view>
		<!-- 内容主题 -->
		<u-row gutter="16"  class="u-skeleton">
			<u-col span="6" v-for="goods in goodsList.length != 0 ? goodsList : [{},{},{},{}]">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>
		<!--骨架屏-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [
					{name: '默认'},
					{name: '销量'},
					{name: '推荐'},
					{name: '最新'}
				],
				currentSort: 0,
				slides: [],
				goodsList: [],
				page: 1,
				loading: false
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			changeSort(index){
				this.currentSort = index
				// 重置商品数据和分页
				this.goodsList = []
				this.page = 1
				this.getData()
			},
			// 获取数据
			async getData() {
				this.loading = true // 显示骨架屏
				
				const params = {page: this.page}
				// 增加排序条件
				if(this.currentSort == 1) params.sales = 1
				if(this.currentSort == 2) params.recommend = 1
				if(this.currentSort == 3) params.new = 1
				
				const res = await this.$u.api.index(params)
				this.loading = false // 隐藏骨架屏
				this.slides = res.slides
				// 处理加载更多数据
				this.goodsList = [...this.goodsList, ...res.goods.data]
			}
		},
		onReachBottom() {
			// 重新请求数据，带上分页参数
			this.page = this.page + 1
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
