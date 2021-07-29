package com.stockexchange.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;

import com.stockexchange.models.StockExchangeEntity;


@Getter @Setter
@Entity
@Table(name = "Company")
public class CompanyEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

    private String turnover;
    
    private String ceo;
    

    public String getCeo() {
		return ceo;
	}





	public void setCeo(String ceo) {
		this.ceo = ceo;
	}

	@Column(name="board_of_directors", columnDefinition="CLOB NOT NULL") 
    @Lob
    private String boardOfDirectors;
	
    
    @Column(name="description", columnDefinition="CLOB NOT NULL") 
    @Lob 
	private String description;
    
    private String stockCode;
    
    public String getStockCode() {
		return stockCode;
	}





	public void setStockCode(String stockCode) {
		this.stockCode = stockCode;
	}





	public SectorEntity getSector() {
		return sector;
	}





	public void setSector(SectorEntity sector) {
		this.sector = sector;
	}

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id")
    private SectorEntity sector;
	
	
	
	@OneToMany(targetEntity = CompanyStockExchangeMap.class)
	private List<CompanyStockExchangeMap> compstockmap;
	
	

	public CompanyEntity(String name, String turnover, String boardOfDirectors, String description,String stockCode,String ceo) {
		super();
		this.name = name;
		this.turnover = turnover;
		this.boardOfDirectors = boardOfDirectors;
		this.description = description;
		this.stockCode=stockCode;
		this.ceo=ceo;
	}

	



	public List<CompanyStockExchangeMap> getCompstockmap() {
		return compstockmap;
	}





	public void setCompstockmap(List<CompanyStockExchangeMap> compstockmap) {
		this.compstockmap = compstockmap;
	}





	public long getId() {
		return id;
	}

	public CompanyEntity() {
		super();
		// TODO Auto-generated constructor stub
	}





	public void setId(long id) {
		this.id = id;
	}
	
	

	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTurnover() {
		return turnover;
	}

	public void setTurnover(String turnover) {
		this.turnover = turnover;
	}

	public String getBoardOfDirectors() {
		return boardOfDirectors;
	}

	public void setBoardOfDirectors(String boardOfDirectors) {
		this.boardOfDirectors = boardOfDirectors;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

    



	
	

}
