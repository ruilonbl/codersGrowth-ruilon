using System.ComponentModel;
using trabalho01.model;

namespace trabalho01.crud
{
    internal class Repository : IRepositorio
    {
        BindingList<Pessoas> lista = ListSingleton.Lista();
        public BindingList<Pessoas> Atualizar(Pessoas pessoa, int id)
        {
            var pessoaAtualizada = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();
            pessoaAtualizada.Nome = pessoa.Nome;
            pessoaAtualizada.Cpf = pessoa.Cpf;
            pessoaAtualizada.Altura = pessoa.Altura;
            pessoaAtualizada.Dat = pessoa.Dat;
            pessoaAtualizada.Sexo = pessoa.Sexo;
            return lista;
        }

        public void Criar(Pessoas pessoa)
        {
            lista.Add(pessoa);
        }

        public void Deletar(int id)
        {
            var pessoa = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();

            lista.Remove(pessoa);
        }

        public BindingList<Pessoas> ObiterNaListaPorId(int id)
        {
            var pessoa = lista.Where(p => p.Id.Equals(id)).FirstOrDefault();
            if (pessoa == null) return null; 
            return lista;
        }

        public BindingList<Pessoas> ObterTodos()
        {
            return lista;
        }

        public bool VerificaSeExisteCpfNoBanco(string cpf)
        {
            var pessoa = lista.Where(p => p.Cpf.Equals(cpf)).FirstOrDefault();
            if (pessoa == null) return false;
            return true;
        }
    }
}