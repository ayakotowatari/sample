<template>
<v-app>
    <v-main>
        <v-container>
            <router-view
                :key="$route.path"
            ></router-view>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    data: function(){
        return {

            
        }
    },
    mounted(){
       
    },
    created(){
     
    },
    computed: {
       
    
    },
    methods: {
      
        
    }

}
</script>

<style>

</style>