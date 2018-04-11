package br.com.hub.crud.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.validator.constraints.NotEmpty;

import br.com.hub.crud.enuns.TypePessoaEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@PrimaryKeyJoinColumn(name="id_pessoa")
@DiscriminatorValue(value="FISICA")
public class PessoaFisica extends Pessoa{
	
	@Column(length=12)
	@NotEmpty
	private String cpf;
	
	@Column(length=40)
	@NotEmpty
	private String nome;
	
	@Column(name="data_nascimento")
	@Temporal(TemporalType.DATE)
	private Calendar dataNascimento;

}
