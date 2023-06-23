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
          return inpoutAluno.setValueStateText("Por favor preencha o campo do nome")
      }
      else{
        return inpoutAluno.setValueState(sap.ui.core.ValueState.None)
      }
    },
    validarCpf: function (inpoutCpf) {
      let cpf = inpoutCpf.getValue()
      let cpfTamanho = 12
        if (cpf == "") {
          inpoutCpf.setValueState(sap.ui.core.ValueState.Error);
          return inpoutCpf.setValueStateText("Por favor preencha o campo do cpf")
        }
        else
        {
          if (cpf.length<cpfTamanho) {
            inpoutCpf.setValueState(sap.ui.core.ValueState.Error)
            return inpoutCpf.setValueStateText("Cpf invalido")
          }
          else{
            return inpoutCpf.setValueState(sap.ui.core.ValueState.None)
          }
        }
      },
    validarAltura: function (inpoutAltura) {
      let altura = inpoutAltura.getValue()
        if (altura == "") {
          inpoutAltura.setValueState(sap.ui.core.ValueState.Error)
          return inpoutAltura.setValueStateText("Por favor preencha o campo da altura")
        }
        else{
          return inpoutAltura.setValueState(sap.ui.core.ValueState.None)
        }
    },
    validarSexo: function (inpoutSexo) {
      let sexo = inpoutSexo.getSelectedKey()
      if (sexo == "") {
        inpoutSexo.setValueState(sap.ui.core.ValueState.Error)
        return inpoutSexo.setValueStateText("Por favor selecione o seu Sexo")
      }
      else{
        return inpoutSexo.setValueState(sap.ui.core.ValueState.None)
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
        return inpoutData.setValueStateText("Por favor seleciona a sua data de nascimento")
      }
      else{
        if(idadeMinima > dataAtual - data)
        {
          inpoutData.setValueState(sap.ui.core.ValueState.Error)
          return inpoutData.setValueStateText("Idade minima de 12 anos")
        }
        else
        {
          if(idadeMaxima < dataAtual - data){
            inpoutData.setValueState(sap.ui.core.ValueState.Error)
            return inpoutData.setValueStateText("Idade maxima de 80 anos")
          }
          else{
            return inpoutData.setValueState(sap.ui.core.ValueState.None)
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