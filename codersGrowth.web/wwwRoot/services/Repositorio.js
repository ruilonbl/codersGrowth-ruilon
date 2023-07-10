sap.ui.define([
], function () {
  "use strict";
  return {
    _Url: 'https://localhost:7020/api/',
    _i18n : null,

    _mandarRequisicao: async function (urlDoMetodo, opcoesDoMetodo) {
      var urlInteira = this._Url + urlDoMetodo;
      return fetch(urlInteira, opcoesDoMetodo)
      .then ((resposta) => {
        if(opcoesDoMetodo.method =="DELETE")
        {
            return resposta.status
        }
        return resposta.json()
      });
    },

    _get: function (Url) {
      return this._mandarRequisicao(Url, { method: "GET" });
    },

    _post: function (Url, aluno) {
      return this._mandarRequisicao(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
    },

    _put: function (Url, aluno) {
      return this._mandarRequisicao(Url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
    },

    _delete: function (Url) {
      return this._mandarRequisicao(Url, { method: "DELETE" });
    },

    pegarAlunos: function (alunoFiltro) {
      if(alunoFiltro)
      {
         return this._get("alunos?nome="+alunoFiltro);
      }
      return this._get("alunos");
    },

    pegarAlunoPeloId: function (id) {
      return this._get("alunos/"+id);
    },

    criarAluno: function (aluno) {
      return this._post("alunos/", aluno);
    },

    editarAluno: function (id, aluno) {
      return this._put("alunos/"+id, aluno);
    },

    deletarAluno: function (id) {
      return this._delete("alunos/"+id);
    },

    criarModeloI18n: function (i18nModel) {
      this._i18n = i18nModel;
    }
  };
});