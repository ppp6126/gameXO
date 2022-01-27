package com.example.game.Repository;

import java.util.List;

import com.example.game.bean.HistoryPlay;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryXORepository extends JpaRepository<HistoryPlay ,Long > {
    
    @Query(value ="SELECT * FROM HistoryPlay where gameid = :gameid", nativeQuery = true)
    List<HistoryPlay> getListHistoryPlayById(String gameid);
 

}
