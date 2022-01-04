<template>

  <q-page v-model="page" class=" column" style="">




    <div class="row q-pa-sm " style="min-width: 70%; width: 100%;">
      <q-btn @click="dialog = true ,  getCodBar(newBarCode)" name="add" round filled  flat  size="lg" icon="add" class="bg-accent q-mr-md " />
      <q-input
      v-model="newBarCode"
      @keyup.enter="  dialog = true  , getCodBar(newBarCode)"
      class="col"
      round
      filled
      autofocus
      bg-color="deep-purple-1"
      placeholder="SCAN"


      >


        <template v-slot:append>
          
        </template>
        
      </q-input>

      
          <q-btn  @click.stop=" conditionDelete ? deleteItems() : pass "  round filled  flat  size="lg" class=" bg-grey-5 q-ml-md"  > <q-icon id="deleteBtn" name="delete"   > </q-icon> </q-btn>
    </div>

    
       <!-- content -->


      <!-- Menu Popup -->
      <div class="" v-if="! codeBarExistCondition" >

          <q-dialog v-model="dialog" style="height: 80%; margin-top: 5%;" class="bg-grey-3"  >

              <div  style="max-width:100vw; width : 80vw; height: 80%; padding-left: 15% ; margin : 0% ">
              <q-btn v-for="cat in categoryProdList" id=btn-cat stack glossy name=cat.name  color="deep-purple-10" @click=" dialog2 = true  ,  dialog2List(cat)  " style="width: 25% ; height:0 ; padding-bottom: 25%; ; font-size: 1.2vh ; margin:2%; " > <q-icon name="search" style="position: absolute; top:5% ; " ></q-icon> <div style="position: absolute; bottom:5% ; word-wrap: break-word "> {{cat.name}} </div> </q-btn>
              </div>
          </q-dialog>

          <q-dialog v-model="dialog2" style="height: 80%; margin-top: 5%;" class=""  >

            <div  style="max-width:100vw; width : 60vw; height: 50%; padding-left: 15% ; margin : 0% ">
            <q-btn v-for="prod in categoryProdListSelected" id=btn-prod stack glossy name=prod  color="deep-purple-10" @click="dialog3List(prod) ; dialog3 = true  " style="width: 25% ; height:0 ; padding-bottom: 25%; ; font-size: 1.2vh ; margin:2%; " > <q-icon name="search" style="position: absolute; top:5% ; " ></q-icon> <div style="position: absolute; bottom:5% ; word-wrap: break-word "> {{prod}} </div> </q-btn>
            </div>
        </q-dialog>


        <q-dialog v-model="dialog3" style="height: 80%; margin-top: 5%;" class=""  >

          <div  style="max-width:100vw; width : 60vw; height: 50%; padding-left: 15% ; margin : 0% ">

            <q-input
            v-model="itemNombre"

            class="col"
            id="itemNombreId"
            round
            filled
            bg-color="white"
            placeholder="nombre d'articles "
            dense
            type="selector" />

            <q-btn class="bg-accent" type="submit" style=" color: white;"    @click= " itemNombre ? (dialog4nbr(itemNombre) , dialog = false , dialog2 = false ,  dialog3 = false ) :  alertMessage(),  codeBarExistCondition ? pass : addItem()  "  > Ajouter la quantité </q-btn>
















          </div>
          </q-dialog>









































        </div>

      <!-- Menu Popup End -->
     


      <div v-if="!items.length" class="no-items absolute-center">
        <q-icon
        name="check"
        size="100px"
        color="primary"/>

        <div class="text-h5 text-primary text-center">
          No items  </div>


     </div>


     <div class="bg-accent" style="width: 100%;" >

      
      <q-table
      title="Produits"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      style="margin-top: 0; "
      
      >

      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

    

    <template v-slot:header-selection="scope">
      <q-toggle v-model="scope.selected"  @click= "  selectedItemFun(selected) " />
    </template>

    <template v-slot:body-selection="scope">
      <q-toggle v-model="scope.selected"  @click= "  selectedItemFun(selected) " />
      
    </template>
      
    </q-table>
    <!-- <div > {{ JSON.stringify(selected)}}  </div> --> 
    
    </div>

    
        



  </q-page>


</template>



<script>

import Localbase from 'localbase'
import { ref } from 'vue'
import { setCssVar ,exportFile, useQuasar } from 'quasar'



let  db = new Localbase('db')

export default {
  

  setup () {
    
        return {
          dialog: ref(false),
          dialog2: ref(false),
          dialog3: ref(false),
          barrProgress:ref(false),
          selected: ref([]),
          columns,
          rows

          


        }
      },

  data() {



    return {
      codeBarExistCondition:false,

      selectedItemId:[],
      conditionDelete:false,

      dictItem:{},

      categoryProdListSelected : [],
      categorySelected:"",
      itemNombre:"",
      barrProgressList:{codBar:"",categorie:"", produit:"",nombre:""},

      newBarCode: '',
      items : [],
      categoryProdList :[
        {
          name:"categorie1",
          produit:["cat1_produit1","cat1_produit2","cat1_produit3","cat1_produit4","cat1_produit5"]


        },
        {
          name:"categorie2",
          produit:["cat2_produit1","cat2_produit2","cat2_produit3","cat2_produit4","cat2_produit5"]

        },
        {
          name:"categorie3",
          produit:["cat3_produit1","cat3_produit2","cat3_produit3","cat3_produit4","cat3_produit5"]

        },
        {
          name:"categorie4",
          produit:["cat4_produit1","cat4_produit2","cat4_produit3","cat4_produit4","cat4_produit5"]

        },
        {
          name:"categorie5",
          produit:["cat5_produit1","cat5_produit2","cat5_produit3","cat5_produit4","cat5_produit5"]

        },
        {
          name:"categorie6",
          produit:["cat6_produit1","cat6_produit2","cat6_produit3","cat6_produit4","cat6_produit5"]

        },
        {
          name:"categorie7",
          produit:["cat7_produit1","cat7_produit2","cat7_produit3","cat7_produit4","cat7_produit5"]

        },
        {
          name:"categorie8",
          produit:["cat8_produit1","cat8_produit2","cat8_produit3","cat8_produit4","cat8_produit5"]

        },
        {
          name:"categorie9",
          produit:["cat9_produit1","cat9_produit2","cat9_produit3","cat9_produit4","cat9_produit5"]

        },
        {
          name:"categorie10",
          produit:["cat10_produit1","cat10_produit2","cat10_produit3","cat10_produit4","cat10_produit5"]

        },
        {
          name:"categorie11",
          produit:["cat11_produit1","cat11_produit2","cat11_produit3","cat11_produit4","cat11_produit5"]

        },
        {
          name:"categorie12",
          produit:["cat12_produit1","cat12_produit2","cat12_produit3","cat12_produit4","cat12_produit5"]

        }

      ]

    }
  },

  methods: {

    

    

    



    exportTable () {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          this.rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      },
          


    sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
},

    

    selectedItemFun(message){
      if( message.length >  0 ){ this.conditionDelete =true ; var element = document.getElementById("deleteBtn"); element.style.color = '#ff0000'}
      else{this.conditionDelete =false ; var element = document.getElementById("deleteBtn"); element.style.color = '#808080'}
      

      this.selectedItemId=[]

      for (let pas = 0; pas < message.length; pas++) {
        console.log("voici le pas  : " , pas)
        console.log(message[pas])
        this.selectedItemId.push(message[pas].id)

      }

      console.log("voici les ID selectionnés : " , this.selectedItemId )
      


      
      
    },
    deleteItems(){
      this.$q.dialog({
        
        message: ' Supprimer les articles selctionnés ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        
        for (let pas = 0; pas < this.selectedItemId.length; pas++) {
        console.log(" item N° " , pas , "à supprimer ID N° : " , this.selectedItemId[pas])
        

        db.collection('items').doc({ itemId: this.selectedItemId[pas] }).delete()
        

        }


        console.log(" ces ID ont été suprrimé : " , this.selectedItemId )
        this.$q.notify({
          type: 'negative',
          message: ' éléments selectionnés supprimés '
        })

        setTimeout(() => {  this.refresh();  }, 2000)
        
        
      })

    },




    alertMessage(){

      this.$q.notify({
          type: 'negative',
          message: 'svp, ajouter la quantité '
        })




    },

    getCodBar(codBar){

      this.barrProgressList.codBar = codBar,
      console.log(" le code-barre  est : " + this.barrProgressList.codBar)

      console.log("progress bar ==> " , "==> code-barre",
      this.barrProgressList.codBar
      )

      
      
      this.codeBarExist(codBar)
      

    

      

     

    },

    codeBarExist(codBar){

      console.log(" on va chercher le : ", codBar )

      var codeBarrAll= [];

      db.collection('items').get()
      
      .then(items => {
        console.log(' taille 1 ',items.length), 
        
        this.codeBarrAll = items.BarCode
        items.forEach( function(item){
          console.log(item.BarCode) ;
          codeBarrAll.push(item.BarCode);

        }

        
        )

        console.log("c'est ça ", codeBarrAll)
        console.log(codeBarrAll.includes(codBar))


        this.codeBarExistCondition = codeBarrAll.includes(codBar)

        if(this.codeBarExistCondition){console.log(" l'article existe donc on le duplique  ") , this.dupliquerITem(codBar);}else{console.log( " l'article n'existe pas donc il faut le créer ");}
        

        return console.log("finish !",this.codeBarExistCondition)
        
        

        
      
      })

      


    },




    dialog2List ( cat ) {

      this.categorySelected = cat.name ,
      console.log("la categorie choisie est : " + this.categorySelected),
      console.log(" il y a : " + cat.produit.length + " produits : "),

      this.categoryProdListSelected = cat.produit
      console.log("voici les produits selectés " + this.categoryProdListSelected)
      this.barrProgressList.categorie=this.categorySelected
      console.log("progress bar ==> " , " code-barre",
      this.barrProgressList.codBar ,  "==>catégorie : " ,
      this.barrProgressList.categorie ,
      )
    },

    dialog3List (prod){





      console.log(" le produit choisi est : " , prod),



      this.barrProgressList.produit=prod
      console.log("progress bar ==> " , "code-barre",
      this.barrProgressList.codBar ,  " ==> catégorie : " ,
      this.barrProgressList.categorie , " ==> produit : ",
      this.barrProgressList.produit ,
      )

    },

    dialog4nbr(nbr){

      

      this.barrProgressList.nombre = nbr,

      console.log("progress bar ==> " , " code-barre",
      this.barrProgressList.codBar ,  "==> catégorie : " ,
      this.barrProgressList.categorie , " ==> produit : ",
      this.barrProgressList.produit , " ==> nombre : ",
      this.barrProgressList.nombre ,
      ),

      this.itemNombre=""

    },



    toggleDone(BarCode){
      let task = this.items.find(task => task.BarCode === BarCode)

      db.collection('items').doc({BarCode: BarCode}).update({
        done: !task.done
      })

      task.done = !task.done

    },

    dupliquerITem(codb){
      
      var idTemp=0 
      var tailletemp=0
      var dictTemp ={}

      
      console.log( "oui il faut dupliquer le code barre : ", codb )




        db.collection('items').get().then(items => {

          console.log("la taille de la BD ",items.length),
          this.tailletemp = items.length, 
           console.log("voici la taille de tous " , this.tailletemp)


          if ( this.tailletemp  != 0 ){

            db.collection('items').orderBy('itemId', 'desc').limit(1).get().then(items => {
            console.log(items[0].itemId),
            this.idTemp = items[0].itemId,
            console.log(" voici l'id 0 " , this.idTemp),
            console.log("voici la taille et l'id : ", this.tailletemp ," et " , this.idTemp),

            console.log(" maintenant on peut créer une nouvelle  ") 

            console.log(" voici ce qu'on va remplir : " , dictTemp )


            db.collection('items').doc({BarCode: codb}).get().then(items => {dictTemp=items ,console.log("voici avec quoi on va le remplir" , items , "pour devenir " ,dictTemp,
            console.log("ensuite l'ajouter  !! " ),
            db.collection('items').add({
              itemId : this.idTemp + 1 ,
              BarCode: codb,
              categoryProd : items.categoryProd,
              produit:items.produit,
              number:1,
              done:false,
              
            })
            
            
            )})
            
            


            
            
        

          }) 
          }
          
          


          
          
          
          
        }) 


        this.$q.notify({
          type: 'positive',
          message: ' éléments ajoutés  '
        })
      setTimeout(() => {  this.refresh();  }, 500)


      

      



      

      


  
  
  },


    

    addItem(){

      const idTemp=0 
      const  tailletemp = 0

      
      
      

      db.collection('items').get().then(items => {

      console.log("la taille de la BD ",items.length),
      this.tailletemp = items.length

      console.log("voici la taille de tous " , this.tailletemp)
      
      }) 
      



      
    
        if ( this.tailletemp  != 0 ){

        


        
        db.collection('items').orderBy('itemId', 'desc').limit(1).get().then(items => {
            console.log(items[0].itemId  )
            this.idTemp = items[0].itemId
            console.log(" voici l'id 0 " , this.idTemp);
           
            
          }) 
          


        } 

          
          
          setTimeout(() => { ;  }, 500)
    
      
      

      console.log(" voici l'id 1 " , this.idTemp);

      
        

      
       
      setTimeout(() => {  

        
        
       


        if ( this.tailletemp  > 0 ){
          console.log("la taille est sup à 0 ");
          console.log(" voici l'id 2 " , this.idTemp);
          this.idTemp = this.idTemp +  1 ;
      } else{ 
        console.log("la taille est inf  à 0 ") ;
         this.idTemp = 0 ;}

      db.collection('items').add({
        
        itemId : this.idTemp,
        BarCode: this.barrProgressList.codBar,
        categoryProd : this.barrProgressList.categorie,
        produit:this.barrProgressList.produit,
        number:this.barrProgressList.nombre,
        done:false,
      })

      console.log( "l'item ID : ", this.idTemp , "a été ajouté ")
      ;  }, 500)

      

     
      
      this.$q.notify({
          type: 'positive',
          message: ' éléments ajoutés  '
        })
      setTimeout(() => {  this.refresh();  }, 500)
      
    },
    getitems(){
      db.collection('items').get().then(items => {
        this.items=items,
        console.log('items: ', items.length)

        

      })
      
      
      
      },
      refresh(){
        location.reload();

      },
      
      remplirtab(){

       
        

        db.collection('items').get().then(items => {
        this.items=items,
        console.log('voici: ', items.lenght)

        

     

        this.rows=[]

        console.log('Voici: ',this.items[0])
        
        for (let pas = 0; pas < this.items.length; pas++) {
  
          
          console.log('voici le step' + pas );
          db.collection('items').orderBy('itemId', 'desc').limit(1).get().then(items => {
            console.log('voici autre chose items: ', items[0].itemId)
          })
          

          this.dictItem = {
          produit: this.items[pas].produit,
          categorie: this.items[pas].categoryProd,
          
          quantité: this.items[pas].number,
          codebarre: this.items[pas].BarCode,
          id :  this.items[pas].itemId,
        }

        this.rows.push(this.dictItem)

      }

        
        

      })


      }

  },

  

  beforeMount(){
    
    
    this.remplirtab(),
    this.getitems()
   
    
    
 }


  



}


const columns = [
  { name: 'produit', 
  align: 'center', 
  label: 'produit', 
  field: 'produit',
  format: val => `${val}`,
  sortable: true },
  { name: 'categorie', align: 'center', label: 'categorie', field: 'categorie', sortable: true },
  { name: 'quantité', label: 'quantité', field: 'quantité', sortable: true },
  { name: 'code-barre', label: 'code-barre', field: 'codebarre', sortable: true  },
  //{ name: 'sodium', label: 'Sodium (mg)', field: 'sodium', sortable: true  },
  //{ name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  //{ name: 'id', label: 'id', field: 'id', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows =[ ]

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}





</script>

<style lang="sass">
.done
  .q-item__label
    text-decoration : line-through
    color : #bbb

.no-items
  opacity: 0.5

</style>