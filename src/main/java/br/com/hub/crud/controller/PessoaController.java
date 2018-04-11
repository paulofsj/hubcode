package br.com.hub.crud.controller;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.hub.crud.enuns.TypePessoaEnum;
import br.com.hub.crud.model.Pessoa;
import br.com.hub.crud.model.PessoaFisica;
import br.com.hub.crud.service.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

	@Autowired
	private PessoaService pessoaService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<Pessoa> getPessoa(@PathVariable("id") Integer id) {
		try {
			Pessoa pessoa = pessoaService.find(id);
			if(pessoa != null)
				return new ResponseEntity<>(pessoa, HttpStatus.OK);
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<Pessoa>> getAll() {
		try {
			return new ResponseEntity<>(pessoaService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Pessoa> setPessoa(@RequestBody Pessoa pessoa) {
		try {
			pessoaService.save(pessoa);
			return new ResponseEntity<>(pessoa, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces="application/json")
	@ResponseBody
	public ResponseEntity<Integer> deletePessoa(@PathVariable("id") Integer id) {
		try {
			pessoaService.delete(id);
			return new ResponseEntity<Integer>(id , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping( method = RequestMethod.PATCH, produces="application/json", consumes="application/json")
	@ResponseBody
	public ResponseEntity<Pessoa> updatePessoa(@RequestBody Pessoa pessoa) {
		try {
			pessoaService.update(pessoa);
			return new ResponseEntity<Pessoa>(pessoa , HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
}
