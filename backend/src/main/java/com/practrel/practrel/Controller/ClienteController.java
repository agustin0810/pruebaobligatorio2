package com.practrel.practrel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practrel.practrel.Entity.Cliente;
import com.practrel.practrel.Entity.Libro;
import com.practrel.practrel.Repository.ClienteRepository;

import jakarta.persistence.Entity;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins ="http://localhost:3000")
public class ClienteController {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<?> altaCliente(@RequestBody Cliente cliente){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(cliente));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @PutMapping
    public ResponseEntity<?> modificacionCliente(@RequestBody Cliente cliente){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(cliente));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{ci}")
    public ResponseEntity<?> eliminacionCliente(@PathVariable int ci){
        try {
            clienteRepository.deleteById(ci);
            return ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
    
    @GetMapping("/{ci}")
    public ResponseEntity<?> conseguirLibro(@PathVariable int ci){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findById(ci));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping
    public ResponseEntity<?> conseguirClientes(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }
}
