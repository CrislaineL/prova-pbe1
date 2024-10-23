DROP DATABASE IF EXISTS hoteis;
CREATE DATABASE IF NOT EXISTS hoteis;
USE hoteis;

CREATE TABLE clientes (
    cliente_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    endereco VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_cadastro DATE NOT NULL   
);

CREATE TABLE telefone (
    telefone_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    tipo ENUM('residencial', 'comercial', 'celular') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE quartos (
    quarto_id INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    andar INT NOT NULL,
    tipo ENUM('simples', 'duplo', 'triplo', 'quadruple') NOT NULL,
    valor_diaria DECIMAL(7, 2) NOT NULL, -- Ajustado para permitir valores maiores
    statusQuarto ENUM('disponivel', 'ocupado', 'reservado') NOT NULL,
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE reservas (
    reserva_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    quarto_id INT NOT NULL,
    data_reserva DATE NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    valor_total DECIMAL(7, 2) NOT NULL,
    statusReserva ENUM('confirmada', 'cancelada', 'pendente') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (quarto_id) REFERENCES quartos(quarto_id)
);

CREATE TABLE estacionamento (
    estacionamento_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    veiculo_placa VARCHAR(7) NOT NULL UNIQUE,
    veiculo_marca VARCHAR(50) NOT NULL,
    veiculo_modelo VARCHAR(50) NOT NULL,
    data_entrada DATETIME NOT NULL,
    data_saida DATETIME DEFAULT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);
