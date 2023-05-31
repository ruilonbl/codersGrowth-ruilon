using BancoDeDados;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using trabalho01.crud;
using trabalho01.model;

namespace codersGrowth.web.Controller
{
    [Route("/api/alunos")]
    [ApiController]
    public class ControllerApi : ControllerBase
    {
        private readonly IRepositorio _repositorio;
        private Validacao _validacao = new();
       // private Pessoas _aluno = new();
        public ControllerApi(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult BuscarTodosOsAlunos()
        {
            try
            {
                var alunos = _repositorio.ObterTodos();
                if (alunos==null)
                {
                    throw new Exception("Falha ao obter os alunos");
                }
                return Ok(alunos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }     
        }

        [HttpGet("{id}")]
        public IActionResult BuscarAlunoPorId(int id)
        {
            try
            {
                var aluno = _repositorio.ObiterNaListaPorId(id);
                if (aluno==null)
                {
                    throw new Exception("ID não existente");
                }
                return Ok(aluno);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AdicionarPessoa([FromBody, Required()] Pessoas pessoa)
        {
            try
            {
                if (pessoa == null)
                {
                    throw new Exception("precisa preencher os campos");
                }
                _validacao.ValidarPessoa(pessoa, _repositorio);
                _repositorio.Criar(pessoa);
                return Created($"pessoa",pessoa);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }  
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarPessoa([FromBody, Required()] Pessoas pessoa, int id)
        {
            try
            {
                pessoa = _repositorio.ObiterNaListaPorId(id);
                if(pessoa==null)
                {
                    throw new Exception("ID não existente");
                }
                pessoa.Id = id;
                _validacao.ValidarPessoa(pessoa, _repositorio);              
                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpDelete("{id}")]
        public IActionResult DeletaPessoa(int id)
        {
            try
            {
                 var _aluno = _repositorio.ObiterNaListaPorId(id);
                if (_aluno==null)
                {
                    throw new Exception("ID não existente");
                }
                _repositorio.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
