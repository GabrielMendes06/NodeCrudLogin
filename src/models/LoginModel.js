const db = require('../db')

module.exports = {
   getAll: () => {
    return new Promise((accept, reject) => {
        db.query('SELECT * FROM users', 
        (error, results) => {
            if(error) {
                reject(error); 
                return;
            }
            accept(results);
        })
    })
   }, 
   handleDelete: (id) => {
    return new Promise ((accept, reject) => {
        db.query(`DELETE FROM users WHERE id = ${id.id}`,
        (error, results) => {
            if(error) {
                reject(error); 
                return;
            }
            accept(results);
        })
    })
   },
   handlePost: (body) => {
    return new Promise ((accept, reject) => {
        db.query(`INSERT INTO users (name, email, password) VALUES ("${body.name}", "${body.email}", "${body.password}")`,
        (error, results) => {
            if(error) {
                reject(error)
                return
            }
            accept(results);
        })
    })
   },
   handleUpdate: (body, id) => {
    return new Promise ((accept, reject) => {
        db.query (`UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}' WHERE id = ${id.id}`,
        (error, results) => {
            if(error) {
                reject(error)
                return
            } 
            accept(results)        
        })
    })
   }
}