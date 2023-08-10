const { dbQuery } = require('../db')

module.exports = {
    loginValidation: async (body) => {
       const result = await dbQuery(`SELECT * FROM users WHERE email = "${body.email}"`)
       console.log(result)
       if (result.length === 0) {
        return { 
            status: 400,
            message: "Usuário ou senha inválidos"
        }
       }
       const validatePassword = result[0].password === body.password
       if (!validatePassword) {
        return {
            status: 400,
            message: "Usuário ou senha inválidos"
        } 
       }
       return {
        status: 200,
        message: "Deu bom família"
       }
    },

    getAll: async () => {
    const result = await dbQuery('SELECT * FROM users')
    return result
   }, 

   handleDelete: async (id) => {
    const result = await dbQuery(`DELETE FROM users WHERE id = ${id.id}`)
    return result
   },
   
   handlePost: async (body) => {
    const result = await dbQuery(`INSERT INTO users (name, email, password) VALUES ("${body.name}", "${body.email}", "${body.password}")`)
    return result
   },

   handleUpdate: async (body, id) => {
    const result = await dbQuery(`UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}' WHERE id = ${id.id}`)
    return result
   } 
}