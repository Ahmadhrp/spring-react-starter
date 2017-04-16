/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Aim MSI
 */

@Data
@Entity
public class Programmer
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    @Column(length = 100 , unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(length = 100)
    private String password;
    
    @Column(length = 100)
    private String nama;
    
    @Column(length = 50)
    private String posisi;

    private int age;

    @Column(length = 200)
    private String skil;

    @Column(length = 200)
    private String avatar;

    @JsonIgnore
    @Column(length = 10)
    private String user_role;

    @JsonIgnore
    private Boolean active;

    @JsonIgnore
    @Column(length = 50)
    private String createdby;

    @JsonIgnore
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @JsonIgnore
    @Column(length = 50)
    private String updatedBy;

    @JsonIgnore
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "programmer")
    private List<Report> programmerReport = new ArrayList<Report>();

}
