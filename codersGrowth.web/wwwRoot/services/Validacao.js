sap.ui.define([
  "sap/ui/core/library"
  ], function (coreLibrary) {
    "use strict";
    const ValueStateErro = coreLibrary.ValueState.Error;
    const ValueStatePadrao = coreLibrary.ValueState.None;
    return {
    validarNome: function (inpoutAluno) {

    let aluno = inpoutAluno.getValue()
      if (!aluno) {
        inpoutAluno.setValueState(ValueStateErro);
        inpoutAluno.setValueStateText("Por favor preencha o campo do nome")
        return false
      }
      else{
        inpoutAluno.setValueState(ValueStatePadrao)
        return true
      }
    },

    validarCpf: function (inpoutCpf) {
      let cpf = inpoutCpf.getValue()
      let cpfTamanho = 11
        if (!cpf) {
          inpoutCpf.setValueState(ValueStateErro);
          inpoutCpf.setValueStateText("Por favor preencha o campo do cpf")
          return false
        }
        else
        {
          if (cpf.length<cpfTamanho) {
            inpoutCpf.setValueState(ValueStateErro)
            inpoutCpf.setValueStateText("Cpf invalido")
            return false
          }
          else{
              inpoutCpf.setValueState(ValueStatePadrao)
              return true
          }
        }
      },

    validarAltura: function (inpoutAltura) {
      let altura = inpoutAltura.getValue()
        if (!altura) {
          inpoutAltura.setValueState(ValueStateErro)
          inpoutAltura.setValueStateText("Por favor preencha o campo da altura")
          return false
        }
        else{
          inpoutAltura.setValueState(ValueStatePadrao)
          return true
        }
    },

    validarSexo: function (inputSexo) {
      let sexo = inputSexo.getSelectedKey()
      if (!sexo) {
        inputSexo.setValueState(ValueStateErro)
        inputSexo.setValueStateText("Por favor selecione o seu Sexo")
        return false
      }
      else{
        inputSexo.setValueState(ValueStatePadrao)
        return true
      }
    },

    validarData: function (inpoutData) {
      let data = inpoutData.getValue()
      let idadeMinima = 12
      let idadeMaxima = 80
      let dataAtual = 2023
      let dataTotal =data
      data = new Date(data).getFullYear()

      if (!dataTotal) {
        inpoutData.setValueState(ValueStateErro)
        inpoutData.setValueStateText("Por favor seleciona a sua data de nascimento")
        return false
      }
      else{
        if(idadeMinima > dataAtual - data)
        {
          inpoutData.setValueState(ValueStateErro)
          inpoutData.setValueStateText("Idade minima de 12 anos")
          return false
        }
        else
        {
          if(idadeMaxima < dataAtual - data){
            inpoutData.setValueState(ValueStateErro)
            inpoutData.setValueStateText("Idade maxima de 80 anos")
            return false
          }
          else{
            inpoutData.setValueState(ValueStatePadrao)
            return true
          } 
        }
               
      }
    }
  };
});