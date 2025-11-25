import { Card, Badge, Button } from 'react-bootstrap';
import type { Filme } from '../types/Filme';

interface FilmeCardProps {
  filme: Filme;
  onEdit: (filme: Filme) => void;
  onDelete: (id: string) => void;
}

function FilmeCard({ filme, onEdit, onDelete }: FilmeCardProps) {
  const badgeVariant = filme.tipo === 'filme' ? 'primary' : 'success';

  return (
    <Card className="h-100 shadow-sm">
      {/* NOVO: Adicionar imagem */}
      {filme.imagemUrl && (
        <Card.Img 
          variant="top" 
          src={filme.imagemUrl} 
          alt={filme.titulo}
          style={{ height: '300px', objectFit: 'cover' }}
        />
      )}
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{filme.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {filme.ano} | {filme.genero}
        </Card.Subtitle>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg={badgeVariant}>{filme.tipo.toUpperCase()}</Badge>
          <span className="fw-bold">Nota: {filme.nota}/10</span>
        </div>

        <div className="mt-auto d-flex justify-content-end gap-2">
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => onEdit(filme)}
          >
            Editar
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => {
              if (filme.id) onDelete(filme.id);
            }}
          >
            Excluir
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FilmeCard;