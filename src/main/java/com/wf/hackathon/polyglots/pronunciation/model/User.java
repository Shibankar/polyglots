package com.wf.hackathon.polyglots.pronunciation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name = "country")
    private String country;

    @Column(name = "audio_file_path")
    private String audio_file_path;

    @Column(name = "last_modified_date")
    private Date last_modified_date;

    @Column(name = "voice_name")
    private String voice_name;

    @Column(name = "voice_gender")
    private String voice_gender;

    @Column(name = "service_opt_out")
    private boolean service_opt_out;

}
