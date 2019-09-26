# Weather App GraphQL server

This is the backend server for a weather app

## Installing

Head to this website:
* [https://openweathermap.org/](https://openweathermap.org/)

Obtain an api key.

Install all dependencies
```
npm install
```

Create config.js file in root folder of your application and paste this code with your own API
```js
const apiKey = 'your-api-key';

module.exports = { apiKey }
```

Run
```
npm run server
```

and on your local host you should be able to play around with graphql
[https://localhost:5000/___graphql](https://localhost:5000/___graphql)

Example query
```
WeatherQuery($city: String!) {
        weatherCity(city: $city) {
            id
            name
            main {
                pressure
                temp
            }
            clouds {
                all
            }
            weather {
                description
                icon
        }
    }
}
```


## Author

Marek Jaszczuk