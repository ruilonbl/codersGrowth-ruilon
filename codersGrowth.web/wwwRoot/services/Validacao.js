sap.ui.define([
    "sap/ui/model/resource/ResourceModel",
    "../model/Formatter",
  ], function (ResourceModel,Formater) {
    "use strict";
    return {
      validarNome: function (aluno) {
      console.log(aluno)
      const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
            let erro = "Erro, nome não pode ser nulo";
            let erroo = "Erro, nome não pode conter número";
            if (aluno == "") {
                return aluno.setValueState(sap.ui.core.ValueState.Error);
            }
            else {
                if (!regex.test(aluno)) {
                    return aluno.setValueState(sap.ui.core.ValueState.Error);
                } else {
                    return aluno.setValueState(sap.ui.core.ValueState.None);
                }
            }
    },
    formatarCpf : function(cpf){
      let cpformatado = cpf.getValue();
      const regexDigito = /\d/;

      if(cpformatado.length==11)
      {
         return cpf.setValue(Formater.formataCPF(cpformatado))
      }else if(!regexDigito.test(cpformatado)){
				return cpf.setValue(cpformatado.replace(/[^\d+]/, ""));
      }    
    }
  };
});