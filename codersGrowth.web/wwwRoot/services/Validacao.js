sap.ui.define([
    "sap/ui/model/resource/ResourceModel",
    "../model/Formatter",
  ], function (ResourceModel,Formater) {
    "use strict";
    return {
    validarNome: function (inpoutAluno) {
    let aluno = inpoutAluno.getValue()
      if (aluno == "") {
        inpoutAluno.setValueState(sap.ui.core.ValueState.Error);
          inpoutAluno.setValueStateText("Por favor preencha o campo do nome")
          return false
      }
      else{
        inpoutAluno.setValueState(sap.ui.core.ValueState.None)
        return true
      }
    },
    validarCpf: function (inpoutCpf) {
      let cpf = inpoutCpf.getValue()
      let cpfTamanho = 12
        if (cpf == "") {
          inpoutCpf.setValueState(sap.ui.core.ValueState.Error);
          inpoutCpf.setValueStateText("Por favor preencha o campo do cpf")
          return false
        }
        else
        {
          if (cpf.length<cpfTamanho) {
            inpoutCpf.setValueState(sap.ui.core.ValueState.Error)
            inpoutCpf.setValueStateText("Cpf invalido")
            return false
          }
          else{
              inpoutCpf.setValueState(sap.ui.core.ValueState.None)
              return true
          }
        }
      },
    validarAltura: function (inpoutAltura) {
      let altura = inpoutAltura.getValue()
        if (altura == "") {
          inpoutAltura.setValueState(sap.ui.core.ValueState.Error)
          inpoutAltura.setValueStateText("Por favor preencha o campo da altura")
          return false
        }
        else{
          inpoutAltura.setValueState(sap.ui.core.ValueState.None)
          return true
        }
    },
    validarSexo: function (inpoutSexo) {
      let sexo = inpoutSexo.getSelectedKey()
      if (sexo == "") {
        inpoutSexo.setValueState(sap.ui.core.ValueState.Error)
        inpoutSexo.setValueStateText("Por favor selecione o seu Sexo")
        return false
      }
      else{
        inpoutSexo.setValueState(sap.ui.core.ValueState.None)
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
      if (dataTotal == "") {
        inpoutData.setValueState(sap.ui.core.ValueState.Error)
        inpoutData.setValueStateText("Por favor seleciona a sua data de nascimento")
        return false
      }
      else{
        if(idadeMinima > dataAtual - data)
        {
          inpoutData.setValueState(sap.ui.core.ValueState.Error)
          inpoutData.setValueStateText("Idade minima de 12 anos")
          return false
        }
        else
        {
          if(idadeMaxima < dataAtual - data){
            inpoutData.setValueState(sap.ui.core.ValueState.Error)
            inpoutData.setValueStateText("Idade maxima de 80 anos")
            return false
          }
          else{
            inpoutData.setValueState(sap.ui.core.ValueState.None)
            return true
          } 
        }
               
      }
    },
    formatarCpf : function(cpf){
      let cpformatado = cpf.getValue()
      if(cpformatado.length==11)
      {
         return cpf.setValue(Formater.formataCPF(cpformatado))
      }else {
				return cpf.setValue(cpformatado.replaceAll(/[^0-9]/g,''))
      }    
    },
    formatarAltura : function(altura){
      let alturaFormatada = altura.getValue()
      return altura.setValue(alturaFormatada.replace(/[^\d]/g, ""))
    }
  };
});