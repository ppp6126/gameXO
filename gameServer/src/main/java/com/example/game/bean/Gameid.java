package com.example.game.bean;

import javax.persistence.*;

@Entity
@Table(name="Gameid")
public class Gameid {
    @Id
    String gameid ;

    public Gameid() {
    }

    public String getGameid() {
        return gameid;
    }

    public void setGameid(String gameid) {
        this.gameid = gameid;
    }

    
}
