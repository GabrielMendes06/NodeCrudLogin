const LoginModel = require('../models/LoginModel');
const { use } = require('../routes');

module.exports = {
    loginValidation: async(req, res) => {
        try {
            const body = req.body
            const result = await LoginModel.loginValidation(body);
            console.log(result)
            res.status(result.status).json({user: result})            
        } catch (error) {
            res.status(500).json({error: 'Erro interno do servidor'});
            console.log(error)
        }
    },

    getAll: async(req, res) => {
        try {
        const json = {result:[]};
        const users = await LoginModel.getAll();

        users.map((user) => {
            json.result.push({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            });
        })
        res.json(json) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    },
    handleDelete: async(req, res) => {
        try {
        const id = req.params
        await LoginModel.handleDelete(id);
        res.status(201).json()
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    },
    handlePost: async(req, res) => {
        try {
            const body = req.body
            await LoginModel.handlePost(body);
            res.status(201).json()
        } catch (error) {
            res.status(500).json({error: 'Erro interno do servidor'});
        }
    },
    handleUpdate: async(req, res) => {
        try {
            const id = req.params
            const body = req.body
            await LoginModel.handleUpdate(body, id);
            res.status(201).json()
        } catch (error) {
            res.status(500).json({error: 'Erro interno do servidor'});
        }
    },
    addBalance: async(req, res) => {
        try {
            const id = req.params
            const body = req.body
            await LoginModel.addBalance(body, id);
            res.status(201).json()
        } catch (error) {
            res.status(500).json({error: 'Erro interno do servidor'});
        }
    },
    getUser: async(req, res) => {
        try {
        const id = req.params
        const user = await LoginModel.getUser(id);       
        res.json(user[0]) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    },
} 