sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
  ], function (ResourceModel) {
    "use strict";
    return {
      validarInput: function (input) {
        const nome = input.getValue();
        if (!nome) {
          this.mostrarMensagemDeErro(input, "textoInputVazio");
          return false;
        }
        if (!this.validarNome(nome)) {
          this.mostrarMensagemDeErro(input,"textoValidacaoDoNome");
          return false;
        }
        if (!this.validarTamanhoMinimoNome(nome)) {
          this.mostrarMensagemDeErro(input, "textoValidarTamanhoMinimo");
          return false;
        }
        this.removerMensagemDeErro(input);
        return true;
      },
  
      validarSelect: function (select) {
        const valorSelect = select.getSelectedKey();
        if (!valorSelect) {
          this.mostrarMensagemDeErro(select, "textoValidarSelect");
          return false;
        }
        this.removerMensagemDeErro(select);
        return true;
      },
  
      validarDatePicker: function (datePicker) {
        const valorDatePicker = datePicker.getValue();
        if (!valorDatePicker) {
          this.mostrarMensagemDeErro(datePicker, "textoValidarDatePicker");
          return false;
        }
        this.removerMensagemDeErro(datePicker);
        return true;
      },
  
      validarNome: function (nome) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(nome);
      },
  
      validarTamanhoMinimoNome: function (nome) {
        return nome.length >= 2;
      },
  
      mostrarMensagemDeErro: function (campo, mensagem) {
        campo.setValueState(sap.ui.core.ValueState.Error);
        campo.setValueStateText(mensagem);
      },
  
      removerMensagemDeErro: function (campo) {
        campo.setValueState(sap.ui.core.ValueState.None);
      },
    };
  });