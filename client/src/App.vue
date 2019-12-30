<template>
  <div id="slogan">
    <div class="text-center">
      <h1>Restaurante</h1>
      <br />
      <h6 class="text-secondary">Cadastro de Restaurantes e Pratos Correspondentes.</h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5> Restaurantes </h5>
            <div class="card">
              <div class="card-body">
                <label>Nome:</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="restaurante" v-on:keyup.enter="addRestaurante(restaurante)" placeholder="Digite o nome do Restaurante"/>
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addRestaurante(restaurante)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>Pratos</h5>
            <div class="card">
              <div class="card-body">
                <label>Restaurante:</label>
                  <select v-model="selected" class="form-control">
                  <option disabled value="">Escolha um item</option>
                  <option v-for="restaurante in restaurantes" v-bind:key="restaurante.id">{{restaurante.nome}}</option>
                  </select>
                  <br/>
                <label>Prato:</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="prato" placeholder="Digite o nome do Prato"/>
                </div>
                <br />
                <label>Valor:</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="valor" v-on:keyup.enter="addPrato({prato,valor})" placeholder="Digite o nome do Valor"/>
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addPrato({prato,valor})">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5>
          Lista de Restaurantes
          <span class="badge badge-info">{{restaurantes.length}}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <div class="List-group">
              <li class="list-group-item" v-for="restaurante in restaurantes" v-bind:key="restaurante.id">
                <div class="row">
                  <div class="col-md">{{restaurante.nome}}</div>
                  <div class="col-md text-right">
                    <button class="btn btn-info" v-on:click="deleteRestaurante(restaurante)"><span class="fa fa-trash"></span>
                    </button>                    
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
        <h5>
          <br />
          Lista de Pratos
          <span class="badge badge-info">{{pratos.length}}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <div class="List-group">
              <li class="list-group-item" v-for="prato in pratos" v-bind:key="prato.id">
                <div class="row">
                  <div class="col-md">{{prato.nome}}</div>
                  <div class="col-md text-right">
                    <button class="btn btn-info" v-on:click="deletePrato(prato)"><span class="fa fa-trash"></span>
                    </button>                    
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios/dist/axios";

export default {
  name: "app",
  data() {
    return {
      valor:"",
      selected: "",
      prato: "",
      restaurante: "",
      restaurantes: [],
      pratos: []
    };
  },
  methods: {
    addRestaurante(restaurante) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data:{
          query:`
          mutation($restaurante: restauranteInput){
            newRestaurant:saveRestaurante(restaurante: $restaurante){
              id
              nome
            }
          }
          `,
          variables:{
            restaurante:{
              nome: restaurante
            }            
          }
        }
      }).then(() => {
        this.getRestaurantes();
      });
            this.restaurante = "";
    },

    deleteRestaurante(restaurante) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data:{
          query:`
          mutation($id: Int){
            deleteRestaurante(id: $id)
          }
          `,
          variables:{
            id: restaurante.id

            }
        }
      }).then(() => {
        this.getRestaurantes();
      });
    },

    addPrato({prato, valor}) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data:{
          query:`
          mutation($prato: pratoInput){
            newPrato:savePrato(prato: $prato){
              id
              nome
              valor

            }
          }
          `,
          variables:{
            prato:{
              nome: prato,
              valor: valor,

            }            
          }
        }
      }).then(() => {
        this.getPratos();
      });

          this.prato = "";
          this.valor ="";
    },

    deletePrato(prato) {
      this.pratos.splice(this.pratos.indexOf(prato), 1);
    },

    getRestaurantes(){
      axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query:`{ 
          restaurantes{
            id
            nome
          }
        }`
      }
    }).then(response =>{
      const query = response.data;
      this.restaurantes = query.data.restaurantes;
    });
    },
    
    getPratos(){
      axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query:`{ 
          pratos{
            id
            nome
            valor

          } 
        }`
      }
    }).then(response =>{
      const query = response.data;
      this.pratos = query.data.pratos;
    });
    }
  },
  created(){
    this.getRestaurantes();
    this.getPratos();
  }
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
