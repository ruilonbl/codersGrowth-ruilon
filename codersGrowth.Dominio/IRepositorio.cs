using System.ComponentModel;
using trabalho01.model;

namespace trabalho01.crud
{
    public interface IRepositorio
    {
        BindingList<Pessoas> Atualizar(Pessoas pessoa,int id);
        void Criar(Pessoas pessoa);
        void Deletar(int id);
        Pessoas ObiterNaListaPorId(int id);
        bool VerificaSeExisteCpfNoBanco(string cpf);
        BindingList<Pessoas> ObterTodos(string nome = null);
    }
}