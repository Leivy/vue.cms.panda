import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);

export default new Vuex.Store({
    //数据
    state: {
        carts: []
    },
    //
    mutations:{
        addToCart(state, goods){

            // console.log(goods);
            //cart的数据格式 {id: 18, count: 1}

            //先去localStorage中获取之前存储好的购物车信息
            var carts = localStorage.getItem("carts");
            carts = carts ? JSON.parse(carts) : [];

            //遍历获取到的购物车数组，判断是否有和当前加进来的商品id相同的购物车数据
            

            var isExsit = false;
            carts.forEach(v=>{
                //如果有，就将count合并，
                if(v.id == goods.id){
                    v.count += goods.count;
                    isExsit = true;
                }
            })

            //如果没有就将新的购物车数据push数组中
            if(!isExsit){
                carts.push(goods);
            }

            //将购物车数组数据重新存入到localstorage去
            localStorage.setItem("carts",JSON.stringify(carts));

            //将vuex中的数据和localStorage中的数据进行同步！！
            state.carts = carts;


            
        },
        minusCount(state, id){
            state.carts.forEach(v=>{
                if(v.id == id ){
                    v.count --;
                }
            })

            localStorage.setItem("carts",JSON.stringify(state.carts));
        },
        addCount(state, id){
            state.carts.forEach(v=>{
                if(v.id == id ){
                    v.count ++;
                }
            })
            localStorage.setItem("carts",JSON.stringify(state.carts));            
        },
        del(state, id){
            var index = state.carts.findIndex(v => {
                return v.id == id;
            })

            state.carts.splice(index, 1);
            localStorage.setItem("carts",JSON.stringify(state.carts));                        
        }
    },
    getters: {
        cartsTotalCount: state => {
            var carts = localStorage.getItem("carts");
            state.carts = carts ? JSON.parse(carts) : [];

            var result = 0;
            state.carts.forEach(v => {
                    result += v.count;
            })
            return result;
        },
        //counts就是一个对象， 将购物车数组中所有的id作为键，将id对应的count作为值
        //存在了counts数组中
        counts:state=>{
            var obj = {};
            state.carts.forEach(v=>{
                obj[v.id] = v.count;
            })
            return obj;
        }
    }

});