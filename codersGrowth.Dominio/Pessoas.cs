using LinqToDB.Mapping;

namespace trabalho01.model
{
    public class Pessoas
    {
        [PrimaryKey,Identity]
        public int Id { get; set; }
        public string Nome { get; set; }
        [Column(Name ="{CPF}")]
        public string Cpf { get; set; }
        public string Altura { get; set;}
        [Column(Name = "{Data_de_nascimento}")]
        public string Dat { get; set; }
        public string Sexo { get; set; }
    }
}
