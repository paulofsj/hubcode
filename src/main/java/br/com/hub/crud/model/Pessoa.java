package br.com.hub.crud.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import br.com.hub.crud.enuns.TypePessoaEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pessoa")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_pessoa", length=10, discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type",visible=true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = PessoaFisica.class, name = "FISICA"),

    @JsonSubTypes.Type(value = PessoaJuridica.class, name = "JURIDICA") }
)
public abstract class Pessoa {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
	
	@Enumerated(EnumType.STRING)
	@Column(name="tipo_pessoa", nullable = false, insertable = false, updatable = false)
	@JsonProperty(value="type")
	private TypePessoaEnum tipoPessoa;

}
