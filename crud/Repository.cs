using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using trabalho01.model;

namespace trabalho01.crud
{
    internal class Repository : IRepositorio
    {
        BindingList<Pessoa> lista = ListSingleton.Lista();
        public BindingList<Pessoa> Atualizar(Pessoa pessoa, int id)
        {
            var pessoaAtualizada = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();
            pessoaAtualizada.Nome = pessoa.Nome;
            pessoaAtualizada.Cpf = pessoa.Cpf;
            pessoaAtualizada.Altura = pessoa.Altura;
            pessoaAtualizada.Dat = pessoa.Dat;
            pessoaAtualizada.Sexo = pessoa.Sexo;
            return lista;
        }

        public void Criar(Pessoa pessoa)
        {
            lista.Add(pessoa);
        }

        public void Deletar(int id)
        {
            var pessoa = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();

            lista.Remove(pessoa);
        }

        public BindingList<Pessoa> ListaId(int id)
        {
            var pessoa = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();
            if (pessoa == null) return null; 
            return lista;
        }

        public BindingList<Pessoa> ObterTodos()
        {
            return lista;
        }

        public bool VerificaSeExisteCPFNoBanco(string cpf)
        {
            var pessoa = lista.Where(p => p.Cpf.Equals(cpf)).FirstOrDefault();
            if (pessoa == null) return false;
            return true;
        }
    }
}
