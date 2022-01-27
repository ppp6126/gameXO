package com.example.game.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="HistoryPlay")
public class HistoryPlay {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idHistoryPlay ;
    private String postion;
    private Integer siza;
    private String gameid;
    private String type;

    public HistoryPlay() {
    }

    public HistoryPlay(Long idHistoryPlay, String postion, Integer siza, String gameid, String type) {
        this.idHistoryPlay = idHistoryPlay;
        this.postion = postion;
        this.siza = siza;
        this.gameid = gameid;
        this.type = type;
    }

    public Long getIdHistoryPlay() {
        return idHistoryPlay;
    }

    public void setIdHistoryPlay(Long idHistoryPlay) {
        this.idHistoryPlay = idHistoryPlay;
    }

    public String getPostion() {
        return postion;
    }

    public void setPostion(String postion) {
        this.postion = postion;
    }

    public Integer getSiza() {
        return siza;
    }

    public void setSiza(Integer siza) {
        this.siza = siza;
    }

    public String getGameid() {
        return gameid;
    }

    public void setGameid(String gameid) {
        this.gameid = gameid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    

}
