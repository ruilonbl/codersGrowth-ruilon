using trabalho01.crud;
using trabalho01.model;

namespace BancoDeDados
{
    public class Validacao
    {
        private List<string> _erros = new List<string>();

        public void ValidarPessoa(Pessoas pessoa, IRepositorio repositorio)
        {
            const int idinvalido = 0;
            const int listavalida = 0;
            const int cpfinvalido = 11;
            _erros.Clear();
            if (string.IsNullOrWhiteSpace(pessoa.Nome))
            {
                _erros.Add("O USUARIO NAO DIGITOU O NOME");
            }
            if (string.IsNullOrWhiteSpace(pessoa.Altura))
            {
                _erros.Add("O USUARIO NAO DIGITOU A ALTURA");
            }
            if (string.IsNullOrWhiteSpace(pessoa.Dat))
            {
                _erros.Add("O USUARIO NAO SELECIONOU A DATA");
            }
            if (string.IsNullOrWhiteSpace(pessoa.Cpf))
            {
                _erros.Add("O USUARIO NAO DIGITOU O CPF");
            }
            if (string.IsNullOrWhiteSpace(pessoa.Sexo))
            {
                _erros.Add("O USUARIO NAO SELECIONOU UM SEXO");
            }
            if (pessoa.Id==idinvalido)
            {
                if (repositorio.VerificaSeExisteCpfNoBanco(pessoa.Cpf))
                {
                    _erros.Add($"O cpf {pessoa.Cpf} ja existe");
                }
            }
            if (pessoa.Cpf.Length != cpfinvalido)
            {
                _erros.Add("CPF INVALIDO");
            }
            if (_erros.Count != listavalida)
            {
                var erro = string.Join(Environment.NewLine, _erros);
                _erros.Clear();
                throw new Exception(erro);
            }
        }
    }
}