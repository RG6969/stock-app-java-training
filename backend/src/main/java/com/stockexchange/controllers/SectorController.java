package com.stockexchange.controllers;
import java.util.ArrayList;
import java.util.Collections;
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


import com.stockexchange.models.SectorEntity;

import com.stockexchange.repository.SectorRepository;


@CrossOrigin()
@RestController
@RequestMapping("/api")
public class SectorController {
	@Autowired
	SectorRepository sectorRepository;


	@GetMapping("/sectors")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<SectorEntity>> getAllStockExchanges() {
		try {
			List<SectorEntity> SectorEntitys = new ArrayList<SectorEntity>();

			
			sectorRepository.findAll().forEach(SectorEntitys::add);
			

			if (SectorEntitys.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(SectorEntitys, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/sector/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<SectorEntity> getSectorEntityById(@PathVariable("id") long id) {
		Optional<SectorEntity> SectorEntityData = sectorRepository.findById(id);

		if (SectorEntityData.isPresent()) {
			return new ResponseEntity<>(SectorEntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/sector")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<SectorEntity> createSectorEntity(@RequestBody SectorEntity SectorEntity) {
		try {
			
			
			SectorEntity _SectorEntity = sectorRepository
					.save(new SectorEntity(SectorEntity.getName(), SectorEntity.getBrief()));
			
			return new ResponseEntity<>(_SectorEntity, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

	@PutMapping("/sector/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<SectorEntity> updateSectorEntity(@PathVariable("id") long id, @RequestBody SectorEntity SectorEntity) {
		Optional<SectorEntity> SectorEntityData = sectorRepository.findById(id);

		if (SectorEntityData.isPresent()) {
			SectorEntity _SectorEntity = SectorEntityData.get();
			_SectorEntity.setName(SectorEntity.getName());
			_SectorEntity.setBrief(SectorEntity.getBrief());
			return new ResponseEntity<>(sectorRepository.save(_SectorEntity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/sector/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteSectorEntity(@PathVariable("id") long id) {
		try {
			sectorRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public static <T> List<T> toList(Optional<T> opt) {
	    return opt
	            .map(Collections::singletonList)
	            .orElseGet(Collections::emptyList);
	}

}
