/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.config;

import javax.servlet.Filter;
import javax.sql.DataSource;

import com.harahap.ibrahim.filter.JWTAuthenticationFilter;
import com.harahap.ibrahim.filter.JWTLoginFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 *
 * @author Aim MSI
 */
@Configuration
@EnableWebSecurity
public class securityConfig extends WebSecurityConfigurerAdapter {

    private static final String SQL_LOGIN
            = "select username,password,active as enabled from programmer "
            + "where username = ? and active <> false";

    private static final String SQL_ROLE
            = "select username,user_role as authority from programmer "
            + "where username = ?";

    @Autowired
    private DataSource ds;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//=============== Authentikasi default spring security ==================//
//        auth.inMemoryAuthentication()
//                .withUser("ahmed").password("ahmed").roles("USER");

//===== Authentikasi dengan database dan password hashing spring security =====//
        auth.jdbcAuthentication()
                .dataSource(ds)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery(SQL_LOGIN)
                .authoritiesByUsernameQuery(SQL_ROLE);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }
    
    

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/webjars/**").permitAll()
                .antMatchers("/static/**").permitAll()
                .antMatchers("/register").anonymous();
        http
                .authorizeRequests()
                .anyRequest().authenticated()
                .and().csrf().disable()
                .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);

//        http
//                .authorizeRequests()
//                .antMatchers("/webjars/**").permitAll()
//                .antMatchers("/static/**").permitAll()
//                .antMatchers("/register").anonymous();
//        http
//                .authorizeRequests()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/login")
//                .permitAll()
//                .defaultSuccessUrl("/", true)
//                .and()
//                .logout();


    }

}
