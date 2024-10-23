const con = require('../connect/connect').con;

const create = (req, res) => {
    let numero = req.body.numero
    let andar = req.body.andar
    let tipoENUM = req.body.tipoENUM
    let valor_diaria = req.body.valor_diaria
    let statusQuartoENUM = req.body.statusQuartoENUM
    let cliente_id = req.body.cliente_id 

    let query = 'INSERT INTO quartos (numero, andar, tipo, valor_diaria, status, cliente_id) VALUES ';
    query += `('${numero}', '${andar}', '${tipoENUM}', '${valor_diaria}', '${statusQuartoENUM}', '${cliente_id}');`; 

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(201).json(result)
        }
    })
}

const read = (req, res) => {
    con.query('SELECT * FROM quartos', (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
}

const update = (req, res) => {
    const id = req.params.id
    const { numero, andar, tipoENUM, valor_diaria, statusQuartoENUM, cliente_id } = req.body 

    con.query(
        'UPDATE quartos SET numero = ?, andar = ?, tipo = ?, valor_diaria = ?, status = ?, cliente_id = ? WHERE quarto_id = ?',
        [numero, andar, tipoENUM, valor_diaria, statusQuartoENUM, cliente_id, id], 
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

    con.query('DELETE FROM quartos WHERE quarto_id = ?', [id], (err, result) => {
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
