sap.ui.define([
    "sap/m/MessageBox"
    ], function (MessageBox) {
      "use strict";
      return {

      sucesso: function (mensagem,funcaoCallback) {
        return MessageBox.success(mensagem, {
          actions: [MessageBox.Action.OK],
          onClose: (acao) => {
            if (acao === MessageBox.Action.OK) {
              return funcaoCallback.apply(this)
            }
          }
    });
  },

      erro: function (mensagem) {
        return MessageBox.error(mensagem, {
          actions: [MessageBox.Action.OK]
      });
    },

      mensagemDeConfirmacao: function(mensagem,funcaoCallback, id){
          return MessageBox.confirm(mensagem, {
              actions: [MessageBox.Action.YES, MessageBox.Action.NO],
              onClose: (acao) => {
                if (acao === MessageBox.Action.YES) {
                  return funcaoCallback.apply(this, id)
                }
              }
      });
    }
  }
});