import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Form, Button, ButtonToolbar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert";

import { numberFormat, dateFormat } from "../util/format";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faHandshake,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import {
  setClearLancamentoFormThunk,
  setLancamentoFormThunk
} from "../reducers/actions/form-actions";
import {
  setLancamentosThunk,
  alternarChecagemLancamento
} from "../reducers/actions/lancamentos-actions";

import LancamentoForm from "./lancamento-form";

import "../css/lancamentos.css";
import LancamentoService from "../services/lancamento-service";

function Lancamentos({
  lancamentos,
  setClearLancamentoFormThunk,
  setLancamentoFormThunk,
  setLancamentosThunk,
  alternarChecagemLancamento
}) {
  const [visibleLancamentoForm, setVisibleLancamentoForm] = useState(false);
  const [viewLancamentoForm, setViewLancamentoForm] = useState(false);
  const [dataPagamentoLote, setDataPagamentoLote] = useState(new Date());
  const [confirmQuitacaoLote, setConfirmQuitacaoLote] = useState(false);

  const lancamentoService = new LancamentoService();

  useEffect(() => {
    if (confirmQuitacaoLote) {
      confirmarQuitacao();
    }
  });

  function renderCheckBox(lancamento) {
    const id = lancamento ? lancamento.id : "all";
    const checked = lancamento ? lancamento.checked : false;

    return lancamento ? (
      <Form.Check
        custom
        type="checkbox"
        checked={checked}
        id={id}
        onChange={e => alternarChecagemLancamento(id)}
        label=""
      />
    ) : (
      <Form.Check
        custom
        type="checkbox"
        id={id}
        onChange={e => alternarChecagemLancamento(id)}
        label=""
      />
    );
  }

  const abrirFormLancamentoCadastro = () => {
    setVisibleLancamentoForm(true);
    setClearLancamentoFormThunk();
  };

  const abrirFormLancamentoVisualizacao = lancamento => {
    setVisibleLancamentoForm(true);
    setViewLancamentoForm(true);
    setLancamentoFormThunk(lancamento);
  };

  const abrirFormLancamentoEdicao = lancamento => {
    setVisibleLancamentoForm(true);
    setLancamentoFormThunk(lancamento);
  };

  const limparCamposFormLancamento = () => {
    setClearLancamentoFormThunk();
  };

  const fecharFormLancamento = () => {
    setVisibleLancamentoForm(false);
    setViewLancamentoForm(false);
  };

  const realizarQuitacao = () => {
    console.log("realizar quitacao", dataPagamentoLote);
  };

  const realizarExclusao = idLancamento => {
    lancamentoService.excluir(idLancamento).then(() => {
      setLancamentosThunk();
    });
  };

  const confirmarQuitacao = () => {
    setConfirmQuitacaoLote(true);

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-dialog">
            <h1>Confirmação</h1>
            <p>
              Você confirma a quitação em lote dos lançamentos selecionados?
            </p>

            <Form.Group>
              <DatePicker
                selected={dataPagamentoLote}
                onChange={date => setDataPagamentoLote(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="Data pagamento"
              />
            </Form.Group>

            <Button
              variant="success"
              className="col-3"
              onClick={realizarQuitacao}
            >
              Confirmar
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="offset-4 col-3"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
          </div>
        );
      },
      willUnmount: () => {
        setConfirmQuitacaoLote(false);
      }
    });
  };

  const confirmarExclusao = lancamento => {
    confirmAlert({
      title: "Remoção",
      message: `Você confirma a remoção do lançamento: ${lancamento.descricao}?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => realizarExclusao(lancamento.id)
        },
        {
          label: "Não"
        }
      ]
    });
  };

  const temLancamentosChecados = () => {
    let flag = false;

    for (var i = 0; i < lancamentos.length; i++) {
      const lancamento = lancamentos[i];

      if (lancamento.checked) {
        flag = true;
        break;
      }
    }

    return flag;
  };

  return (
    <div className="page-container">
      <LancamentoForm
        visible={visibleLancamentoForm}
        onlyView={viewLancamentoForm}
        closeCallback={fecharFormLancamento}
        clearCallback={limparCamposFormLancamento}
      />

      <ButtonToolbar>
        <div className="left">
          <Button
            variant="success"
            disabled={!temLancamentosChecados()}
            size="sm"
            onClick={confirmarQuitacao}
          >
            <FontAwesomeIcon icon={faHandshake} /> Quitar
          </Button>
        </div>

        <div className="right">
          <Button
            variant="primary"
            size="sm"
            onClick={abrirFormLancamentoCadastro}
          >
            <FontAwesomeIcon icon={faPlus} /> Novo
          </Button>
        </div>
      </ButtonToolbar>

      <Table responsive hover size="sm" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th className="col-check-size">{renderCheckBox(null)}</th>
            <th>Descrição</th>
            <th className="col-small-size">Valor</th>
            <th className="col-small-size">Tipo</th>
            <th className="col-date-size">Data Vencimento</th>
            <th className="col-date-size">Data Pagamento</th>
            <th className="col-actions-size"></th>
          </tr>
        </thead>

        <tbody>
          {lancamentos.map(lancamento => {
            const pago = lancamento.dataPagamento !== null;

            return (
              <tr key={lancamento.id}>
                <td className="col-check-size">
                  {!pago ? renderCheckBox(lancamento) : null}
                </td>
                <td>{lancamento.descricao}</td>
                <td>{numberFormat(lancamento.valor)}</td>
                <td>{lancamento.tipo === "RECEITA" ? "Receita" : "Despesa"}</td>
                <td>
                  {lancamento.dataVencimento != null
                    ? dateFormat(lancamento.dataVencimento)
                    : "Não possui vencimento"}
                </td>
                <td>
                  {lancamento.dataPagamento !== null
                    ? dateFormat(lancamento.dataPagamento)
                    : "Em aberto"}
                </td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => abrirFormLancamentoVisualizacao(lancamento)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => abrirFormLancamentoEdicao(lancamento)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => confirmarExclusao(lancamento)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default connect(null, {
  setLancamentoFormThunk,
  setClearLancamentoFormThunk,
  setLancamentosThunk,
  alternarChecagemLancamento
})(Lancamentos);
