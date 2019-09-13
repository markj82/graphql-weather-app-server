const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');
const { apiKey } = require('./config')

// hardcoded London, just for testing graphql query
const testingAPI = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`

const IdWeatherType = new GraphQLObjectType({
    name: 'IdWeatherType',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
})

// main, root query
const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        oneId: {
            type: IdWeatherType,
            resolve(parent, args) {
                return axios.get(testingAPI)
                    .then(({data}) => data)
            }
        }
    }
})

module.exports = new GraphQLSchema({ query })