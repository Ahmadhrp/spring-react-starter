package com.harahap.ibrahim.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Aim MSI on 4/13/2017.
 */
@Data
@Entity
public class Status
{
    private @Id @GeneratedValue Integer Id;

    @Column(length = 20)
    private String status;
}
