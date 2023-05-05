using System.ComponentModel;
using trabalho01.model;

namespace trabalho01.crud
{
    public interface IRepositorio
    {
        BindingList<Pessoa> Atualizar(Pessoa pessoa,int id);
        void Criar(Pessoa pessoa);
        void Deletar(int id);
        BindingList<Pessoa> ObiterNaListaPorId(int id);
        bool VerificaSeExisteCpfNoBanco(string cpf);
        BindingList<Pessoa> ObterTodos();
    }
}