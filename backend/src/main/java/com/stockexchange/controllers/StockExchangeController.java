package com.stockexchange.controllers;
import java.util.ArrayList;
import java.util.List;
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

import com.stockexchange.models.StockExchangeEntity;

import com.stockexchange.repository.StockExchangeRepository;


@CrossOrigin()
@RestController
@RequestMapping("/api")
public class StockExchangeController {
	
	@Autowired
	StockExchangeRepository stockExchangeRepository;

	@GetMapping("/stockexchanges")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<StockExchangeEntity>> getAllStockExchanges() {
		try {
			List<StockExchangeEntity> StockExchangeEntitys = new ArrayList<StockExchangeEntity>();

			
			stockExchangeRepository.findAll().forEach(StockExchangeEntitys::add);
			

			if (StockExchangeEntitys.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(StockExchangeEntitys, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/stockExchange/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<StockExchangeEntity> getStockExchangeEntityById(@PathVariable("id") long id) {
		Optional<StockExchangeEntity> StockExchangeEntityData = stockExchangeRepository.findById(id);
		
		try {
			if(StockExchangeEntityData.isPresent()) {
				return new ResponseEntity<>(StockExchangeEntityData.get(), HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		

		
		
		
	}

	@PostMapping("/stockExchange")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<StockExchangeEntity> createStockExchangeEntity(@RequestBody StockExchangeEntity StockExchangeEntity) {
		try {
			StockExchangeEntity _StockExchangeEntity = stockExchangeRepository
					.save(new StockExchangeEntity(StockExchangeEntity.getStockExchangeCode(), StockExchangeEntity.getName(), StockExchangeEntity.getAddress(),StockExchangeEntity.getBrief(),StockExchangeEntity.getRemarks()));
			return new ResponseEntity<>(_StockExchangeEntity, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/stockExchange/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<StockExchangeEntity> updateStockExchangeEntity(@PathVariable("id") long id, @RequestBody StockExchangeEntity StockExchangeEntity) {
		Optional<StockExchangeEntity> StockExchangeEntityData = stockExchangeRepository.findById(id);

		if (StockExchangeEntityData.isPresent()) {
			StockExchangeEntity _StockExchangeEntity = StockExchangeEntityData.get();
			_StockExchangeEntity.setStockExchangeCode(StockExchangeEntity.getStockExchangeCode());
			_StockExchangeEntity.setName(StockExchangeEntity.getName());
			_StockExchangeEntity.setAddress(StockExchangeEntity.getAddress());
			_StockExchangeEntity.setBrief(StockExchangeEntity.getBrief());
			_StockExchangeEntity.setRemarks(StockExchangeEntity.getRemarks());
			return new ResponseEntity<>(stockExchangeRepository.save(_StockExchangeEntity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/stockExchange/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteStockExchangeEntity(@PathVariable("id") long id) {
		try {
			stockExchangeRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	

	
}
