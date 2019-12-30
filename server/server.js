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
        restaurante: Int
    }
    type Query{
        restaurantes: [Restaurantes]
        pratos: [Pratos]
    }
`;

const restaurantes = [
    {id: 1, nome: "CasaBlanka"},
    {id: 2, nome: "MatBurguer"},
    {id: 3, nome: "KingIsland"},
    {id: 4, nome: "FruitNinja"}
]

const pratos = [
    {id: 1, nome: "Panettone", valor: "10", restaurante: 1},
    {id: 2, nome: "Burguer1", valor: "20", restaurante: 1},
    {id: 3, nome: "Burguer2", valor: "30", restaurante: 2},
    {id: 4, nome: "Batata", valor: "40", restaurante: 3},
    {id: 5, nome: "Assadão", valor: "50", restaurante: 4},
    {id: 6, nome: "Beringela", valor: "60", restaurante: 4}
]

const resolvers = {
    Query:{
        restaurantes(){
            return restaurantes;
        },
        pratos(){
            return pratos;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();