using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        private static BindingList<Pessoa> _list = ListSingleton.Lista();
        private readonly Repository _repository = new Repository();
        private List<string> _erros = new List<string>();
        Pessoa pessoa = new Pessoa();      
        int auxCadastra;
        bool atualizar;

        public TelaDeCadastro(int id)
        {
            auxCadastra = id;
            InitializeComponent();
            pessoa = _list.Where(p => p.Id.Equals(id)).FirstOrDefault();
            PreencheDadosAoAtualizar();
        }

        private void AoClicarEmRegistrar(object sender, EventArgs e)
        {
            try
            {
                ValidacaoCamposTexto();
                PreencheDados(auxCadastra);
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            
        }

        public void PreencheDadosAoAtualizar()
        {
            if (pessoa != null)
            { 
                CampoTextoNome.Text = pessoa.Nome;
                CampoTextoCPF.Text = pessoa.Cpf;
                CampoTextoAltura.Text = pessoa.Altura;
                if (pessoa.Sexo.Equals("Feminino"))
                {
                    BotaoFeminino.Checked = true;
                }
                else
                {
                    BotaoMasculino.Checked = true;
                }
                CampoTextoCPF.Enabled = false;
            }
        }

        public Pessoa PreencheDados(int id)
        {
            Pessoa pessoa = new Pessoa();
            if(auxCadastra == 0)
            {
                pessoa = ConverterDadosDaTelaEmPessoa();
            }
            else
            {
                pessoa = AtualizaPessoa(id);
            }
            return pessoa;
        }

        public Pessoa ConverterDadosDaTelaEmPessoa()
        {
            Pessoa pessoa = new Pessoa();
            atualizar = false;
            pessoa.Id = ListSingleton.cont(atualizar);
            pessoa.Nome = CampoTextoNome.Text;
            pessoa.Cpf = CampoTextoCPF.Text;
            pessoa.Altura = CampoTextoAltura.Text;
            pessoa.Dat = dateTime.Text.ToString();
            if (BotaoFeminino.Checked)
            {
                pessoa.Sexo = Sexo.Feminino.ToString();
            }
            else
            {
                pessoa.Sexo = Sexo.Masculino.ToString();
            }
            _repository.Criar(pessoa);
            return pessoa;
        }

        public Pessoa AtualizaPessoa(int id)
        {
            var pessoaAtualizada = _list.Where(p => p.Id.Equals(id)).FirstOrDefault();
            pessoaAtualizada.Nome = CampoTextoNome.Text;
            pessoaAtualizada.Cpf = CampoTextoCPF.Text;
            pessoaAtualizada.Altura = CampoTextoAltura.Text;
            pessoaAtualizada.Dat = dateTime.Text.ToString();
            if (BotaoFeminino.Checked)
            {
                pessoaAtualizada.Sexo = Sexo.Feminino.ToString();
            }
            else
            {
                pessoaAtualizada.Sexo = Sexo.Masculino.ToString();
            }
            _repository.atualizar(pessoaAtualizada, auxCadastra);
            return pessoaAtualizada;
        }

        private void SAIR(object sender, EventArgs e)
        {
            Close();
        }

        public void ValidacaoCamposTexto()
        {
            _erros.Clear();
            if (string.IsNullOrWhiteSpace(CampoTextoNome.Text))
            {
                _erros.Add("O USUARIO NAO DIGITOU O NOME");
            }
            if (string.IsNullOrWhiteSpace(CampoTextoAltura.Text))
            {
                _erros.Add("O USUARIO NAO DIGITOU A ALTURA");
            }
            if (string.IsNullOrWhiteSpace(dateTime.Text.ToString()))
            {
                _erros.Add("O USUARIO NAO SELECIONOU A DATA");
            }
            if (string.IsNullOrWhiteSpace(CampoTextoCPF.Text))
            {
                _erros.Add("O USUARIO NAO DIGITOU O CPF");
            }
            if (!BotaoFeminino.Checked && !BotaoMasculino.Checked)
            {
                _erros.Add("O USUARIO NAO SELECIONOU UM SEXO");
            }
            if (auxCadastra == 0)
            {
                if (_repository.ProcuraCPF(CampoTextoCPF.Text) == true)
                {
                    _erros.Add("CPF JA EXISTE");
                }
            }
            if (CampoTextoCPF.Text.Length != 11)
            {
                _erros.Add("CPF INVALIDO");
            }
            if (_erros.Count != 0)
            {
                var erro = string.Join(Environment.NewLine, _erros);
                _erros.Clear();
                throw new Exception(erro);
            }
        }

        public static void validaCampoNumero(KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar) && !(e.KeyChar == (char)Keys.Back) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        public static void validaCampoLetra(KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !Char.IsControl(e.KeyChar) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void NaoDeixaDigitarNumeroNoCampoNome(object sender, KeyPressEventArgs e)
        {
            validaCampoNumero(e);
        }

        private void NaoDeixaDigitarLetraNoCampoCPF(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }

        private void NaoDeixaDigitarLetraNoCampoAltura(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }
    }
}
