import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import type { Filme } from '../types/Filme';

interface FilmeFormProps {
  onSubmit: (filme: Omit<Filme, 'id'>) => void;
  onCancel: () => void;
  filmeAtual?: Filme;
  isLoading?: boolean;
}

function FilmeForm({ onSubmit, onCancel, filmeAtual, isLoading = false }: FilmeFormProps) {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState(new Date().getFullYear());
  const [genero, setGenero] = useState('');
  const [nota, setNota] = useState(0);
  const [tipo, setTipo] = useState<'filme' | 'serie'>('filme');
  const [imagemUrl, setImagemUrl] = useState('');
  
  // Estados de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (filmeAtual) {
      setTitulo(filmeAtual.titulo);
      setAno(filmeAtual.ano);
      setGenero(filmeAtual.genero);
      setNota(filmeAtual.nota);
      setTipo(filmeAtual.tipo);
      setImagemUrl(filmeAtual.imagemUrl || '');
    } else {
      setTitulo('');
      setAno(new Date().getFullYear());
      setGenero('');
      setNota(0);
      setTipo('filme');
      setImagemUrl('');
    }
    setErrors({});
  }, [filmeAtual]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const anoAtual = new Date().getFullYear();

    if (!titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (ano < 1888) {
      newErrors.ano = 'Ano não pode ser anterior a 1888 (primeiro filme da história)';
    } else if (ano > anoAtual + 5) {
      newErrors.ano = `Ano não pode ser maior que ${anoAtual + 5}`;
    }

    if (!genero.trim()) {
      newErrors.genero = 'Gênero é obrigatório';
    }

    if (nota < 0) {
      newErrors.nota = 'Nota não pode ser negativa';
    } else if (nota > 10) {
      newErrors.nota = 'Nota não pode ser maior que 10';
    }

    if (imagemUrl && !imagemUrl.match(/^https?:\/\/.+/)) {
      newErrors.imagemUrl = 'URL da imagem deve começar com http:// ou https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSubmit({ 
      titulo, 
      ano, 
      genero, 
      nota, 
      tipo,
      imagemUrl: imagemUrl || undefined
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mb-3">
          <strong>Corrija os seguintes erros:</strong>
          <ul className="mb-0 mt-2">
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Título *</Form.Label>
        <Form.Control 
          type="text" 
          required 
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          isInvalid={!!errors.titulo}
          disabled={isLoading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.titulo}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ano *</Form.Label>
            <Form.Control 
              type="number" 
              required 
              value={ano}
              onChange={e => setAno(Number(e.target.value))}
              isInvalid={!!errors.ano}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ano}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nota (0-10) *</Form.Label>
            <Form.Control 
              type="number" 
              min="0" 
              max="10" 
              step="0.1" 
              required
              value={nota} 
              onChange={e => setNota(Number(e.target.value))}
              isInvalid={!!errors.nota}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nota}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Gênero *</Form.Label>
        <Form.Control 
          type="text" 
          required 
          value={genero}
          onChange={e => setGenero(e.target.value)}
          placeholder="Ex: Ação, Drama, Comédia"
          isInvalid={!!errors.genero}
          disabled={isLoading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.genero}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL da Imagem</Form.Label>
        <Form.Control 
          type="url" 
          value={imagemUrl}
          onChange={e => setImagemUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          isInvalid={!!errors.imagemUrl}
          disabled={isLoading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.imagemUrl}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Opcional: Cole a URL de uma imagem para o poster
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Tipo *</Form.Label>
        <Form.Select 
          value={tipo} 
          onChange={e => setTipo(e.target.value as 'filme' | 'serie')}
          disabled={isLoading}
        >
          <option value="filme">Filme</option>
          <option value="serie">Série</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Salvando...
            </>
          ) : (
            filmeAtual ? 'Salvar Alterações' : 'Cadastrar'
          )}
        </Button>
      </div>
    </Form>
  );
}

export default FilmeForm;