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

import com.stockexchange.dto.IpoDetailDto;
import com.stockexchange.models.CompanyEntity;
import com.stockexchange.models.CompanyStockExchangeMap;
import com.stockexchange.models.StockExchangeEntity;
import com.stockexchange.models.IpoDetailsEntity;

import com.stockexchange.repository.CompanyRepository;
import com.stockexchange.repository.CompanyStockExchangeMapRepository;
import com.stockexchange.repository.StockExchangeRepository;
import com.stockexchange.repository.IpoRepository;



@CrossOrigin()
@RestController
@RequestMapping("/api")
public class IpoController {
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	StockExchangeRepository stockExchangeRepository;
	
	@Autowired
	IpoRepository ipoRepository;

	
	@GetMapping("/ipos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<IpoDetailsEntity>> getAllStockExchanges() {
		try {
			List<IpoDetailsEntity> IpoDetailsEntitys = new ArrayList<IpoDetailsEntity>();

			
			ipoRepository.findAll().forEach(IpoDetailsEntitys::add);
			

			if (IpoDetailsEntitys.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(IpoDetailsEntitys, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	@GetMapping("/ipo/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<IpoDetailsEntity> getIpoDetailsEntityById(@PathVariable("id") long id) {
		Optional<IpoDetailsEntity> IpoDetailsEntityData = ipoRepository.findById(id);

		if (IpoDetailsEntityData.isPresent()) {
			return new ResponseEntity<>(IpoDetailsEntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/ipo")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<IpoDetailsEntity> createIpoDetailsEntity(@RequestBody IpoDetailDto IpoDetails) {
		try {
			
			Optional<CompanyEntity> company = companyRepository.findById(IpoDetails.getCompanyId());
			Optional<StockExchangeEntity> stockExchange = stockExchangeRepository.findById(IpoDetails.getStockExchangeId());
			System.out.println("done");
			IpoDetailsEntity _IpoDetailsEntity = ipoRepository
					.save(new IpoDetailsEntity(IpoDetails.getPricePerShare(), IpoDetails.getTotalNumberOfShares(), IpoDetails.getOpenDateTime(),company.get(),stockExchange.get(),IpoDetails.getRemarks()));
			
			return new ResponseEntity<>(_IpoDetailsEntity, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

	@PutMapping("/ipo/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<IpoDetailsEntity> updateIpoDetailsEntity(@PathVariable("id") long id, @RequestBody IpoDetailDto IpoDetails) {
		Optional<IpoDetailsEntity> IpoDetailsEntityData = ipoRepository.findById(id);
		if (IpoDetailsEntityData.isPresent()) {
			IpoDetailsEntity _IpoDetailsEntity = IpoDetailsEntityData.get();
			_IpoDetailsEntity.setPricePerShare(IpoDetails.getPricePerShare());
			_IpoDetailsEntity.setTotalNumberOfShares(IpoDetails.getTotalNumberOfShares());
			_IpoDetailsEntity.setRemarks(IpoDetails.getRemarks());

			return new ResponseEntity<>(ipoRepository.save(_IpoDetailsEntity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/ipo/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteIpoDetailsEntity(@PathVariable("id") long id) {
		try {
			ipoRepository.deleteById(id);
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
	
	public IpoDetailsEntity dtoToEntity(IpoDetailDto ipoDetailDto) {
        IpoDetailsEntity ipoDetail = new IpoDetailsEntity();
        ipoDetail.setId(ipoDetailDto.getId());
        ipoDetail.setPricePerShare(ipoDetailDto.getPricePerShare());
        ipoDetail.setTotalNumberOfShares(ipoDetailDto.getTotalNumberOfShares());
        ipoDetail.setRemarks(ipoDetailDto.getRemarks());
        ipoDetail.setOpenDateTime(ipoDetailDto.getOpenDateTime());
        ipoDetail.setCompany(this.companyRepository.findById(ipoDetailDto.getCompanyId()).get());
        ipoDetail.setStockExchange(this.stockExchangeRepository.findById(ipoDetailDto.getStockExchangeId()).get());

        return ipoDetail;
    }

    public IpoDetailDto entityToDto(IpoDetailsEntity ipoDetail) {
        IpoDetailDto ipoDetailDto = new IpoDetailDto();
        ipoDetailDto.setId(ipoDetail.getId());
        ipoDetailDto.setPricePerShare(ipoDetail.getPricePerShare());
        ipoDetailDto.setTotalNumberOfShares(ipoDetail.getTotalNumberOfShares());
        ipoDetailDto.setRemarks(ipoDetail.getRemarks());
        ipoDetailDto.setOpenDateTime(ipoDetail.getOpenDateTime());
        ipoDetailDto.setCompanyId(ipoDetail.getCompany().getId());
        ipoDetailDto.setStockExchangeId(ipoDetail.getStockExchange().getId());

        return ipoDetailDto;
    }


}
