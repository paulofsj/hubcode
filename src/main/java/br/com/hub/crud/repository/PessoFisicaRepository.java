package br.com.hub.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import br.com.hub.crud.model.PessoaFisica;

public interface PessoFisicaRepository extends JpaRepository<PessoaFisica, Integer>{
	
	

}
