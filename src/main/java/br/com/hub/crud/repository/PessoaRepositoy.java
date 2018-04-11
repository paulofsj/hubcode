package br.com.hub.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.hub.crud.model.Pessoa;

public interface PessoaRepositoy  extends JpaRepository<Pessoa, Integer> {
	

}
