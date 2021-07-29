package com.stockexchange.models;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import com.stockexchange.models.CompanyEntity;


@Getter @Setter
@Entity
@Table(name = "StockExchange")
public class StockExchangeEntity {




    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String stockExchangeCode;

    private String name;

    private String address;
    
    @OneToMany(targetEntity = CompanyStockExchangeMap.class)
	private List<CompanyStockExchangeMap> compstockmap;
    
    

    
	@Column(name="brief", columnDefinition="CLOB NOT NULL") 
    @Lob 
    private String brief;

    

	private String remarks;
    
    public StockExchangeEntity() {
		super();
		// TODO Auto-generated constructor stub
	}


    public StockExchangeEntity(String stockExchangeCode, String name, String address, String brief,
			String remarks) {
		super();
		this.stockExchangeCode = stockExchangeCode;
		this.name = name;
		this.address = address;
		this.brief = brief;
		this.remarks = remarks;
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

    public void setId(long id) {
        this.id = id;
    }
    
   

    public String getStockExchangeCode() {
        return stockExchangeCode;
    }

    public void setStockExchangeCode(String stockExchangeCode) {
        this.stockExchangeCode = stockExchangeCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    

    


    
}
