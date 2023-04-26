using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Windows.Forms;
using trabalho01.crud;

namespace trabalho01
{
    class Program
    {
        /// <summary>
        /// Ponto de entrada principal para o aplicativo.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new TelaDeListaDeAlunos());
        }

        static string teste = ConfigurationManager.ConnectionStrings["CadastroPessoas"].ConnectionString;

        private static ServiceProvider CreateServices()
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                .AddSqlServer2016()
                .WithGlobalConnectionString(teste)
                .ScanIn(typeof(AdicionarTabelas).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        private static void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();

            runner.MigrateUp();
        }
    }
}
