package com.stockexchange.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stockexchange.models.CompanyEntity;
import com.stockexchange.models.CompanyStockExchangeMap;
import com.stockexchange.models.SectorEntity;
import com.stockexchange.models.StockExchangeEntity;
import com.stockexchange.models.StockPriceEntity;

import com.stockexchange.repository.CompanyRepository;
import com.stockexchange.repository.CompanyStockExchangeMapRepository;
import com.stockexchange.repository.SectorRepository;
import com.stockexchange.repository.StockPriceRepository;


@CrossOrigin()
@RestController
@RequestMapping("/api")
public class StockPriceController {
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	StockPriceRepository stockPriceRepository;
	

	

	@PostMapping("/stockPrices/list")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<StockPriceEntity>> listStockPrice(@RequestBody Map<String,String> filters) {
		try {
			List<StockPriceEntity> StockPriceData = stockPriceRepository.findByCompanyExchangeAndPeriod(filters.get("companyCode"),filters.get("stockExchangeCode"), filters.get("startDate"), filters.get("endDate"));

			if(StockPriceData.isEmpty()) {
				return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(StockPriceData,HttpStatus.OK);
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@PostMapping("/stockPrices/company/list")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<StockPriceEntity>> listStockPriceByCompanyAndDate(@RequestBody Map<String,String> filters) {
		try {
			List<StockPriceEntity> StockPriceData = stockPriceRepository.findByCompanyAndPeriod(filters.get("companyCode"),filters.get("startDate"), filters.get("endDate"));

			if(StockPriceData.isEmpty()) {
				return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(StockPriceData,HttpStatus.OK);
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}

	@PostMapping("/stockPrices")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<StockPriceEntity> addStockPrice(@RequestBody List<StockPriceEntity> stockPriceData) {
		try {
			
			
			for(StockPriceEntity stockData:stockPriceData) {
				stockPriceRepository.save(stockData);
			}
			return new ResponseEntity<>(null, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

	

}
