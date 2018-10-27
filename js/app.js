(function (window, Vue) {
	
	new Vue({
		el: "#app",
		data: {
			// list: arr,
			list: JSON.parse(window.localStorage.getItem('list')) || [],
			newTodo:''
		},
		methods: {
			addTodo:function(){
				if(!this.newTodo.trim())return;
				console.log(111)
				var val = {
					content:this.newTodo.trim(),
					isFinish:false,
					id:this.list.length ? this.list.sort((a, b)=>a.id-b.id)[this.list.length-1].id +1 : 1
					}
				this.list.push(val);
				this.newTodo=""
			},
			delTodo (index) {
				this.list.splice(index, 1)
			},
			delAll () {
				this.list= this.list.filter(item => !item.isFinish)
			}
		},
		directives:{
			focus:{
				inserted(el){
					el.focus();
				}
			}
		},
		watch: {
			list:{
				handler (newArr) {
					// 监听到了数组的变化
					// 存储到 localStorage 里面
					window.localStorage.setItem('list', JSON.stringify(newArr))
				},
				deep: true
			}
		},
		computed: {
			activeNum() {
				return this.list.filter(item => !item.isFinish).length
			},
			toggleAll: {
				get () {
					return this.list.every(item => item.isFinish)
				},
				set(val) {
					this.dataList.forEach(item => item.isFinish = val)
				}			
			}
		}
	})

	

})(window,Vue);
