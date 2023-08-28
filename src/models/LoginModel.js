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
            name: "Usuário ou senha inválidos"
        } 
       }
       return {
        status: 200,
        dataUser: result[0],
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
    const result = await dbQuery(`UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}', balance = '${body.balance}' WHERE id = ${id.id}`)
    return result
   },

   addBalance: async (body, id) => {
    const result = await dbQuery(`UPDATE users SET balance = balance + '${body.balance}' WHERE id = ${id.id}`)
    return result
   },
   
   getUser: async (id) => {
    const result = await dbQuery(`SELECT id, name, email, balance FROM users WHERE id = ${id.id}`)
    return result
   }
}