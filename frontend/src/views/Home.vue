<template>
  <div class="home">
    <form v-on:submit.prevent="enviarEmail">
      <input type="text" v-model="emailTo" placeholder="email to">
      <input type="text" v-model="emailSubjet" placeholder="email subjet">
      <input type="text" v-model="emailText" placeholder="email text">
      <button type="submit">Enviar Email</button>
    </form>
    <a href=""></a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'home',
  data(){
    return{
      emailTo:'',
      emailSubjet:'',
      emailText:''
    }
  },
  methods:{
    enviarEmail(){
      axios
      .post('http://localhost:3000/enviar',{
        emailTo:this.emailTo,
        emailSubjet:this.emailSubjet,
        emailText:this.emailText
      })
      .then((response)=>{
        if(response.data.rs === 'enviarEmailCorrecto'){
          alert('enviarEmailCorrecto')
          this.$router.push('/');
        }
      })
      .catch((error)=>{
        if(error.response.data.rs === 'enviarEmailError'){
          alert('enviarEmailError')
          this.$router.push('/');
        }  
      })
    }
  }
}
</script>
