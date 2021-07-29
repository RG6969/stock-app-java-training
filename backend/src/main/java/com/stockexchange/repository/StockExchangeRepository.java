package com.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockexchange.models.*;

public interface StockExchangeRepository extends JpaRepository<StockExchangeEntity, Long> {

}
