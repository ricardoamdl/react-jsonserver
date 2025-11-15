import {Container} from 'react-bootstrap';
import Header from './componentes/Header';

function app() {

  return(
    <>
    <Header/>

    <Container>

    <h1>Conteúdo principal</h1>
    <p>Em breve, nossa lista de filmes aparecerá aqui!</p>
    </Container>
    </>
  );
}

export default app;