package com.stockexchange.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stockexchange.models.StockPriceEntity;

public interface StockPriceRepository extends JpaRepository<StockPriceEntity,Long>{
	
	@Query(nativeQuery=true,value="select * from Stock_Price sp where sp.COMPANY_CODE = :companyCode and sp.stock_Exchange_Code =:stockExchange and sp.date <= :endDate and sp.date >= :startDate")
	List<StockPriceEntity> findByCompanyExchangeAndPeriod(@Param("companyCode") String companyCode,@Param("stockExchange") String stockExchange, @Param("startDate") String startDate,@Param("endDate") String endDate);
	
	
	@Query(nativeQuery=true,value="select * from Stock_Price sp where sp.COMPANY_CODE = :companyCode and sp.date <= :endDate and sp.date >= :startDate")
	List<StockPriceEntity> findByCompanyAndPeriod(@Param("companyCode") String companyCode, @Param("startDate") String startDate,@Param("endDate") String endDate);

}


