const con = require('../connect/connect').con;

const create = (req, res) => {
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let data_nascimento = req.body.data_nascimento;
    let data_cadastro = req.body.data_cadastro 

    let query = 'INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES '
    query += `('${nome}', '${cpf}', '${email}', '${endereco}', '${data_nascimento}', '${data_cadastro}');`;

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

const read = (req, res) => {
    con.query('SELECT * FROM clientes', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result)
        }
    })
}

const update = (req, res) => {
    const id = req.params.id
    const { nome, email, endereco, data_nascimento, data_cadastro } = req.body 

    con.query(
        'UPDATE clientes SET nome = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?',
        [nome, email, endereco, data_nascimento, data_cadastro, id], 
        (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        }
    )
}

const deletar = (req, res) => {
    const id = req.params.id;

    con.query('DELETE FROM clientes WHERE cliente_id = ?', [id], (err, result) => {
        if (err) {
            res.status(400).json(err).end();
        } else {
            res.status(200).json(result)
        }
    })
}

module.exports = {
    create,
    read,
    update,
    deletar
}