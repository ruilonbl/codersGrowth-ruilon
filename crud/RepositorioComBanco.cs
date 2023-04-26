using System;
using System.ComponentModel;
using trabalho01.model;

namespace trabalho01.crud
{
    public class RepositorioComBanco : IRepository
    {
        public BindingList<Pessoa> Atualizar(Pessoa pessoa, int id)
        {
            throw new NotImplementedException();
        }

        public void Criar(Pessoa pessoa)
        {
            throw new NotImplementedException();
        }

        public void Deletar(int id)
        {
            throw new NotImplementedException();
        }

        public BindingList<Pessoa> ListaId(int id)
        {
            throw new NotImplementedException();
        }

        public BindingList<Pessoa> ObterTodos()
        {
            //string de conexão - CadastroPessoas
            //fazer a query para buscar todos os dados dentro da tabela
            return null;
        }

        public bool ProcuraCPF(string cpf)
        {
            throw new NotImplementedException();
        }
    }
}
