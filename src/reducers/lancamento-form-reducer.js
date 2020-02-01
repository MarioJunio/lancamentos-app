import { SET_FIELD_FORM, CLEAR_FORM, SET_LANCAMENTO_FORM } from './actions/form-actions';

const INIT_STATE = {
    id: null,
    tipo: 'RECEITA',
    descricao: '',
    valor: '',
    dataVencimento: null,
    dataPagamento: null,
    observacao: ''
};

export default function LancamentoFormReducer(state = INIT_STATE, action) {

    switch (action.type) {

        case SET_FIELD_FORM:

            return {
                ...state,
                [action.key]: action.value
            };

        case SET_LANCAMENTO_FORM:
            return action.lancamento

        case CLEAR_FORM:
            return INIT_STATE;

        default:
            return state;
    }

}