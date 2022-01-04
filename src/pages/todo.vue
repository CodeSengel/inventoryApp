<template>
  
  <q-page class="bg-grey-3 column">
    
    
   
    
    <div class="row q-pa-sm bg-primary">
      <q-input
      v-model="newTask"
      @keyup.enter="addTask"
      class="col"
      round
      filled
      bg-color="white" 
      placeholder="Add task"
      
      dense>
       

        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input> 
    </div>
    <!-- content -->
    <q-list 
    separator 
    bordered
    class="bg-white">
      

      <q-item v-for="(task, index) in tasks" 
        :key="task.title"
        @click="toggleDone(task.title)"
        :class="{'done bg-pink-2' : task.done}"
        clickable
        v-ripple>
        <q-item-section avatar>
          
          <q-checkbox 
          v-model="task.done"  
          class="no-pointer-event"
          color="primary" />
          
          
        </q-item-section>
        
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.done" side>
          <q-btn @click.stop="deleteTask(task.title)" round dense color="primary" icon="delete" />
        </q-item-section>



      </q-item>

      
     
    </q-list>

    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon 
      name="check"
      size="100px"
      color="primary"/>
      <div class="text-h5 text-primary text-center">
        No tasks 
      </div>

    </div>
  </q-page>
</template>

<script>

import Localbase from 'localbase'

let  db = new Localbase('db')














export default {
  
  data() {
    return {
      newTask: '',
      tasks : [
        
      ]

    }
  },

  methods: {

    toggleDone(title){
      let task = this.tasks.find(task => task.title === title)

      db.collection('tasks').doc({title: title}).update({
        done: !task.done
      })
      
      task.done = !task.done

    },


    deleteTask(title){
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        let index = this.tasks.findIndex(task => task.title === title)

        
        

        db.collection('tasks').doc({title: title}).delete()
        this.tasks.splice(index,1)
        this.$q.notify('Task deleted')
      })
  
    },

    addTask(){

      db.collection('tasks').add({
        title: this.newTask,
        done:false,
      })
      
      this.tasks.push({
        title: this.newTask,
        done:false,
      })
      
      this.newTask="",
      this.$q.notify('Task added')
    },
    getTasks(){
      db.collection('tasks').get().then(tasks => {
        this.tasks=tasks,
        console.log('tasks: ', tasks.length)
      })
    }

  },

  beforeMount(){
    this.getTasks()
 },
 
}


</script>

<style lang="sass">
.done
  .q-item__label
    text-decoration : line-through
    color : #bbb

.no-tasks
  opacity: 0.5

</style>