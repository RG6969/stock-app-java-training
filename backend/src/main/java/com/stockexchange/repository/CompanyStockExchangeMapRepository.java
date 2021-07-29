package com.stockexchange.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stockexchange.models.CompanyStockExchangeMap;
import com.stockexchange.models.StockExchangeEntity;

public interface CompanyStockExchangeMapRepository extends JpaRepository<CompanyStockExchangeMap,Long>{
	


}
