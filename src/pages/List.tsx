import { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

import { getFilmes, createFilme, updateFilme, deleteFilme } from '../services/Api';
import type { Filme } from '../types/Filme';
import FilmeCard from '../componentes/Card';
import FilmeForm from '../componentes/Form';

function List() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados do Modal de Edição/Criação
  const [showModal, setShowModal] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState<Filme | undefined>(undefined);
  
  // Estados do Modal de Confirmação de Exclusão
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [filmeParaExcluir, setFilmeParaExcluir] = useState<string | null>(null);
  
  // Estados do Toast (notificações)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

  const fetchDados = async () => {
    setIsLoading(true);
    setError(null);
    const dados = await getFilmes();
    if (dados) setFilmes(dados);
    else setError('Erro ao carregar dados.');
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDados();
  }, []);

  // Função para mostrar notificação
  const mostrarNotificacao = (mensagem: string, tipo: 'success' | 'danger') => {
    setToastMessage(mensagem);
    setToastVariant(tipo);
    setShowToast(true);
  };

  // --- AÇÕES ---

  const handleNovoFilme = () => {
    setFilmeEmEdicao(undefined);
    setShowModal(true);
  };

  const handleEditarFilme = (filme: Filme) => {
    setFilmeEmEdicao(filme);
    setShowModal(true);
  };

  const handleExcluirFilme = (id: string) => {
    setFilmeParaExcluir(id);
    setShowConfirmDelete(true);
  };

  const confirmarExclusao = async () => {
    if (!filmeParaExcluir) return;
    
    setIsSaving(true);
    const sucesso = await deleteFilme(filmeParaExcluir);
    setIsSaving(false);
    
    if (sucesso) {
      await fetchDados();
      mostrarNotificacao('Filme excluído com sucesso!', 'success');
    } else {
      mostrarNotificacao('Erro ao excluir o filme.', 'danger');
    }
    
    setShowConfirmDelete(false);
    setFilmeParaExcluir(null);
  };

  const handleFormSubmit = async (dadosFilme: Omit<Filme, 'id'>) => {
    setIsSaving(true);
    let sucesso;

    if (filmeEmEdicao && filmeEmEdicao.id) {
      sucesso = await updateFilme(filmeEmEdicao.id, dadosFilme);
    } else {
      sucesso = await createFilme(dadosFilme);
    }

    setIsSaving(false);

    if (sucesso) {
      setShowModal(false);
      await fetchDados();
      mostrarNotificacao(
        filmeEmEdicao ? 'Filme atualizado com sucesso!' : 'Filme cadastrado com sucesso!',
        'success'
      );
    } else {
      mostrarNotificacao('Erro ao salvar os dados.', 'danger');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meu Catálogo</h1>
        <Button variant="primary" onClick={handleNovoFilme}>
          + Novo Filme
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Carregando filmes...</p>
        </div>
      )}
      
      {!isLoading && error && <Alert variant="danger">{error}</Alert>}

      {!isLoading && !error && filmes.length === 0 && (
        <Alert variant="info">
          Nenhum filme cadastrado ainda. Clique em "Novo Filme" para começar!
        </Alert>
      )}

      {!isLoading && !error && filmes.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filmes.map((filme) => (
            <Col key={filme.id}>
              <FilmeCard 
                filme={filme} 
                onEdit={handleEditarFilme}
                onDelete={handleExcluirFilme}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Modal para Criar e Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {filmeEmEdicao ? 'Editar Filme' : 'Novo Filme'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilmeForm 
            onCancel={() => setShowModal(false)} 
            onSubmit={handleFormSubmit}
            filmeAtual={filmeEmEdicao}
            isLoading={isSaving}
          />
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal 
        show={showConfirmDelete} 
        onHide={() => setShowConfirmDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este filme? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowConfirmDelete(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmarExclusao}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Excluindo...
              </>
            ) : (
              'Excluir'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast de Notificações */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === 'success' ? '✓ Sucesso' : '✗ Erro'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default List;