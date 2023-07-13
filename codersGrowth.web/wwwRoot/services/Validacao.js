sap.ui.define([
  "sap/ui/core/library",
  ], function (coreLibrary) {
    "use strict";
    const ValueStateErro = coreLibrary.ValueState.Error;
    const ValueStatePadrao = coreLibrary.ValueState.None;
    
    return {
    _i18n : null,
    criarModeloI18n: function (i18nModel) {
      debugger
      this._i18n = i18nModel;
    },

    validarNome: function (inpoutAluno) {
      const CampoNome = "CampoNome"
      let aluno = inpoutAluno.getValue()
        if (!aluno) {
          inpoutAluno.setValueState(ValueStateErro);
          inpoutAluno.setValueStateText(this._i18n.getText(CampoNome))
          return false
        }
        else{
          inpoutAluno.setValueState(ValueStatePadrao)
          return true
        }
    },

    validarCpf: function (inpoutCpf) {
      const CampoCpf = "CampoCpf"
      const CampoCpfInvalido = "CampoCpfInvalido"
      let cpf = inpoutCpf.getValue()
      let cpfTamanho = 11
        if (!cpf) {
          inpoutCpf.setValueState(ValueStateErro);
          inpoutCpf.setValueStateText(this._i18n.getText(CampoCpf))
          return false
        }
        else
        {
          if (cpf.length<cpfTamanho) {
            inpoutCpf.setValueState(ValueStateErro)
            inpoutCpf.setValueStateText(this._i18n.getText(CampoCpfInvalido))
            return false
          }
          else{
              inpoutCpf.setValueState(ValueStatePadrao)
              return true
          }
        }
      },

    validarAltura: function (inpoutAltura) {
      const CampoAltura = "CampoAltura"
      let altura = inpoutAltura.getValue()
        if (!altura) {
          inpoutAltura.setValueState(ValueStateErro)
          inpoutAltura.setValueStateText(this._i18n.getText(CampoAltura))
          return false
        }
        else{
          inpoutAltura.setValueState(ValueStatePadrao)
          return true
        }
    },

    validarSexo: function (inputSexo) {
      const CampoSexo = "CampoSexo"
      let sexo = inputSexo.getSelectedKey()
      if (!sexo) {
        inputSexo.setValueState(ValueStateErro)
        inputSexo.setValueStateText(this._i18n.getText(CampoSexo))
        return false
      }
      else{
        inputSexo.setValueState(ValueStatePadrao)
        return true
      }
    },

    validarData: function (inpoutData, buttonData) {
      const CampoData = "CampoData"
      const CampodataIdadeMinima = "CampodataIdadeMinima"
      const CampodataIdadeMaxima = "CampodataIdadeMaxima"
      let data = inpoutData.getValue()
      const idadeMinima = 12
      const idadeMaxima = 80
      const dataAtual = 2023
      const dataTotal = data
      data = new Date(data).getFullYear()
      if (!dataTotal) {
        buttonData.setType(sap.m.ButtonType.Reject)
        buttonData.setText(this._i18n.getText(CampoData))
        return false
      }
      else{
        if(idadeMinima > dataAtual - data)
        {
          buttonData.setType(sap.m.ButtonType.Reject)
          buttonData.setText(this._i18n.getText(CampodataIdadeMinima))
          return false
        }
        else
        {
          if(idadeMaxima < dataAtual - data){
            buttonData.setType(sap.m.ButtonType.Reject)
            buttonData.setText(this._i18n.getText(CampodataIdadeMaxima))
            return false
          }
          else{
            buttonData.setType(sap.m.ButtonType.Default)
            return true
          } 
        }
      }
    }
  };
});