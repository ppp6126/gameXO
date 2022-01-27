package com.example.game.Service;

import java.util.List;

import com.example.game.Repository.GameidRepository;
import com.example.game.Repository.HistoryXORepository;
import com.example.game.bean.Gameid;
import com.example.game.bean.HistoryPlay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class HistoryXOServiceImp implements HistoryXOService{

    @Autowired
    private HistoryXORepository hr ;

    @Autowired
    private GameidRepository gr ; 

    @Override
    public HistoryPlay addhistoryplay(HistoryPlay history) {
        return hr.save(history);
    }

    @Override
    public Gameid getMaxId() {
       Gameid gid = new Gameid();
       String mid = gr.getMaxId();
       if(mid == null){
            mid ="G1";
       }else{
        String str = mid.substring(1);
        int id = Integer.parseInt(str)+1 ;
        mid = "G"+id ;
        gid.setGameid(mid);

        gr.save(gid);
        
       }
       System.out.println("Mid = "+ gid.getGameid());

        return gid;
    }

    @Override
    public List<Gameid> getlistgmaeid() {
        return gr.findAll();
    }

    @Override
    public List<HistoryPlay> getListHistoryPlay(String gameid) {
        return hr.getListHistoryPlayById(gameid);
    }

}
