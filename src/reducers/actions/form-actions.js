export const SET_FIELD_FORM = "SET_FIELD_FORM";
export const CLEAR_FORM = "CLEAR_FORM";
export const SET_LANCAMENTO_FORM = "SET_LANCAMENTO_FORM";

export const setFieldFormAction = (key, value) => ({
    type: SET_FIELD_FORM,
    key,
    value
});

export const clearFormAction = {
    type: CLEAR_FORM
};

export const setLancamentoForm = lancamento => ({
    type: SET_LANCAMENTO_FORM,
    lancamento
});

// Redux thunks
export const setFieldLancamentoFormThunk = (key, value) => {
    return dispatch => {
        dispatch(setFieldFormAction(key, value));
    }
}

export const setClearLancamentoFormThunk = () => {
    return dispatch => {
        dispatch(clearFormAction);
    }
};

export const setLancamentoFormThunk = lancamento => {
    return dispatch => {
        dispatch(setLancamentoForm(lancamento));
    }
};