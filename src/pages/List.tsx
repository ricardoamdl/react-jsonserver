import { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';

// Nossas importações
import { getFilmes } from '../services/api';
import { Filme } from '../types/Filme';
import FilmeCard from '../components/Card';

function List() {
  // Estado para guardar a lista de filmes
  const [filmes, setFilmes] = useState<Filme[]>([]);
  // Estado para saber se está carregando
  const [isLoading, setIsLoading] = useState(true);
  // Estado para guardar qualquer erro
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados QUANDO o componente for montado
  useEffect(() => {
    // Função async auto-executável
    (async () => {
      setIsLoading(true); // Começa a carregar
      setError(null); // Limpa erros anteriores

      const dados = await getFilmes();

      if (dados) {
        setFilmes(dados); // Sucesso! Guarda os dados
      } else {
        // Se 'dados' for 'null', significa que deu erro
        setError('Não foi possível carregar a lista. Tente novamente mais tarde.');
      }
      
      setIsLoading(false); // Termina de carregar
    })(); // A '()' no final executa a função
  }, []); // O array vazio '[]' significa "execute apenas uma vez"

  // ----- RENDERIZAÇÃO CONDICIONAL -----

  // 1. Se estiver carregando, mostre um Spinner
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  // 2. Se der erro, mostre um Alerta
  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  // 3. Se tudo deu certo, mostre a lista
  return (
    <div>
      <h1 className="mb-4">Meu Catálogo</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filmes.map((filme) => (
          // A 'key' é essencial para o React saber qual item é qual
          <Col key={filme.id}>
            <FilmeCard filme={filme} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default List;