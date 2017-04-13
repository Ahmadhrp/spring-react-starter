package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.Status;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Aim MSI on 4/13/2017.
 */
public interface progressRepository extends CrudRepository<Status, Integer>
{

}
