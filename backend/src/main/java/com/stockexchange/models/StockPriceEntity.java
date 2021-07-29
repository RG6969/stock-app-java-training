package com.stockexchange.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "Stock_Price")
public class StockPriceEntity {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	
    private String companyCode;

    private String stockExchangeCode;

    private float price;

    @Column(name = "date")
    private Date date;

    
    @Column(name = "time")
    private String time;

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getStockExchangeCode() {
        return stockExchangeCode;
    }

    public void setStockExchangeCode(String stockExchangeCode) {
        this.stockExchangeCode = stockExchangeCode;
    }

    public float getPrice() {
        return price;
    }

    public StockPriceEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StockPriceEntity(String companyCode, String stockExchangeCode, float price, Date date, String time) {
		super();
		this.companyCode = companyCode;
		this.stockExchangeCode = stockExchangeCode;
		this.price = price;
		this.date = date;
		this.time = time;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public void setPrice(float price) {
        this.price = price;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }




    
}
