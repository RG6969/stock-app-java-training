package com.stockexchange.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter @Setter
@Table(name = "IPODetails")
public class IpoDetailsEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;


    private float pricePerShare;

    private long totalNumberOfShares;

    private Date openDateTime;
    
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private CompanyEntity company;
   

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stock_exchange_id", referencedColumnName = "id")
    private StockExchangeEntity stockExchange;
    

    private String remarks;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getPricePerShare() {
        return pricePerShare;
    }

    public void setPricePerShare(float pricePerShare) {
        this.pricePerShare = pricePerShare;
    }

    public long getTotalNumberOfShares() {
        return totalNumberOfShares;
    }

    public void setTotalNumberOfShares(long totalNumberOfShares) {
        this.totalNumberOfShares = totalNumberOfShares;
    }

    public Date getOpenDateTime() {
        return openDateTime;
    }

    public void setOpenDateTime(Date openDateTime) {
        this.openDateTime = openDateTime;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

	public CompanyEntity getCompany() {
		return company;
	}

	public IpoDetailsEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public IpoDetailsEntity(float pricePerShare, long totalNumberOfShares, Date openDateTime, CompanyEntity company,
			StockExchangeEntity stockExchange, String remarks) {
		super();
		this.pricePerShare = pricePerShare;
		this.totalNumberOfShares = totalNumberOfShares;
		this.openDateTime = openDateTime;
		this.company = company;
		this.stockExchange = stockExchange;
		this.remarks = remarks;
	}

	public void setCompany(CompanyEntity company) {
		this.company = company;
	}

	public StockExchangeEntity getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(StockExchangeEntity stockExchange) {
		this.stockExchange = stockExchange;
	}
    
    
    

    

  
    
}
