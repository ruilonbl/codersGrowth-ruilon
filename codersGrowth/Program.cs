using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Configuration;
using System.Windows.Forms;
using trabalho01.crud;
using Microsoft.Extensions.Hosting;

namespace trabalho01
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }

            var builderBanco = CriaHostBuilder();
            var servicesProvider = builderBanco.Build().Services;
            var repositorio = servicesProvider.GetService<IRepositorio>();

            Application.Run(new TelaDeListaDeAlunos(repositorio));
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

        static IHostBuilder CriaHostBuilder()
        {
            return Host.CreateDefaultBuilder()
             .ConfigureServices((context, services) =>
             {
                 services.AddScoped<IRepositorio, RepositorioComBanco>();
             });
        }
    }
}
