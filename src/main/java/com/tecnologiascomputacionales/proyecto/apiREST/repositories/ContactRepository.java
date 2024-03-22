package com.tecnologiascomputacionales.proyecto.apiREST.repositories;

import com.tecnologiascomputacionales.proyecto.apiREST.entities.ContactEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
      
    @Query(nativeQuery = true, value = "select * from contacts c where c.name = :name")
    List<ContactEntity> findbyname(@Param("name") String name);

}
