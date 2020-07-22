import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    CurrentCode:'',
    LearningOn:true,
    PractiseOn:false
  },
  mutations: {

    changeMode (state) 
    {

      if(state.LearningOn==true)

      {

      state.PractiseOn=true
      state.LearningOn=false
      
      
      
      }
      
      else if(state.PractiseOn==true)
      {
      state.LearningOn=true
      state.PractiseOn=false
      
      
      }
      
      
      }


    
  },
  actions: {



  },
  modules: {
  }
})
