namespace trabalho01
{
    partial class TelaDeCadastro
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.btn_registrar = new System.Windows.Forms.Button();
            this.rb_Feminino = new System.Windows.Forms.RadioButton();
            this.rb_Masculino = new System.Windows.Forms.RadioButton();
            this.BotaoAtualizar = new System.Windows.Forms.Button();
            this.txt_cpf = new System.Windows.Forms.TextBox();
            this.txt_altura = new System.Windows.Forms.TextBox();
            this.txt_nome = new System.Windows.Forms.TextBox();
            this.dateTime = new System.Windows.Forms.DateTimePicker();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(35, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Nome";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 48);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(23, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Cpf";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(13, 87);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(34, 13);
            this.label3.TabIndex = 2;
            this.label3.Text = "Altura";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(13, 126);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(102, 13);
            this.label4.TabIndex = 3;
            this.label4.Text = "Data de nascimento";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(9, 165);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(31, 13);
            this.label5.TabIndex = 4;
            this.label5.Text = "Sexo";
            // 
            // btn_registrar
            // 
            this.btn_registrar.Location = new System.Drawing.Point(16, 224);
            this.btn_registrar.Name = "btn_registrar";
            this.btn_registrar.Size = new System.Drawing.Size(75, 23);
            this.btn_registrar.TabIndex = 5;
            this.btn_registrar.Text = "REGISTRAR";
            this.btn_registrar.UseVisualStyleBackColor = true;
            this.btn_registrar.Click += new System.EventHandler(this.AoclicarRegistrar);
            // 
            // rb_Feminino
            // 
            this.rb_Feminino.AutoSize = true;
            this.rb_Feminino.Location = new System.Drawing.Point(15, 181);
            this.rb_Feminino.Name = "rb_Feminino";
            this.rb_Feminino.Size = new System.Drawing.Size(67, 17);
            this.rb_Feminino.TabIndex = 6;
            this.rb_Feminino.TabStop = true;
            this.rb_Feminino.Text = "Feminino";
            this.rb_Feminino.UseVisualStyleBackColor = true;
            // 
            // rb_Masculino
            // 
            this.rb_Masculino.AutoSize = true;
            this.rb_Masculino.Location = new System.Drawing.Point(125, 181);
            this.rb_Masculino.Name = "rb_Masculino";
            this.rb_Masculino.Size = new System.Drawing.Size(73, 17);
            this.rb_Masculino.TabIndex = 7;
            this.rb_Masculino.TabStop = true;
            this.rb_Masculino.Text = "Masculino";
            this.rb_Masculino.UseVisualStyleBackColor = true;
            // 
            // BotaoAtualizar
            // 
            this.BotaoAtualizar.Location = new System.Drawing.Point(107, 224);
            this.BotaoAtualizar.Name = "BotaoAtualizar";
            this.BotaoAtualizar.Size = new System.Drawing.Size(75, 23);
            this.BotaoAtualizar.TabIndex = 8;
            this.BotaoAtualizar.Text = "SAIR";
            this.BotaoAtualizar.UseVisualStyleBackColor = true;
            this.BotaoAtualizar.Click += new System.EventHandler(this.SAIR);
            // 
            // txt_cpf
            // 
            this.txt_cpf.Location = new System.Drawing.Point(12, 64);
            this.txt_cpf.MaxLength = 11;
            this.txt_cpf.Name = "txt_cpf";
            this.txt_cpf.Size = new System.Drawing.Size(186, 20);
            this.txt_cpf.TabIndex = 11;
            this.txt_cpf.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txt_cpf_KeyPress);
            // 
            // txt_altura
            // 
            this.txt_altura.Location = new System.Drawing.Point(12, 103);
            this.txt_altura.MaxLength = 3;
            this.txt_altura.Name = "txt_altura";
            this.txt_altura.Size = new System.Drawing.Size(186, 20);
            this.txt_altura.TabIndex = 12;
            this.txt_altura.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txt_altura_KeyPress);
            // 
            // txt_nome
            // 
            this.txt_nome.Location = new System.Drawing.Point(12, 25);
            this.txt_nome.Name = "txt_nome";
            this.txt_nome.Size = new System.Drawing.Size(186, 20);
            this.txt_nome.TabIndex = 13;
            this.txt_nome.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txt_nome_KeyPress);
            // 
            // dateTime
            // 
            this.dateTime.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dateTime.Location = new System.Drawing.Point(15, 142);
            this.dateTime.MaxDate = new System.DateTime(2011, 12, 31, 0, 0, 0, 0);
            this.dateTime.MinDate = new System.DateTime(1940, 1, 1, 0, 0, 0, 0);
            this.dateTime.Name = "dateTime";
            this.dateTime.Size = new System.Drawing.Size(182, 20);
            this.dateTime.TabIndex = 14;
            this.dateTime.Value = new System.DateTime(2011, 12, 31, 0, 0, 0, 0);
            // 
            // TelaDeCadastro
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(209, 262);
            this.Controls.Add(this.dateTime);
            this.Controls.Add(this.txt_nome);
            this.Controls.Add(this.txt_altura);
            this.Controls.Add(this.txt_cpf);
            this.Controls.Add(this.BotaoAtualizar);
            this.Controls.Add(this.rb_Masculino);
            this.Controls.Add(this.rb_Feminino);
            this.Controls.Add(this.btn_registrar);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "TelaDeCadastro";
            this.Text = "Cadastrar";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button btn_registrar;
        private System.Windows.Forms.RadioButton rb_Feminino;
        private System.Windows.Forms.RadioButton rb_Masculino;
        private System.Windows.Forms.Button BotaoAtualizar;
        private System.Windows.Forms.TextBox txt_cpf;
        private System.Windows.Forms.TextBox txt_altura;
        private System.Windows.Forms.TextBox txt_nome;
        private System.Windows.Forms.DateTimePicker dateTime;
    }
}