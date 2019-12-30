const { ApolloServer } = require("apollo-server");

const typeDefs =`
    type Restaurantes{
        id: Int
        nome: String
    }
    type Pratos{
        id: Int
        nome: String
        valor: String

    }
    type Query{
        restaurantes: [Restaurantes]
        pratos: [Pratos] 
    }

    input restauranteInput{
        nome: String
    }

    input pratoInput{
        nome: String
        valor: String

    }

    type Mutation{
        saveRestaurante(restaurante: restauranteInput): Restaurantes
        savePrato(prato: pratoInput): Pratos
        deleteRestaurante(id: Int): Boolean
        deletePrato(id: Int): Boolean
    }
`;

const restaurantes = [
    {id: 1, nome: "CasaBlanka"},
    {id: 2, nome: "MatBurguer"},
    {id: 3, nome: "KingIsland"},
    {id: 4, nome: "FruitNinja"}
];

const pratos = [
    {id: 1, nome: "Panettone", valor: "10"},
    {id: 2, nome: "Burguer1", valor: "20"},
    {id: 3, nome: "Burguer2", valor: "30"},
    {id: 4, nome: "Batata", valor: "40"},
    {id: 5, nome: "Assadão", valor: "50"},
    {id: 6, nome: "Beringela", valor: "60"}
];

const resolvers = {
    Query:{
        restaurantes(){
            return restaurantes;
        },
        pratos(){
            return pratos;
        }
    },
    Mutation:{
        saveRestaurante(_, args){
            const restaurante = args.restaurante;
            restaurante.id = Math.floor(Math.random() * 1000);
            restaurantes.push(restaurante);
            return restaurante;
        },
        savePrato(_, args){
            const prato = args.prato;
            prato.id = Math.floor(Math.random() * 1000);
            pratos.push(prato);
            return prato;
        },
        deleteRestaurante(_, args){
            const id = args.id;
            const restaurante = restaurantes.find(restaurante => restaurante.id === id);
            if(!restaurante) return false;
            restaurantes.splice(restaurantes.indexOf(restaurante), 1);
            return true;
        },
        deletePrato(_, args){
            const id = args.id;
            const prato = pratos.find(prato => prato.id === id);
            if(!prato) return false;
            pratos.splice(pratos.indexOf(prato), 1);
            return true;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();