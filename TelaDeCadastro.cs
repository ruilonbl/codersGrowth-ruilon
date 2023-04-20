using System;
using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using trabalho01.crud;
using trabalho01.model;

namespace trabalho01
{
    public partial class TelaDeCadastro : Form
    {
        Validacao Validacao = new Validacao();
        Pessoa p;
        public TelaDeCadastro(Pessoa pessoa)
        {
            InitializeComponent();
            p = pessoa;
            if (pessoa == null)
            {
                p = RecebePessoas(pessoa);
            }
        }
        private void AoclicarRegistrar(object sender, EventArgs e)
        {
            try
            {
                Validacao.ValidacaoCamposTexto(p);
            } catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ALERTA", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                Close();
            }
            
        }

        public Pessoa RecebePessoas(Pessoa pessoacadastro)
        {
            Pessoa pessoa = new Pessoa();
            pessoa.Id = ListSingleton.cont(pessoa);
            pessoa.Nome = txt_nome.Text;
            pessoa.Cpf = txt_cpf.Text;
            pessoa.Altura = txt_altura.Text;
            pessoa.Dat = dateTime.Text.ToString();
            if (rb_Feminino.Checked)
            {
                pessoa.Sexo = "Feminino";
            }
            else
            {
                pessoa.Sexo = "Masculino";
            }
            return pessoa;
        }

        private void SAIR(object sender, EventArgs e)
        {
            Close();
        }
        public static void validaCampoNumero(KeyPressEventArgs e)
        {
            if (!char.IsLetter(e.KeyChar) && !(e.KeyChar == (char)Keys.Back) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }
        public static void validaCampoLetra(KeyPressEventArgs e)
        {
            if (!char.IsNumber(e.KeyChar) && !Char.IsControl(e.KeyChar) && !(e.KeyChar == (char)Keys.Space)) e.Handled = true;
        }

        private void txt_nome_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoNumero(e);
        }

        private void txt_cpf_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }

        private void txt_altura_KeyPress(object sender, KeyPressEventArgs e)
        {
            validaCampoLetra(e);
        }
    }
}
