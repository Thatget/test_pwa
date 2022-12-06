<template>
    <div class="flex m-10">
      <draggable class="dragArea list-group w-full" :list="list" @change="changePosition">
        <div
          class="list-group-item bgr-primary m-1 p-3 d-flex justify-content-between align-items-center rounded-md text-center"
          style="cursor: move"
          v-for="(element, index) in list"
          :key="element.name"
          @dragleave="dragFaq(index)"
          >
          <i class="fas fa-grip-vertical"></i>
          {{ element.name }}{{index}} 
        </div>
        {{list}}
      </draggable>
    </div>
  </template>
  <script>
    import { defineComponent } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'
    import { ref  } from 'vue';

    export default defineComponent({
      components: {
        draggable: VueDraggableNext,
      },
      setup(){
        const aaa = ref()
        const dragFaq = function(index){
          aaa.value = index
          console.log(aaa.value)
        }
        const list = ref([]) 
        list.value = [
          { name: 'John', id: 1, position: 1 },
          { name: 'Joao', id: 2, position: 2 },
          { name: 'Jean', id: 3, position: 3 },
          { name: 'Gerard', id: 4, position: 4 },
        ]
        
        const changePosition = function() {
          console.log(list.value)
          for(let i =0; i < list.value.length; i++){
            console.log(list.value[i])
          }
        }
        return{
          changePosition,
          list,
          aaa,
          dragFaq,
        }
      },
      methods: {
      },
    })
  </script>