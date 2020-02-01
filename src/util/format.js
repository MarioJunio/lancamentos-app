import Moment from 'moment';

const LOCALE = 'pt-BR';

Moment.locale(LOCALE);

export const numberFormat = (value) => new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'BRL'
}).format(value);

export const dateFormat = (date) => Moment(date).format('DD/MM/YYYY');