import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBreadcumb from '../components/breadcumb-nav';
import Lancamentos from '../components/lancamentos';

import LancamentoService from '../services/lancamento-service';

import { setLancamentosThunk } from '../reducers/actions/lancamentos-actions';

import '../App.css';
import '../css/lancamentos-page.css';

class LancamentosPage extends Component {

    constructor(props) {
        super(props);

        this.lancamentoService = new LancamentoService();
    }

    componentDidMount() {
        this.props.setLancamentosThunk();
    }

    render() {

        return (
            <div>
                <NavBreadcumb path={['Dashboard', 'Lançamentos']} />
                <Lancamentos lancamentos={this.props.lancamentos} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lancamentos: state.lancamentos
});

const mapDispatchToProps = ({
    setLancamentosThunk
});

export default connect(mapStateToProps, mapDispatchToProps)(LancamentosPage);