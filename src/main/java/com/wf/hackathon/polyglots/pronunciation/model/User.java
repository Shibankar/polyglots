package com.wf.hackathon.polyglots.pronunciation.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "user_pronunciation", schema = "public")
public class User {

    @Id
    @Column(name = "uid")
    private String uid;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "audio_file_path")
    private String audio_file_path;

    @Column(name = "last_modified_date")
    private Date last_modified_date;

}
