using FluentMigrator;

namespace trabalho01.crud
{
    [Migration(20230426122200)]
    public class AdicionarTabelas : Migration
    {
        public override void Up()
        {
            Create.Table("Pessoas")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Nome").AsString()
                .WithColumn("CPF").AsString()
                .WithColumn("Altura").AsString()
                .WithColumn("Data de nscimento").AsString()
                .WithColumn("Sexo").AsString();            
        }

        public override void Down()
        {
            Delete.Table("Pessoas");
        }
    }
}
