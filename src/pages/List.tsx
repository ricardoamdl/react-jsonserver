import { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner, Button, Modal } from 'react-bootstrap';

import { getFilmes, createFilme } from '../services/Api';
import type { Filme } from '../types/Filme';
import FilmeCard from '../componentes/Card';
import FilmeForm from '../componentes/form';

function List() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para controlar se o Modal abre ou fecha
  const [showModal, setShowModal] = useState(false);

  // Busca os dados na API
  const fetchDados = async () => {
    setIsLoading(true);
    const dados = await getFilmes();
    if (dados) setFilmes(dados);
    else setError('Erro ao carregar dados.');
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDados();
  }, []);

  // Função que salva o filme novo
  const handleCadastro = async (novoFilme: Omit<Filme, 'id'>) => {
    try {
      const criado = await createFilme(novoFilme);
      if (criado) {
        setShowModal(false); // Fecha modal
        await fetchDados(); // Atualiza lista
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao criar filme');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meu Catálogo</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Novo Filme
        </Button>
      </div>

      {isLoading && <Spinner animation="border" />}
      
      {!isLoading && error && <Alert variant="danger">{error}</Alert>}

      {!isLoading && !error && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filmes.map((filme) => (
            <Col key={filme.id}>
              <FilmeCard filme={filme} />
            </Col>
          ))}
        </Row>
      )}

      {/* O MODAL FICA AQUI */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmeForm 
            onCancel={() => setShowModal(false)} 
            onSubmit={handleCadastro} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default List;