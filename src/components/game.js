import React, { Component ,useEffect } from 'react';
import { Link }from "react-router-dom";
import { Button, Container, Paper } from '@material-ui/core';


export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            numT : 3 ,
            board: [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8]
            ],
            board2 :[
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8]
            ],
            squares :[],
            status : "",
            postion : [],
            board3 :[
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8]
            ],
            maxid : "G1",
            historyplay : [],
            listgameid : [],
            selectnumT : []
        }
    }

    async componentWillMount(){
      
     await this.fetchgameid();
     console.log(this.state.listgameid);
     let i = 3 ;
     const num = [];
     for( i = 3; i <= 50; i++) {
       num.push(i)
      }
      this.setState({
        selectnumT : num
      })
      debugger
      
    }

    async fetchgameid(){
      await fetch("http://localhost:8080/getlistgameid")
      .then(res => res.json())
      .then((result)=>{
        const r = [];
        for(let i=0 ; i<result.length ; i++){
          console.log(result[i].gameid);
          const str = result[i].gameid;
          r.push(str)
          this.setState({
            listgameid : r
          })
        }
      });
      
    }

    selectTable(selectobj) {
      var value  = selectobj;
      console.log("value = " + value)
      let n = parseInt(value)
      let sum = n*n ;
      var table = []
      var rows = []
      let numberloop = 0 ;
        for(let i=0 ; i<n ; i++){
          for(let k=0 ; k<n ;k++){
            rows.push(numberloop)
            numberloop++
          }
        table.push(rows)
        rows = []
        }
        console.log("table "+table)
        console.log("board "+this.state.board)
        this.setState({
          board: table ,
          board2: table ,
          numT : n,
          xIsNext: true,
          squares :[],
          status : "",
          postion : [],
          board3 : table
          
        })
    }

    calculateWinnerxo(squares,numT,i,history) {
      let n = parseInt(numT);
      var table = history
      var table2 = []
      var rows = []
      let numberloop = 0 ;
        for(let l=0 ; l<n ; l++){
          for(let k=0 ; k<n ;k++){
            rows.push(numberloop)
            numberloop++
          }
        table2.push(rows)
        rows = []
        }
        const copytable = table ;
        for(let s=0 ; s<table2.length ; s++){
          const  counts = table[s];
          console.log("S ="+s);
          console.log("Row  ="+counts);
          for(let j=0 ; j<counts.length ; j++){
           
            if(counts[j] === i){
              console.log("counts[j] = "+counts[j]);
              console.log('Type = '+squares);
              console.log('Position ='+i);
    
              const ans = squares[i];
              console.log('ans ='+ans);
              
              copytable[s].splice(j,1,ans);
              console.log('table ='+table);
               
               return copytable;
            }
          }
        }
      return null;
    }

    reset(siza){
      let n = parseInt(siza)
      var table = []
      var rows = []
      let numberloop = 0 ;
        for(let i=0 ; i<n ; i++){
          for(let k=0 ; k<n ;k++){
            rows.push(numberloop)
            numberloop++
          }
        table.push(rows)
        rows = []
        }
        this.setState({
          board:  table,
          xIsNext: true,
          squares :[],
          status : "",
          status2 : "",
          postion : []
          
        })
    }
    async maxid(){
     await fetch("http://localhost:8080/getmaxgameid")
      .then(res => res.json())
      .then((result)=>{
        console.log("result "+result)
        this.setState({
          maxid : result
        })
      });
      
    }

   savehistory(){
      const size = this.state.board;
      let siza =size.length ;
      const posti = this.state.postion;
      const gameid = this.state.maxid.gameid;
      console.log("Maxid = "+this.state.maxid.gameid);
        debugger
          for(let i=0 ;i<posti.length ;i++){
            console.log("posti - "+posti[i]);
            const p = posti[i];
            const postion = p[1].toString();
            const type = p[0];
            const HistoryPlay ={postion,siza,gameid,type}
            console.log(HistoryPlay)
            fetch("http://localhost:8080/addhistory",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(HistoryPlay)
            
            }).then(()=>{
              console.log("New postion Add"+size)
            })
          }
          this.reset(siza);
    }
    async checkwinner(){
      const boardck = this.state.board2;
      let size = boardck.length;
      let listCheck = []

      let numLoop = 0
      for(let i = 0; i < size ; i++){
        let listRow = []
        for(let j = 0; j < size ; j++){
          listRow.push(numLoop);
          numLoop++
        }
        listCheck.push(listRow)
      }

      numLoop = 0
      for(let i = 0; i < size ; i++){
        let listCol = []
        for(let j = 0; j < size ; j++){
          listCol.push(numLoop+(size*j));
        }
        numLoop++
        listCheck.push(listCol)
      }

      let listCrossLeft = []
      for(let i = 0; i < size ; i++){
        listCrossLeft.push(i*(size+1));
      }
      listCheck.push(listCrossLeft)

      let listCrossRight = []
      for(let i = 0; i < size ; i++){
        let plus = (size-1)*i
        listCrossRight.push(plus+size-1);
      }
      listCheck.push(listCrossRight)

      console.log(listCheck)
      const pos = this.state.postion ;
      let nx = 0;
      let no = 0;
      for(let i=0 ; i<listCheck.length ; i++){
        const p = listCheck[i];
         nx = 0;
         no = 0;
        for(let j=0 ; j<p.length ; j++){
          try {
            for(let k=0 ; k<pos.length ; k++){
              const c = pos[k]
                if(c[1] === p[j] && c[0] === "X"){
                  nx = nx+1 ;
                  if(nx === size){
                    break;
                  }else{
                    const newstatus = 'Player is ' + (this.state.xIsNext ? 'O' : 'X');
                    this.setState({
                      status : newstatus
                    })
                  }
                }else if(c[1] === p[j] && c[0] === "O"){
                  no = no+1 ;
                  if(no === size){
                    break;
                  }else{
                    const newstatus = 'Player is ' + (this.state.xIsNext ? 'O' : 'X');
                    this.setState({
                      status : newstatus
                    })
                  }
                }
            }
            
          } catch (error) {
            
          }
        }
        
        if(nx === size){
          const newstatus = 'Winner is X';
          this.setState({
            status: newstatus,
          })
          await this.maxid();
          await this.savehistory();
          break;
        }else if(no === size){
          const newstatus = 'Winner is O';
          this.setState({
            status : newstatus,
          })
          await this.maxid();
          await this.savehistory();
          break;
        }
      }
    }

    handleClick=(i)=> {
      console.log("i "+i)
      const history = this.state.board;
      let ck = 0;
      for(let s=0 ; s<history.length ; s++){
          const  counts = history[s];
        for(let j=0 ; j<counts.length ; j++){
          if(counts[j] === i){
            this.state.squares[counts[j]] = this.state.xIsNext ? 'X' : 'O';
            const winner = this.calculateWinnerxo(this.state.squares,this.state.numT,i,history);
              if (winner || this.state.squares[counts[j]]) {
                const r =[];
                const poscopy = this.state.postion;
                const ans = counts[j] ;
                r.push(ans);
                r.push(i);
                poscopy.push(r);
                this.setState({
                  board: winner ,
                    xIsNext: !this.state.xIsNext,
                  postion : poscopy  
                });    
                this.checkwinner();
              }
            ck = 1 ;
            break;
          }
        }
        if(ck === 1){
          break;
        }
      }

    }

    render() {
        return (         
            <div className="game col " style={{overflow : "auto"}}>
                <div>
                    <select name='celnum' id='celnum' onChange={((e)=>this.selectTable(e.target.value))}>
                      {this.state.selectnumT.map((j)=>(
                        <option value={j}>{j+"X"+j}</option>
                      ))}
                    </select>
                </div>

                <div className='col'>
                { this.state.board.map((i) => (
                      <div className='rows'>
                        {i.map((k) => (
                            <button style={{ color:'red' , backgroundColor:'white' , width:50 , height:50} } onClick={()=> this.handleClick(k)}>
                              {k.toString()}
                            </button>
                        ))}
                      </div>
                ))}
                </div>
                <div className="game-info">
                  <div>{this.state.status}</div>
                </div>
                
                
                  <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"center" }}>
                  <div className='col'>
                      {this.state.listgameid.map((n) => {
                        const gid ="/loadgame/"+ n ;
                        return(
                          <div className='rows' style={{marginTop : 15 }}>
                            <Link to={gid}><Button variant="contained">{n+" "} LoadGame</Button></Link>
                          </div>
                        )
                      })}
                  </div>  
                  </Paper>
                  
            </div>
            
        )
        
    }
}
