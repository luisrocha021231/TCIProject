package com.tecnologiascomputacionales.proyecto.apiREST.controllers;

import com.tecnologiascomputacionales.proyecto.apiREST.entities.ContactEntity;
import com.tecnologiascomputacionales.proyecto.apiREST.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping("/api/contacts")
@RestController
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

   @GetMapping
    public ResponseEntity<List<ContactEntity>> getAllContacts(){
        List<ContactEntity> exists = contactRepository.findAll();
        if(exists.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(exists);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactEntity> getContactById(@PathVariable Long id){
       if(id <= 0){
           return ResponseEntity.badRequest().build();
       }
       Optional<ContactEntity> getcontact =  contactRepository.findById(id);

       if(getcontact.isPresent()){
           return ResponseEntity.ok(getcontact.get());
       }else{
           return ResponseEntity.notFound().build();
       }
    }

    @PostMapping
    public ResponseEntity<ContactEntity> createContact(@RequestBody ContactEntity contact ){

       if(contact.getId() != null){
           return ResponseEntity.badRequest().build();
       }

        LocalDate fechaNacimiento = LocalDate.parse(contact.getBirthdate());
        LocalDate fechaActual = LocalDate.now();
        int edad = calcularedad(fechaNacimiento, fechaActual);
        contact.setAge(edad);

       ContactEntity result = contactRepository.save(contact);
       return ResponseEntity.ok(result);

    }

    @PutMapping("/{id}")
    public ContactEntity updateContact(@PathVariable Long id, @RequestBody ContactEntity form){
    

        ContactEntity contactFromDB = contactRepository.findById(id).orElse(null);
        contactFromDB.setName(form.getName());
        contactFromDB.setLastname(form.getLastname());
        contactFromDB.setBirthdate(form.getBirthdate());

        LocalDate fechaNacimiento = LocalDate.parse(form.getBirthdate());
        LocalDate fechaActual = LocalDate.now();
        int edad = calcularedad(fechaNacimiento, fechaActual);
        contactFromDB.setAge(edad);
        contactFromDB.setStatus(form.getStatus());

       return contactRepository.save(contactFromDB);
      
    }

    @DeleteMapping
    public ResponseEntity<ContactEntity> deleteAllContacts(){
       contactRepository.deleteAll();
      return  ResponseEntity.noContent().build();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteContactById(@PathVariable Long id){

        ContactEntity contactFromDB = contactRepository
        .findById(id)
        .orElse(null);

        contactRepository.delete(contactFromDB);
    }
    
    @GetMapping("/search/{name}")
    public ResponseEntity<List<ContactEntity>> searchByName(@PathVariable String name ) {
        List<ContactEntity> users = contactRepository.findbyname(name);
        return ResponseEntity.ok(users);
    }

    public static int calcularedad(LocalDate fechaNacimiento, LocalDate fechaActual) {
        return Period.between(fechaNacimiento, fechaActual).getYears();
    }


}
