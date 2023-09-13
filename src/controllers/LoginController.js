const LoginModel = require("../models/LoginModel");
const { use } = require("../routes");

module.exports = {
  loginValidation: async (req, res) => {
    try {
      const body = req.body;
      const result = await LoginModel.loginValidation(body);
      console.log(result);
      res.status(result.status).json({ user: result });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
      console.log(error);
    }
  },

  getAllStatement: async (req, res) => {
    try {
      const id = req.params;
      const json = { result: [] };
      const users = await LoginModel.getAllStatement(id);

      users.map((user) => {
        json.result.push({
          dateTransiction: user.DataTransacao,
          typeTransiction: user.TipoTransacao,
          value: user.Valor,
          balanceResult: user.SaldoResultante,
          BalanceImpact: user.BalanceImpact
        });
      });
      res.json(json);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  handleDelete: async (req, res) => {
    try {
      const id = req.params;
      await LoginModel.handleDelete(id);
      res.status(201).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  handlePost: async (req, res) => {
    try {
      const body = req.body;
      await LoginModel.handlePost(body);
      res.status(201).json();
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  handleUpdate: async (req, res) => {
    try {
      const id = req.params;
      const body = req.body;
      await LoginModel.handleUpdate(body, id);
      res.status(201).json();
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  addBalance: async (req, res) => {
    try {
      const id = req.params;
      const body = req.body;
      await LoginModel.addBalance(body, id);
      res.status(201).json({ message: "Depósito realizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params;
      const user = await LoginModel.getUser(id);
      res.json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const json = { result: [] };
      const users = await LoginModel.getAllUsers();

      users.map((user) => {
        json.result.push({
          name: user.name,
          email: user.email,
          id: user.id,
        });
      });
      res.json(json);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  transferBalance: async (req, res) => {
    try {
      const body = req.body;
      await LoginModel.transferBalance(body);
      res.status(201).json({ message: "Transferência realizada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro interno do servidor" });
    }
  },
};
