import { axiosInstance } from "./net";

export default class LancamentoService {
  constructor() {
    this.resource = "/lancamentos";
  }

  consultar() {
    return axiosInstance.get(this.resource);
  }

  cadastrar(lancamento) {
    return axiosInstance.post(this.resource, lancamento);
  }

  atualizar(lancamento) {
    return axiosInstance.put(`${this.resource}/${lancamento.id}`, lancamento);
  }

  excluir(id) {
    return axiosInstance.delete(`${this.resource}/${id}`);
  }

  quitarLancamentos(lancamentos) {
    //TODO: realizar chamada para quitar os lancamentos utilizando o id
  }
}
