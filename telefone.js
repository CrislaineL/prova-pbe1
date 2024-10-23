const con = require('../connect/connect').con;

const create = (req, res) => {
    let cliente_id = req.body.cliente_id
    let numero = req.body.numero
    let tipoENUM = req.body.tipoENUM

    let query = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES ';
    query += `('${cliente_id}', '${numero}', '${tipoENUM}');`;

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

const read = (req, res) => {
    con.query('SELECT * FROM telefone', (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
}

const update = (req, res) => {
    const id = req.params.id
    const { cliente_id, numero, tipoENUM } = req.body 

    con.query(
        'UPDATE telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?',
        [cliente_id, numero, tipoENUM, id], 
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
    const id = req.params.id

    con.query('DELETE FROM telefone WHERE telefone_id = ?', [id], (err, result) => {
        if (err) {
            res.status(400).json(err).end()
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
