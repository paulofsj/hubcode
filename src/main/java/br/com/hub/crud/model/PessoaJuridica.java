package br.com.hub.crud.model;


import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import org.hibernate.validator.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name="id_pessoa")
@Getter
@Setter
@DiscriminatorValue(value="JURIDICA")
public class PessoaJuridica extends Pessoa {
	
	@Column(length=20)
	@NotEmpty
	private String cnpj;
	
	@Column(length=40)
	@NotEmpty
	private String razaoSocial;
	
	@Column(length=20)
	@NotEmpty
	private String nomeFantasia;

}
