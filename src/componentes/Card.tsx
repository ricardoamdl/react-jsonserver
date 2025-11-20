import { Card, Badge, Button } from 'react-bootstrap';
import type { Filme } from '../types/Filme'; //Importando nosso tipo

// O 'Props' define o que este componente espera receber
interface FilmeCardProps {
  filme: Filme;
}

// Usamos 'FilmeCardProps' para tipar as props
function FilmeCard({ filme }: FilmeCardProps) {
  
  // Lógica para definir a cor do Badge (etiqueta)
  const badgeVariant = filme.tipo === 'filme' ? 'primary' : 'success';

  return (
    // Usamos o Card do react-bootstrap
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{filme.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {filme.ano} | {filme.genero}
        </Card.Subtitle>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg={badgeVariant}>{filme.tipo.toUpperCase()}</Badge>
          <span className="fw-bold">Nota: {filme.nota}/10</span>
        </div>

        {/* Botões que usaremos no futuro */}
        <div className="mt-auto d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" size="sm">Editar</Button>
          <Button variant="outline-danger" size="sm">Excluir</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FilmeCard;