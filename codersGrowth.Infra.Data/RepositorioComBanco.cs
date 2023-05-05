using Microsoft.Data.SqlClient;
using System.ComponentModel;
using System.Configuration;
using System.Data.Common;
using trabalho01.model;

namespace trabalho01.crud
{
    public class RepositorioComBanco : IRepositorio
    {
        static string teste = ConfigurationManager.ConnectionStrings["CadastroPessoas"].ConnectionString;
        BindingList<Pessoa> lista = ListSingleton.Lista();

        public BindingList<Pessoa> Atualizar(Pessoa pessoa, int id)
        {
            string query = $"update Pessoas set Nome='{pessoa.Nome}', CPF='{pessoa.Cpf}', Altura='{pessoa.Altura}', " +
                           $"Data_de_nascimento='{pessoa.Dat}', Sexo='{pessoa.Sexo}' where Id='{id}'";

            using (SqlConnection connection = new SqlConnection(teste))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                command.ExecuteNonQuery();
            }
            return lista;
        }

        public void Criar(Pessoa pessoa)
        {
            string query = "insert into Pessoas" +
                    "(Nome,CPF,Altura,Data_de_nascimento,Sexo)" +
                    "VALUES"+
                    "(@Nome,@CPF,@Altura,@Data_de_nascimento,@Sexo)";

            using (SqlConnection connection = new SqlConnection(
               teste))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Nome", pessoa.Nome);
                    command.Parameters.AddWithValue("@CPF", pessoa.Cpf);
                    command.Parameters.AddWithValue("@Altura", pessoa.Altura);
                    command.Parameters.AddWithValue("@Data_de_nascimento", pessoa.Dat);
                    command.Parameters.AddWithValue("@Sexo" ,pessoa.Sexo);
                    command.ExecuteNonQuery();
                }
            }            
        }

        public void Deletar(int id)
        {
            string query = $"delete from Pessoas where Id = {id}";
            using (SqlConnection connection = new SqlConnection(teste))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                command.ExecuteNonQuery();
            }
        }

        public BindingList<Pessoa> ObiterNaListaPorId(int id)
        {
            string query = $"select * from Pessoas where Id={id}";
            using (SqlConnection connection = new SqlConnection(teste))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                SqlDataReader dr = command.ExecuteReader();
                lista.Clear();
                while (dr.Read())
                {
                    Pessoa pessoa = new Pessoa()
                    {
                        Id = (int)dr.GetInt64(0),
                        Nome = (string)dr.GetString(1),
                        Cpf = (string)dr.GetString(2),
                        Altura = (string)dr.GetString(3),
                        Dat = (string)dr.GetString(4),
                        Sexo = (string)dr.GetString(5),
                    };

                    lista.Add(pessoa);
                }

            }
            return lista;
        }

        public BindingList<Pessoa> ObterTodos()
        {
            string query = "select * from Pessoas";
            using (SqlConnection connection = new SqlConnection(teste))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(query, connection);
                SqlDataReader dr = command.ExecuteReader();
                lista.Clear();
                while (dr.Read())
                {
                    Pessoa pessoa = new Pessoa()
                    {
                        Id = (int)dr.GetInt64(0),
                        Nome = (string)dr.GetString(1),
                        Cpf = (string)dr.GetString(2),
                        Altura = (string)dr.GetString(3),
                        Dat = (string)dr.GetString(4),
                        Sexo = (string)dr.GetString(5),
                    };

                    lista.Add(pessoa);
                }

            }
                return lista;
        }

        public bool VerificaSeExisteCpfNoBanco(string cpf)
        {
            string query = $"select * from Pessoas where CPF = @cpf";
            using (var connection = new SqlConnection(teste))
            {
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@cpf", cpf);
                    connection.Open();
                    var dataReader = command.ExecuteReader();
                    var existe = dataReader.Cast<DbDataRecord>().Any();
                    dataReader.Close();
                    return existe;
                }
            }

        }
    }
}
