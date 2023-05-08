using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.SqlServer;
using System.ComponentModel;
using System.Configuration;
using trabalho01.crud;
using trabalho01.model;

namespace codersGrowth.Infra.Data
{
    public class RepositorioLinq2DB : IRepositorio
    {
        BindingList<Pessoas> lista = ListSingleton.Lista();
        public BindingList<Pessoas> Atualizar(Pessoas pessoa, int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Update(pessoa);
            return lista;
        }

        public void Criar(Pessoas pessoa)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Insert(pessoa);
        }

        public void Deletar(int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Delete(id);
        }

        public BindingList<Pessoas> ObiterNaListaPorId(int id)
        {
            throw new NotImplementedException();
        }

        public BindingList<Pessoas> ObterTodos()
        {
            throw new NotImplementedException();
        }

        public bool VerificaSeExisteCpfNoBanco(string cpf)
        {
            throw new NotImplementedException();
        }
        public DataConnection Conexao()
        {
            string CadastroPessoas = ConfigurationManager.ConnectionStrings["CadastroPessoas"].ConnectionString;
            DataConnection conexao = SqlServerTools.CreateDataConnection(CadastroPessoas);
            return conexao;

        }
    }
}
