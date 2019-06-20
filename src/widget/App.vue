<template>
  <div>
      <Button type="primary">{{ btnName }}</Button>
  </div>
</template>

<script>
import {Button} from "iview";
    export default {
        props:{
            widgetID:String
        },
        components:{
            Button
        },
        data() {
            return {
                btnName: "default",
            }
        },
        mounted() {
            let vm = this;
            console.log('Vue mounted!');

            // The mendix init data to vue
            this.$parent.$on('widget-loaded', data => {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        vm[key]=element;
                    }
                }
            });

            // The mendix contextobj is change will call this
            this.$parent.$on("widget-change",data=>{

            });
        }
    }
</script>

<style lang="css" scoped>
    /**
     * You can change the "lang" to use sass, scss, or even more.
     */
</style>