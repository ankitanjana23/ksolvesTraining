const axios = require('axios')

const typeDefs = `#graphql
     
       type Image {
            id : ID!
            filename: String!
            type: String!
            data: ID!

       }
       
       type Query{
            Images : [Image]
        }      
`

const resolvers = {
    Query :{
    Images: async()=> {
        try {
            const response = await axios.get("http://localhost:3000/api/images");
            return response.data();
          } catch (error) {
            throw new Error("Failed to fetch images");
          }
    },
   },
  };

// const Images = axios.get('')

module.exports = {typeDefs,resolvers}