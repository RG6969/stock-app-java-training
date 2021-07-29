package com.stockexchange.dto;



import java.util.Date;

public class IpoDetailDto {
    private Long id;
    private float pricePerShare;
    private Long totalNumberOfShares;
    private String remarks;
    private Date openDateTime;
    private Long companyId;
    private Long stockExchangeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getPricePerShare() {
        return pricePerShare;
    }

    public void setPricePerShare(float pricePerShare) {
        this.pricePerShare = pricePerShare;
    }

    public Long getTotalNumberOfShares() {
        return totalNumberOfShares;
    }

    public void setTotalNumberOfShares(Long totalNumberOfShares) {
        this.totalNumberOfShares = totalNumberOfShares;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Date getOpenDateTime() {
        return openDateTime;
    }

    public void setOpenDateTime(Date openDateTime) {
        this.openDateTime = openDateTime;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getStockExchangeId() {
        return stockExchangeId;
    }

    public void setStockExchangeId(Long stockExchangeId) {
        this.stockExchangeId = stockExchangeId;
    }
}