using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO.Packaging;
using System.Linq;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        private static BindingList<Pessoa> _list = ListSingleton.Lista();
        private readonly RepositorioComBanco _repository = new RepositorioComBanco();
        private List<string> _erros = new List<string>();
        private TelaDeListaDeAlunos _telalista = new TelaDeListaDeAlunos();
        Pessoa pessoa = new Pessoa();      
        int ID;
        bool atualizar;

        public TelaDeCadastro(int id)
        {
            InitializeComponent();
            ID = id;
            pessoa = _list.Where(p => p.Id.Equals(id)).FirstOrDefault();
            PreencheDadosAoAtualizar();
        }

        private void AoClicarEmRegistrar(object sender, EventArgs e)
        {
            try
            {
                ValidacaoCamposTexto();
                PreencheDados(ID);
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
                this.Text = "Atualizar";
            }
        }

        public Pessoa PreencheDados(int id)
        {
            Pessoa pessoa = new Pessoa();
            if(id == 0)
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
            _repository.ObterTodos();
            MessageBox.Show($"O aluno {pessoa.Nome} foi cadastrada", "Cadastrada", MessageBoxButtons.OK);
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
            _repository.Atualizar(pessoaAtualizada, ID);
            MessageBox.Show($"O aluno {pessoa.Nome} foi atualizada", "Atualizada", MessageBoxButtons.OK);
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
            if (ID == 0)
            {
                if (_repository.VerificaSeExisteCPFNoBanco(CampoTextoCPF.Text))
                {
                    _erros.Add($"O cpf {CampoTextoCPF.Text} ja existe");
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

        public static void ValidaSeTemNumerosNosCampos(KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar) && !(e.KeyChar == (char)Keys.Back) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        public static void ValidaSeTemLetrasNosCampos(KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !Char.IsControl(e.KeyChar) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void NaoDeixaDigitarNumeroNoCampoNome(object sender, KeyPressEventArgs e)
        {
            ValidaSeTemNumerosNosCampos(e);
        }

        private void NaoDeixaDigitarLetraNoCampoCPF(object sender, KeyPressEventArgs e)
        {
            ValidaSeTemLetrasNosCampos(e);
        }

        private void NaoDeixaDigitarLetraNoCampoAltura(object sender, KeyPressEventArgs e)
        {
            ValidaSeTemLetrasNosCampos(e);
        }

        private void TelaDeCadastro_Load(object sender, EventArgs e)
        {
        }

        private void CampoTextoNome_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
