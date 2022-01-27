package com.example.game.Repository;

import java.util.List;

import com.example.game.bean.Gameid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameidRepository extends JpaRepository<Gameid ,Long >{

    @Query(value ="SELECT max(gameid) FROM Gameid", nativeQuery = true)
    String getMaxId();
    
    @Query(value ="SELECT * FROM Gameid ", nativeQuery = true)
    List<Gameid> findAll();
}
