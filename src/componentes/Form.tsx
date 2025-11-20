import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import type { Filme } from '../types/Filme';
interface FilmeFormProps {
  onSubmit: (filme: Omit<Filme, 'id'>) => void; // Função que recebe os dados do formulário
  onCancel: () => void; // Função para fechar o formulário/modal
}

function FilmeForm({ onSubmit, onCancel }: FilmeFormProps) {
  // Estados para cada campo do formulário
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState(2024);
  const [genero, setGenero] = useState('');
  const [nota, setNota] = useState(0);
  const [tipo, setTipo] = useState<'filme' | 'serie'>('filme');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    
    // Monta o objeto e envia para quem chamou o componente
    onSubmit({ titulo, ano, genero, nota, tipo });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control 
          type="text" 
          required 
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Ex: Matrix"
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Ano</Form.Label>
            <Form.Control 
              type="number" 
              required
              value={ano}
              onChange={e => setAno(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Nota (0-10)</Form.Label>
            <Form.Control 
              type="number" 
              min="0" max="10" step="0.1"
              required
              value={nota}
              onChange={e => setNota(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Gênero</Form.Label>
        <Form.Control 
          type="text" 
          required 
          value={genero}
          onChange={e => setGenero(e.target.value)}
          placeholder="Ex: Sci-Fi, Ação"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Tipo</Form.Label>
        <Form.Select 
          value={tipo} 
          onChange={e => setTipo(e.target.value as 'filme' | 'serie')}
        >
          <option value="filme">Filme</option>
          <option value="serie">Série</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </Form>
  );
}

export default FilmeForm;