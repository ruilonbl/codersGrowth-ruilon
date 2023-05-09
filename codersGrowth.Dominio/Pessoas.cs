using LinqToDB.Mapping;

namespace trabalho01.model
{
    [Table (Name = "Pessoas")]
    public class Pessoas
    {
        [PrimaryKey,Identity]
        public int Id { get; set; }

        [Column(Name = "Nome")]
        public string Nome { get; set; }

        [Column(Name ="CPF")]
        public string Cpf { get; set; }

        [Column(Name = "Altura")]
        public string Altura { get; set;}

        [Column(Name = "Data_de_nascimento")]
        public DateTime Dat { get; set; }

        [Column(Name = "Sexo")]
        public string Sexo { get; set; }
    }
}
