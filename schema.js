const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat, GraphQLSchema } = require('graphql');
const axios = require('axios');
const { apiKey } = require('./config')

// hardcoded London, just for testing graphql query
const testingAPI = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`

const WeatherType = new GraphQLObjectType({
    name: 'WeatherType',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        main: { type: MainType },
        clouds: { type: CloudType }
    })
})

// MainType
const MainType = new GraphQLObjectType({
    name: 'MainType',
    fields: () => ({
        temp: { type: GraphQLFloat },
        pressure: { type: GraphQLInt }
    })
})

// CloudType
const CloudType = new GraphQLObjectType({
    name: 'CloudType',
    fields: () => ({
        all: { type: GraphQLInt }
    })
})

// main, root query
const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        weatherAll: {
            type: WeatherType,
            resolve(parent, args) {
                return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`)
                    .then(({data}) => data)
            }
        },
        weatherCity: {
            type: WeatherType,
            args: {
                city: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${args.city}&appid=${apiKey}&units=metric`)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({ query })