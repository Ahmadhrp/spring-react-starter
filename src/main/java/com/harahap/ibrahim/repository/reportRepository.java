/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.Dailyreport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Bensolo
 */
public interface reportRepository extends CrudRepository<Dailyreport, Integer> {

//    List<Dailyreport> findByName(@Param("id") Integer id);
}
