import {Container} from 'react-bootstrap';
import Header from './componentes/Header';
import List from './pages/List';

function app() {

  return(
    <>
    <Header/>

    <Container className ="py-4">
      <List/>
    </Container>
    </>
  );
}

export default app;