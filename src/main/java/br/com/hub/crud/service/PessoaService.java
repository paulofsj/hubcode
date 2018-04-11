package br.com.hub.crud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.hub.crud.model.Pessoa;
import br.com.hub.crud.repository.PessoaRepositoy;

@Transactional
@Service
public class PessoaService {
	
	@Autowired
	PessoaRepositoy pessoaRepositoy;
	
	public Pessoa find(Integer id) {
		return pessoaRepositoy.findOne(id);
	}
	
	public List<Pessoa> findAll(){
		return pessoaRepositoy.findAll();
	}
	
	
	public void save(Pessoa pessoa) {
		pessoaRepositoy.save(pessoa);
	}
	
	public void delete(Integer id) {
		pessoaRepositoy.delete(id);
	}

	public void update(Pessoa pessoa) {
		pessoaRepositoy.save(pessoa);
	}

}
