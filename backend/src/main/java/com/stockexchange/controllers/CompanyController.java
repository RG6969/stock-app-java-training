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

import com.stockexchange.models.CompanyEntity;
import com.stockexchange.models.CompanyStockExchangeMap;
import com.stockexchange.models.SectorEntity;
import com.stockexchange.models.StockExchangeEntity;

import com.stockexchange.repository.CompanyRepository;
import com.stockexchange.repository.CompanyStockExchangeMapRepository;
import com.stockexchange.repository.SectorRepository;
import com.stockexchange.repository.StockExchangeRepository;


@CrossOrigin()
@RestController
@RequestMapping("/api")
public class CompanyController {
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	StockExchangeRepository stockExchangeRepository;
	
	@Autowired
	CompanyStockExchangeMapRepository cseMapRepo;
	
	@Autowired
	SectorRepository sectorRepository;

	
	@GetMapping("/companies")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<CompanyEntity>> getAllStockExchanges() {
		try {
			List<CompanyEntity> CompanyEntitys = new ArrayList<CompanyEntity>();

			
			companyRepository.findAll().forEach(CompanyEntitys::add);
			

			if (CompanyEntitys.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(CompanyEntitys, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	@GetMapping("/company/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<CompanyEntity> getCompanyEntityById(@PathVariable("id") long id) {
		Optional<CompanyEntity> CompanyEntityData = companyRepository.findById(id);

		if (CompanyEntityData.isPresent()) {
			return new ResponseEntity<>(CompanyEntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	@PostMapping("/company")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CompanyEntity> createCompanyEntity(@RequestBody CompanyEntity CompanyEntity) {
		try {
			
			
			CompanyEntity _CompanyEntity = companyRepository
					.save(new CompanyEntity(CompanyEntity.getName(), CompanyEntity.getTurnover(), CompanyEntity.getBoardOfDirectors(),CompanyEntity.getDescription(),CompanyEntity.getStockCode(),CompanyEntity.getCeo()));
			
			return new ResponseEntity<>(_CompanyEntity, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/connectCompanyAndStockExchange")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CompanyEntity> connectCompanyAndStockExchange(@RequestBody Map<String,String> ids) {
		try {
			
			CompanyEntity company = companyRepository.getById(Long.parseLong(ids.get("companyCode")));
			StockExchangeEntity stockExchange = stockExchangeRepository.getById(Long.parseLong(ids.get("stockExchangeCode")));
			
			
			CompanyStockExchangeMap cse = new CompanyStockExchangeMap();
			
			cse.setCompany(company);
			cse.setStockexchange(stockExchange);
			
			
			cseMapRepo.save(cse);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	@PostMapping("/company/addSector")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CompanyEntity> addSectors(@RequestBody Map<String,String> sectors) {
		try {
			
			CompanyEntity company = companyRepository.getById(Long.parseLong(sectors.get("companyCode")));
			SectorEntity sector = sectorRepository.getById(Long.parseLong(sectors.get("sectorCode")));
			
			company.setSector(sector);
			
			companyRepository.save(company);
			
	
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@PutMapping("/company/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CompanyEntity> updateCompanyEntity(@PathVariable("id") long id, @RequestBody CompanyEntity CompanyEntity) {
		Optional<CompanyEntity> CompanyEntityData = companyRepository.findById(id);

		if (CompanyEntityData.isPresent()) {
			CompanyEntity _CompanyEntity = CompanyEntityData.get();
			_CompanyEntity.setName(CompanyEntity.getName());
			_CompanyEntity.setBoardOfDirectors(CompanyEntity.getBoardOfDirectors());
			_CompanyEntity.setTurnover(CompanyEntity.getTurnover());
			_CompanyEntity.setDescription(CompanyEntity.getDescription());
			_CompanyEntity.setCeo(CompanyEntity.getCeo());
			_CompanyEntity.setStockCode(CompanyEntity.getStockCode());
			return new ResponseEntity<>(companyRepository.save(_CompanyEntity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@DeleteMapping("/company/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteCompanyEntity(@PathVariable("id") long id) {
		try {
			companyRepository.deleteById(id);
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
	
	
	@GetMapping("/companies/stockExchange/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<CompanyEntity>> getCompaniesByStockExchange(@PathVariable("id") long id) {
		
		try {
			
			List<CompanyStockExchangeMap> Data = new ArrayList<CompanyStockExchangeMap>();
			
			cseMapRepo.findAll().forEach(Data::add);
			
			//List<CompanyStockExchangeMap> data = toList(Data);
			
			List<CompanyEntity> companies = new ArrayList<CompanyEntity>();
			System.out.println("done");
			for(CompanyStockExchangeMap cse : Data) {
				
				long se_id = cse.getStockexchange().getId();
				if(se_id == id) {
					CompanyEntity company =  cse.getCompany();
					companies.add(company);
				}
				
			}

			if (companies.isEmpty()) {
				return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(companies,HttpStatus.OK);
			}
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@GetMapping("/companies/sector/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<CompanyEntity>> getCompaniesBySectorse(@PathVariable("id") long id) {
		
		try {
			
			List<CompanyEntity> Data = new ArrayList<CompanyEntity>();
			
			companyRepository.findAll().forEach(Data::add);
			
			//List<CompanyStockExchangeMap> data = toList(Data);
			
			List<CompanyEntity> companies = new ArrayList<CompanyEntity>();
			System.out.println("done");
			for(CompanyEntity cse : Data) {
				
				long se_id = cse.getSector().getId();
				if(se_id == id) {
					companies.add(cse);
				}
				
			}

			if (companies.isEmpty()) {
				return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(companies,HttpStatus.OK);
			}
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	

	

	
}
