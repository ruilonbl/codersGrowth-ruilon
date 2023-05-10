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
        private List<Pessoas> _lista = new List<Pessoas>();
        private BindingList<Pessoas> _list = ListSingleton.Lista();

        public BindingList<Pessoas> Atualizar(Pessoas pessoa, int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Update(pessoa);
            return _list;
        }

        public void Criar(Pessoas pessoa)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.Insert(pessoa);
        }

        public void Deletar(int id)
        {
            using var conexaoLinq2db = Conexao();
            conexaoLinq2db.GetTable<Pessoas>().Delete(Pessoas => Pessoas.Id.Equals(id));
        }

        Pessoas IRepositorio.ObiterNaListaPorId(int id)
        {
            using var conexaoLinq2db = Conexao();
            return conexaoLinq2db.GetTable<Pessoas>().FirstOrDefault(Pessoas => Pessoas.Id.Equals(id));
        }

        public BindingList<Pessoas> ObterTodos()
        {
            using var conexaoLinq2db = Conexao();
            _lista.Clear();
            _lista = conexaoLinq2db.GetTable<Pessoas>().ToList();
            var bind = new BindingList<Pessoas>(_lista);
            return bind;
        }

        public bool VerificaSeExisteCpfNoBanco(string cpf)
        {
            using var conexaoLinq2db = Conexao();
            return conexaoLinq2db.GetTable<Pessoas>().Any(Pessoas => Pessoas.Cpf.Equals(cpf));

        }
        public DataConnection Conexao()
        {
            string CadastroPessoas = ConfigurationManager.ConnectionStrings["CadastroPessoas"].ConnectionString;
            DataConnection conexao = SqlServerTools.CreateDataConnection(CadastroPessoas);
            return conexao;

        }

        
    }
}
