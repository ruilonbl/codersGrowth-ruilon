using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trabalho01.model
{
    internal class Pessoa
    {
        private string nome;
        private string cpf;
        private int id;
        public string Cpf { 
            get { return cpf; } 
            set { cpf = value; }
        }
        public string Nome {
            get {  return nome; }
            set {  nome = value; } 
        }
        public int Id { 
            get { return id;}
            set { id = value; }
        }
    }
}
