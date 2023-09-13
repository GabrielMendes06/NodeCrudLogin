const { dbQuery } = require("../db");

module.exports = {
  loginValidation: async (body) => {
    const result = await dbQuery(
      `SELECT * FROM users WHERE email = "${body.email}"`
    );
    console.log(result);
    if (result.length === 0) {
      return {
        status: 400,
        message: "Usuário ou senha inválidos",
      };
    }
    const validatePassword = result[0].password === body.password;
    if (!validatePassword) {
      return {
        status: 400,
        name: "Usuário ou senha inválidos",
      };
    }
    return {
      status: 200,
      dataUser: result[0],
    };
  },

  getAllStatement: async (id) => {
    const result = await dbQuery(
      `SELECT * FROM statement WHERE UsuarioID = ${id.id}`
    );
    return result;
  },

  handleDelete: async (id) => {
    const result = await dbQuery(`DELETE FROM users WHERE id = ${id.id}`);
    return result;
  },

  handlePost: async (body) => {
    const result = await dbQuery(
      `INSERT INTO users (name, email, password) VALUES ("${body.name}", "${body.email}", "${body.password}")`
    );
    return result;
  },

  handleUpdate: async (body, id) => {
    const result = await dbQuery(
      `UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}', balance = '${body.balance}' WHERE id = ${id.id}`
    );
    return result;
  },

  addBalance: async (body, id) => {
    try {
      await dbQuery("START TRANSACTION");

      await dbQuery(
        `UPDATE users SET balance = balance + '${body.balance}' WHERE id = ${id.id}`
      );

      await dbQuery(`
            INSERT INTO statement (UsuarioID, DataTransacao, TipoTransacao, Valor, SaldoResultante)
            VALUES (${id.id}, NOW(), 'Deposito', ${body.balance}, (SELECT balance FROM users WHERE id = ${id.id}))
        `);

      await dbQuery("COMMIT");

      return { sucess: true };
    } catch {
      dbQuery("ROLLBACK");
      throw error;
    }
  },

  getUser: async (id) => {
    const result = await dbQuery(
      `SELECT id, name, email, balance FROM users WHERE id = ${id.id}`
    );
    return result;
  },

  getAllUsers: async () => {
    const result = await dbQuery(`SELECT * FROM users`);
    return result;
  },

  transferBalance: async (body) => {
    try {
      const userTransfer = body.userId1;
      const userReceive = body.userId2;
      const transferValue = Number(body.value);

      // Consulta para obter o saldo atual do userTransfer
      const balanceQuery = `SELECT balance FROM users WHERE id = ${userTransfer}`;
      const balanceResult = await dbQuery(balanceQuery);

      if (balanceResult.length === 0) {
        throw new Error("Usuário de transferência não encontrado");
      }

      const currentBalance = Number(balanceResult[0].balance);

      if (currentBalance >= transferValue) {
        await dbQuery("START TRANSACTION");

        await dbQuery(`UPDATE users 
          SET balance = balance - ${transferValue} 
          WHERE id = ${userTransfer}`);

        await dbQuery(`UPDATE users
          SET balance = balance + ${transferValue}
          WHERE id = ${userReceive}`);

        await dbQuery(`
        INSERT INTO statement (UsuarioID, DataTransacao, TipoTransacao, Valor, BalanceImpact, SaldoResultante)
        VALUES (${userTransfer}, NOW(), 'Transferencia', ${transferValue}, 'negative', (SELECT balance FROM users WHERE id = ${userTransfer}))
        `);

        await dbQuery(`
        INSERT INTO statement (UsuarioID, DataTransacao, TipoTransacao, Valor, BalanceImpact, SaldoResultante)
        VALUES (${userReceive}, NOW(), 'Transferencia', ${transferValue}, 'positive', (SELECT balance FROM users WHERE id = ${userReceive}))
        `);

        await dbQuery("COMMIT");
      } else {
        throw new Error("Saldo insuficiente para a transferência");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error interno");
    }
  },
};
