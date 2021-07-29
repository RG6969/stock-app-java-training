package com.stockexchange.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockexchange.models.IpoDetailsEntity;

public interface IpoRepository extends JpaRepository<IpoDetailsEntity,Long> {

}
