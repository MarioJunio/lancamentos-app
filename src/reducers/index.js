import { combineReducers } from 'redux';

import LancamentoFormReducer from './lancamento-form-reducer';
import LancamentosReducer from './lancamentos-reducer';

export default combineReducers({
    lancamentoForm: LancamentoFormReducer,
    lancamentos: LancamentosReducer
});