/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.domain;


import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Dailyreport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer user_id;

    private Integer project_id;

    private Integer status_id;

    @Temporal(TemporalType.DATE)
    private Date tanggal;

    @Column(length = 200)
    private String uraian;

    @Column(length = 50)
    private String createdby;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(length = 50)
    private String updatedBy;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

}
