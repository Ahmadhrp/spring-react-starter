package com.harahap.ibrahim.domain;

/**
 * Created by Aim MSI on 4/25/2017.
 */
public class Errors {

    private String field;

    private String message;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Errors(String field, String message) {
        this.field = field;
        this.message = message;
    }
}
