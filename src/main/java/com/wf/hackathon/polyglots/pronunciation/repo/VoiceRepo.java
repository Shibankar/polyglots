package com.wf.hackathon.polyglots.pronunciation.repo;

import com.wf.hackathon.polyglots.pronunciation.model.Voice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VoiceRepo extends JpaRepository<Voice, String> {

    List<Voice> findAll();

    @Query("select v from Voice v where v.country = ?1")
    List<Voice> findByCountry(String country);
}
