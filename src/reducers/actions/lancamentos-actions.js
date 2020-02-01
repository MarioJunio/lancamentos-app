import LancamentoService from '../../services/lancamento-service';

let lancamentoService = new LancamentoService();

// ACTIONS
export const ADD_LANCAMENTO = "ADD_LANCAMENTO";
export const SET_LANCAMENTOS = "SET_LANCAMENTOS";
export const REMOVE_LANCAMENTO = "REMOVE_LANCAMENTO";
export const TOGGLE_CHECK_LANCAMENTO = "TOGGLE_CHECK_LANCAMENTO";

// ACTION CREATOR
export const addLancamentoAction = lancamento => ({
    type: ADD_LANCAMENTO,
    lancamento
});

export const setLancamentosAction = lancamentos => ({
    type: SET_LANCAMENTOS,
    lancamentos
});

export const removeLancamentoAction = lancamento => ({
    type: REMOVE_LANCAMENTO,
    lancamento
});

export const toggleCheckLancamento = idLancamento => ({
    type: TOGGLE_CHECK_LANCAMENTO,
    idLancamento
});

// THUNKS
export function setLancamentosThunk() {
    return async (dispatch) => {
        let r = await lancamentoService.consultar();

        dispatch(setLancamentosAction(r.data));
    }
}

export function alternarChecagemLancamento(idLancamento) {

    return dispatch => {
        dispatch(toggleCheckLancamento(idLancamento));
    }
}