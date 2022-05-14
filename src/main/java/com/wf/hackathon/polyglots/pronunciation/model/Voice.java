package com.wf.hackathon.polyglots.pronunciation.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "voice_name", schema = "public")
public class Voice {

    @Id()
    @Column(name = "id")
    private String id;

    @Column(name = "country")
    private String country;

    @Column(name = "locale")
    private String locale;

    @Column(name = "gender")
    private String gender;

    @Column(name = "voice_name")
    private String voice_name;
}
