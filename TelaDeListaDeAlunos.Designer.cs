namespace trabalho01
{
    partial class TelaDeListaDeAlunos
    {
        /// <summary>
        /// Variável de designer necessária.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpar os recursos que estão sendo usados.
        /// </summary>
        /// <param name="disposing">true se for necessário descartar os recursos gerenciados; caso contrário, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código gerado pelo Windows Form Designer

        /// <summary>
        /// Método necessário para suporte ao Designer - não modifique 
        /// o conteúdo deste método com o editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.botaoCadastrar = new System.Windows.Forms.Button();
            this.bnt_atualizar = new System.Windows.Forms.Button();
            this.btn_deletar = new System.Windows.Forms.Button();
            this.DT_mostra = new System.Windows.Forms.DataGridView();
            ((System.ComponentModel.ISupportInitialize)(this.DT_mostra)).BeginInit();
            this.SuspendLayout();
            // 
            // botaoCadastrar
            // 
            this.botaoCadastrar.Location = new System.Drawing.Point(335, 300);
            this.botaoCadastrar.Name = "botaoCadastrar";
            this.botaoCadastrar.Size = new System.Drawing.Size(93, 23);
            this.botaoCadastrar.TabIndex = 0;
            this.botaoCadastrar.Text = "CADASTRAR";
            this.botaoCadastrar.UseVisualStyleBackColor = true;
            this.botaoCadastrar.Click += new System.EventHandler(this.AoClicarEmCadastrar);
            // 
            // bnt_atualizar
            // 
            this.bnt_atualizar.Location = new System.Drawing.Point(434, 300);
            this.bnt_atualizar.Name = "bnt_atualizar";
            this.bnt_atualizar.Size = new System.Drawing.Size(93, 23);
            this.bnt_atualizar.TabIndex = 5;
            this.bnt_atualizar.Text = "ATUALIZAR";
            this.bnt_atualizar.UseVisualStyleBackColor = true;
            this.bnt_atualizar.Click += new System.EventHandler(this.AoClicarEmAtualizar);
            // 
            // btn_deletar
            // 
            this.btn_deletar.Location = new System.Drawing.Point(533, 300);
            this.btn_deletar.Name = "btn_deletar";
            this.btn_deletar.Size = new System.Drawing.Size(93, 23);
            this.btn_deletar.TabIndex = 6;
            this.btn_deletar.Text = "DELETAR";
            this.btn_deletar.UseVisualStyleBackColor = true;
            // 
            // DT_mostra
            // 
            this.DT_mostra.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.DT_mostra.Location = new System.Drawing.Point(12, 12);
            this.DT_mostra.Name = "DT_mostra";
            this.DT_mostra.Size = new System.Drawing.Size(614, 282);
            this.DT_mostra.TabIndex = 7;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(643, 335);
            this.Controls.Add(this.DT_mostra);
            this.Controls.Add(this.btn_deletar);
            this.Controls.Add(this.bnt_atualizar);
            this.Controls.Add(this.botaoCadastrar);
            this.Name = "Form1";
            this.Text = "Tela de lista de alunos";
            //this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.DT_mostra)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button botaoCadastrar;
        private System.Windows.Forms.Button bnt_atualizar;
        private System.Windows.Forms.Button btn_deletar;
        private System.Windows.Forms.DataGridView DT_mostra;
    }
}

