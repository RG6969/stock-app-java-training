package com.stockexchange.models;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "CompanyStockExchangeMap")
public class CompanyStockExchangeMap {
	public CompanyStockExchangeMap() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue
	private long id;
	
	

	public CompanyStockExchangeMap(String companyCode, CompanyEntity company, StockExchangeEntity stockexchange) {
		super();
		CompanyCode = companyCode;
		this.company = company;
		this.stockexchange = stockexchange;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getCompanyCode() {
		return CompanyCode;
	}


	public void setCompanyCode(String companyCode) {
		CompanyCode = companyCode;
	}


	public CompanyEntity getCompany() {
		return company;
	}


	public void setCompany(CompanyEntity company) {
		this.company = company;
	}


	public StockExchangeEntity getStockexchange() {
		return stockexchange;
	}


	public void setStockexchange(StockExchangeEntity stockexchange) {
		this.stockexchange = stockexchange;
	}

	private String CompanyCode;

	@ManyToOne(fetch = FetchType.EAGER)
	private CompanyEntity company;

	
	@ManyToOne(fetch = FetchType.EAGER)
	private StockExchangeEntity stockexchange;


}