package com.example.mySpringProject.models;

public class EmailMetadata {
  private String email;
  private String emailSentSucessfully;
  public String getEmail(){
    return email;
  }
  public String wasEmailSentSucessfully(){
    return emailSentSucessfully; //OK ERROR
  }
}
