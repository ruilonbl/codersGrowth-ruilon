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
        public BindingList<Pessoas> Atualizar(Pessoas pessoa, int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Update(pessoa);
            return ObterTodos();
        }

        public void Criar(Pessoas pessoa)
        {
            using var conexaoLinq2db = Conexao();
            var id = conexaoLinq2db.InsertWithInt32Identity(pessoa);
            pessoa.Id = id;
        }

        public void Deletar(int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.GetTable<Pessoas>().Delete(Pessoas => Pessoas.Id.Equals(id));
        }

        Pessoas IRepositorio.ObiterNaListaPorId(int id)
        {
            using var conexaoLinq2db = Conexao();
            return conexaoLinq2db.GetTable<Pessoas>()
                .FirstOrDefault(Pessoas => Pessoas.Id.Equals(id));
        }

        public BindingList<Pessoas> ObterTodos(string nome = null)
        {
            using var conexaoLinq2db = Conexao();
            var _lista = conexaoLinq2db.GetTable<Pessoas>().ToList();
            return new BindingList<Pessoas>(_lista);
        }

        public bool VerificaSeExisteCpfNoBanco(string cpf)
        {
            using var conexaoLinq2db = Conexao();
            return conexaoLinq2db.GetTable<Pessoas>().Any(Pessoas => Pessoas.Cpf.Equals(cpf));
        }

        private static DataConnection Conexao()
        {
            string CadastroPessoas = ConfigurationManager.ConnectionStrings["CadastroPessoas"].ConnectionString;
            DataConnection conexao = SqlServerTools.CreateDataConnection(CadastroPessoas);
            return conexao;
        }
    }
}
