sap.ui.define([
   "../const/Const",
   "../services/MensagemTela"
], function (Const,MensagemTela) {
  "use strict";
  return {
    _Url: 'https://localhost:7020/api/',
    _i18n : null,

    _mandarRequisicao: async function (urlDoMetodo, opcoesDoMetodo) {
      var urlInteira = this._Url + urlDoMetodo;
      debugger
      return fetch(urlInteira, opcoesDoMetodo)
      .then ((resposta) => {
        debugger
        if(opcoesDoMetodo.method =="DELETE")
        {
            return resposta.status
        }
        return resposta.json()
      })

    },

    _get: function (_Url) {
      return this._mandarRequisicao(_Url, { method: "GET" });
    },

    _post: function (_Url, aluno) {
      return this._mandarRequisicao(_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
    },

    _put: function (_Url, aluno) {
      return this._mandarRequisicao(_Url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
    },

    _delete: function (_Url) {
      return this._mandarRequisicao(_Url, { method: "DELETE" });
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

    errosDofetch: function(method,erroTexto)
    {
      debugger
        const CaixaDeDialogoCadastroErro = "CaixaDeDialogoCadastroErro"
        const CaixaDeDialogoExcluirErro = "CaixaDeDialogoExcluirErro"
        const CaixaDeDialogoAtualizarErro = "CaixaDeDialogoAtualizarErro"
        const IDinvalido = "ID não existente"
        if(erroTexto==IDinvalido)
          {
            return false
          }
        if(method=="GET")
        {
          MensagemTela.erro(this._i18n.getText(CaixaDeDialogoCadastroErro))
          return false
        }
        else
        {
          if(method=="DELETE")
          {
            MensagemTela.erro(this._i18n.getText(CaixaDeDialogoExcluirErro))
            return false
          }
          else
          {
            MensagemTela.erro(this._i18n.getText(CaixaDeDialogoAtualizarErro))
            return false
          }
          
        }
    },

    criarModeloI18n: function (i18nModel) {
      this._i18n = i18nModel;
    }
  };
});