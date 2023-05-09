using BancoDeDados;
using System.ComponentModel;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        private static BindingList<Pessoas> _list = ListSingleton.Lista();
        private readonly IRepositorio _repository;
        private readonly int _id;
        Validacao validacao = new Validacao();
        Pessoas pessoa = new Pessoas();           

        public TelaDeCadastro(int id, IRepositorio repositorio)
        {
            InitializeComponent();
            _id = id;
            _repository = repositorio;
            pessoa = _repository.ObiterNaListaPorId(id);
            PreencherDadosAoAtualizar();
        }

        private void AoClicarEmRegistrar(object sender, EventArgs e)
        {
            try
            {
                pessoa = PreencherDadosParaValidacao();
                validacao.ValidarPessoa(pessoa, _repository);
                PreencherDados(_id);
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void PreencherDadosAoAtualizar()
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
                Text = "Atualizar";
            }
        }

        private void PreencherDados(int id)
        {
            const int idinvalido = 0;
            if(id == idinvalido)
            {
                Registrar();
            }
            else
            {
                Atualizar(id);
            }
        }

        private void Registrar()
        {
            _repository.Criar(pessoa);
            _repository.ObterTodos();
            string cadastrado = "foi cadastrada";
            MensagemDeConfirmacao(cadastrado);
        }

        private void Atualizar(int id)
        {
            _repository.Atualizar(pessoa, _id);
            _repository.ObterTodos();
            string atualizado = "foi atualizada";
            MensagemDeConfirmacao(atualizado);
        }

        private void MensagemDeConfirmacao(string confirmcao)
        {
            MessageBox.Show($"O aluno {pessoa.Nome} {confirmcao}", "Atualizada", MessageBoxButtons.OK);
        }

        private void AoClicarEmSair(object sender, EventArgs e)
        {
            Close();
        }

        private Pessoas PreencherDadosParaValidacao()
        {
            Pessoas pessoa = new Pessoas();
            pessoa.Id = _id;
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
                if (BotaoMasculino.Checked)
                {
                    pessoa.Sexo = Sexo.Masculino.ToString();
                }
            }   
            return pessoa;
        }

        private void PermitirApenasNumeros(KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !Char.IsControl(e.KeyChar) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void ValidarCampoNome(object sender, KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar) && !(e.KeyChar == (char)Keys.Back) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void ValidarCampoCpf(object sender, KeyPressEventArgs e)
        {
            PermitirApenasNumeros(e);
        }

        private void ValidarCampoAltura(object sender, KeyPressEventArgs e)
        {
            PermitirApenasNumeros(e);
        }
    }
}