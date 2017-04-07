package com.harahap.ibrahim.repository;

import org.springframework.data.repository.CrudRepository;
import com.harahap.ibrahim.domain.Employee;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

        List<Employee> findByName(@Param("name") String name);

}
