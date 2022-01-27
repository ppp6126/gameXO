package com.example.game.Service;

import java.util.List;

import com.example.game.bean.Gameid;
import com.example.game.bean.HistoryPlay;

public interface HistoryXOService {

    public HistoryPlay addhistoryplay(HistoryPlay history);

    public Gameid getMaxId();

    public List<Gameid> getlistgmaeid();

    public List<HistoryPlay> getListHistoryPlay(String gameid);

    
    
}
