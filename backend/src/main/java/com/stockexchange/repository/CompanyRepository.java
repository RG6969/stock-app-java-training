package com.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockexchange.models.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity,Long> {

}
