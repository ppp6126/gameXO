package com.example.game.Controller;

import java.util.List;

import com.example.game.Service.HistoryXOService;
import com.example.game.bean.Gameid;
import com.example.game.bean.HistoryPlay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@CrossOrigin
public class HistoryXOController {

    @Autowired
    private HistoryXOService hs ;

    @PostMapping("/addhistory" )
    public HistoryPlay addhistoryplay(@RequestBody HistoryPlay history){
        return hs.addhistoryplay(history);
    }
    @GetMapping("/getmaxgameid")
    public Gameid getmaxid() {
        Gameid gid = hs.getMaxId();
        return gid;
    }
    @GetMapping("/getlistgameid")
    public List<Gameid> getlistgmaeid() {
        return hs.getlistgmaeid();
    }

    @GetMapping("/getListHistoryPlay/{gameid}")
    public List<HistoryPlay> getListHistoryPlay(@PathVariable ("gameid")  String gameid) {
        return hs.getListHistoryPlay(gameid);
    }
    
    
}
