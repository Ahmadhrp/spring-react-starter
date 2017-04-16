/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.reportProjection;
import com.harahap.ibrahim.domain.Report;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Bensolo
 */

@RepositoryRestResource(excerptProjection = reportProjection.class)
public interface reportRepository extends CrudRepository<Report, Long> {

}
