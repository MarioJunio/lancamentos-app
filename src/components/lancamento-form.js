import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, ButtonToolbar, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { setFieldLancamentoFormThunk } from '../reducers/actions/form-actions';
import { setLancamentosThunk } from '../reducers/actions/lancamentos-actions';

import LancamentoService from '../services/lancamento-service';

import "react-datepicker/dist/react-datepicker.css";

function LancamentoForm({ visible, onlyView, closeCallback, clearCallback, lancamento, setFieldLancamentoFormThunk, setLancamentosThunk }) {

    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);

    const lancamentoService = new LancamentoService();

    const handleChange = (key, value) => {
        setFieldLancamentoFormThunk(key, value);
    }

    const saveSucesso = () => {
        setLancamentosThunk();
        clearCallback();
        closeCallback();
    }

    const saveError = (error) => {
        let response = error.response;

        if (response && response.data instanceof Array) {
            setErrors(response.data);
        } else if (response && response.data) {

            setErrors([{
                clientMessage: response.data.message
            }]);

        } else {
            console.log(response);
        }

        setShow(true);
    }

    const save = () => {

        if (!lancamento.id) {

            lancamentoService
                .cadastrar(lancamento)
                .then(saveSucesso)
                .catch(saveError);

        } else {

            lancamentoService
                .atualizar(lancamento)
                .then(saveSucesso)
                .catch(saveError);
        }
    }

    const definirTitulo = () => {

        if (onlyView) {
            return lancamento.descricao;
        } else if (lancamento.id) {
            return "Editando " + lancamento.descricao;
        } else {
            return 'Novo lançamento';
        }

    };

    return (
        <>
            <Modal show={visible} onHide={closeCallback}>

                <Modal.Header closeButton>
                    <Modal.Title>{definirTitulo()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                        {errors.map(error => error.clientMessage)}
                    </Alert>

                    <Form>

                        <Form.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <ButtonToolbar>
                                <ToggleButtonGroup disabled={onlyView} type="radio" name="options" defaultValue="RECEITA" value={lancamento.tipo} onChange={v => handleChange('tipo', v)}>
                                    <ToggleButton value="RECEITA">Receita</ToggleButton>
                                    <ToggleButton value="DESPESA">Despesa</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control disabled={onlyView} value={lancamento.descricao} onChange={(e) => handleChange('descricao', e.currentTarget.value)} type="text" placeholder="Informe a descrição" />
                        </Form.Group>

                        <Form.Row>

                            <Form.Group className="col-4">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control placeholder="R$" type="number" value={lancamento.valor} onChange={e => handleChange('valor', e.currentTarget.value)} disabled={onlyView} />
                            </Form.Group>

                            <Form.Group className="col-4">
                                <Form.Label>Data Vencimento</Form.Label>
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={lancamento.dataVencimento ? moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate() : null} onChange={date => handleChange('dataVencimento', date)} disabled={onlyView} />
                            </Form.Group>

                            <Form.Group className="col-4">
                                <Form.Label>Data Pagamento</Form.Label>
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={lancamento.dataPagamento ? moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate() : null} onChange={date => handleChange('dataPagamento', date)} disabled={onlyView} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Observação</Form.Label>
                            <Form.Control placeholder="Informe a observação..." as="textarea" rows="3" disabled={onlyView} value={lancamento.observacao} onChange={e => handleChange('observacao', e.currentTarget.value)} />
                        </Form.Group>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={clearCallback}>Limpar</Button>
                    <Button variant="primary" onClick={save}>Salvar</Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    lancamento: state.lancamentoForm
});

export default connect(mapStateToProps, {
    setFieldLancamentoFormThunk,
    setLancamentosThunk
})(LancamentoForm);