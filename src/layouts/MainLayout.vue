<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="height :20%">

      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />        
      </q-toolbar>

      <div class="q-px-lg ">
        <div class="text-h5"> My universe </div>
        <div class="text-subtitle"> {{ todaysDate }} </div>
      </div>

      <q-img 
      src="images/rick.jpg"
      class="header-image absolute-top"/>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 300px); margin-top: 300px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple to="/homes">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            
            <q-item 
              clickable 
              v-ripple 
              to="/todo">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-ripple 
              to="/inventory">
              <q-item-section avatar>
                <q-icon name="fas fa-boxes" />
                
              </q-item-section>

              <q-item-section>
                Inventory
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/help">
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="images/city.jpg" style="height: 300px ; opacity : 0.8 ; z-index: -1;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="150px" class="q-mb-xl q-ml-xl">
              <img src="images/morty.jpg">
            </q-avatar>
            <div class="text-weight-bold" > Rick Sanchez</div>
            <div>rick.sanchez68@bla.con</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>


<script >


import { date } from 'quasar'





    
 



export default {

  name: 'MainLayout',
  
    
    
    data(){

      return{
        drawer : false
      }
    },
    
  computed: {
    todaysDate(){
      
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  }
}








</script>


<style lang="css">



.header-image{
  height: 100%;
  z-index: -1;
  opacity : 0.6;
  filter: grayscale(60%);
}


</style>
