package com.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockexchange.models.SectorEntity;

public interface SectorRepository extends JpaRepository<SectorEntity,Long> {

}
