package com.harahap.ibrahim.repository;

import org.springframework.data.repository.CrudRepository;
import com.harahap.ibrahim.domain.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

 
    void delete(Long aLong);

}
