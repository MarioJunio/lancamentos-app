import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header';
import LancamentosPage from './pages/lancamentos-page';

import { setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

setDefaultLocale(pt);

class App extends React.Component {

  render() {

    return (
      <BrowserRouter>

        <Container fluid={true}>
          <Header />

          <Switch>
            <Route exact path="/" component={LancamentosPage} />
            <Route exact path="/lancamentos" component={LancamentosPage} />
          </Switch>

        </Container>

      </BrowserRouter>
    );
  }
}

export default App;
