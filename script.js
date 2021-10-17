let vm = Vue.createApp({
    data() {
        return{
            message: "Main Message"
        }
    }

})

vm.component('taskbruwer-body',{
    template: "<h1>{{somedata}}</h1>",
    data(){
        return{
            somedata: "some data"
        }
    }
})

vm.mount('#app')