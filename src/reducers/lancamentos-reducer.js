import { ADD_LANCAMENTO, SET_LANCAMENTOS, REMOVE_LANCAMENTO, TOGGLE_CHECK_LANCAMENTO } from './actions/lancamentos-actions';

export default function LancamentosReducer(state = [], action) {

    switch (action.type) {

        case ADD_LANCAMENTO:
            return state.push({ ...action.lancamento, checked: false });

        case SET_LANCAMENTOS:
            return action.lancamentos.map(lancamento => {

                return {
                    ...lancamento,
                    checked: false
                }
            });

        case REMOVE_LANCAMENTO:
            return state.filter(l => l.id !== action.lancamento.id);

        case TOGGLE_CHECK_LANCAMENTO:

            if (Number.isInteger(action.idLancamento)) {
                const lancamento = state.find(l => l.id === action.idLancamento);

                if (lancamento) {
                    lancamento.checked = !lancamento.checked;
                }

                return [...state];

            } else {

                return state.map(lancamento => {
                    lancamento.checked = !lancamento.checked;
                    return lancamento;
                });
            }

        default:
            return state;
    }

}