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
                  <option v-for="restaurante in restaurantes" v-bind:key="restaurante">{{restaurante}}</option>
                  </select>
                  <br/>
                <label>Prato:</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="prato" v-on:keyup.enter="addPrato({selected,prato})" placeholder="Digite o nome do Prato"/>
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addPrato({selected,prato})">
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
              <li class="list-group-item" v-for="restaurante in restaurantes" v-bind:key="restaurante">
                <div class="row">
                  <div class="col-md">{{restaurante}}</div>
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
          Lista de Pratos
          <span class="badge badge-info">{{pratos.length}}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <div class="List-group">
              <li class="list-group-item" v-for="prato in pratos" v-bind:key="prato.prato">
                <div class="row">
                  <div class="col-md">{{prato.prato}} {{prato.selected}}</div>
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
im

export default {
  name: "app",
  data() {
    return {
      selected: "",
      prato: "",
      restaurante: "",
      restaurantes: ["oi"],
      pratos: [
        {selected:"brunela", prato:"bobo"}
      ]
    };
  },
  methods: {
    addRestaurante(restaurante) {
      this.restaurantes.push(restaurante);
      this.restaurante = "";
    },
    deleteRestaurante(restaurante) {
      this.restaurantes.splice(this.restaurantes.indexOf(restaurante), 1);
    },

    addPrato({selected,prato}) {
      this.pratos.push({selected,prato});
      this.selected = "";
      this.prato = "";
    },
    deletePrato(prato) {
      this.pratos.splice(this.pratos.indexOf(prato), 1);
    }
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
