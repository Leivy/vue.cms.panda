import Vue from "vue"
//导入一个可以将时间对象进行格式化的库
import fecha from "fecha"

Vue.filter("dateFormat", function(val, parttern="YYYY-MM-DD HH:mm:ss"){
    //在过滤器中直接借助第三方库对于时间个格式进行转换操作！
    val = val || "1970-01-01 00:00:00";
    return fecha.format(new Date(val), parttern)
})