package com.harahap.ibrahim.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Employee {

	private @Id @GeneratedValue Long id;
	private String name;
	private int age;
	private int years;

}
