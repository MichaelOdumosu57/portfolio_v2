package com.example.mySpringProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.mySpringProject.models.EmailMetadata;

import org.springframework.http.HttpStatus;


// Import log4j classes.
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;


@RestController
public class HelloController {

  private static final Logger logger = LogManager.getLogger(HelloController.class);

  @GetMapping("/helloworld")
  public String helloWorld() {
    return "Hello World!";
  }

  @PostMapping(path= "/contact/submit", consumes="application/json")
  @ResponseStatus(HttpStatus.CREATED)
  public void logEmailContactInfo(@RequestBody EmailMetadata emailMetadata){
    logger.traceEntry();
    StringBuilder sb = new StringBuilder();
    sb
    .append("Email contact: ")
    .append(emailMetadata.getEmail());
    
    logger.debug(sb.toString());
    logger.traceExit();

  }
}
