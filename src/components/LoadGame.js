import React, { Component ,useEffect } from 'react';
import { Link }from "react-router-dom";


export default class LoadGame extends Component {

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
            historyplay : []
        }
    }
    async componentWillMount(){
        const gameid = this.props.match.params.gid ;
        console.log("gid "+gameid)
        await this.fetchgameid(gameid);
        await this.selectTable();
        console.log("gid "+this.state.historyplay)


    }

    async fetchgameid(gameid){
        await fetch("http://localhost:8080/getListHistoryPlay/"+gameid)
        .then(res => res.json())
        .then((result)=>{
            this.setState({
                historyplay : result
            })
            
          }
        );
      }

    selectTable() {
      const value  = this.state.historyplay[0].siza;
      console.log("value = " + value)
      debugger
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

    calculateWinnerxo(squares,numT,i,history,type) {
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
    
              const ans = type;
              console.log('ans ='+ans);
              
              copytable[s].splice(j,1,ans);
              console.log('table ='+table);
               
               return copytable;
            }
          }
        }
      return null;
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
          break;
        }else if(no === size){
          const newstatus = 'Winner is O';
          this.setState({
            status : newstatus,
          })

          break;
        }
      }
    }

    async handleClick(i , type) {
      console.log("i "+i)
      const history = this.state.board;
      let ck = 0;
      for(let s=0 ; s<history.length ; s++){
          const  counts = history[s];
        for(let j=0 ; j<counts.length ; j++){
          if(counts[j] === i){
            this.state.squares[counts[j]] = this.state.xIsNext ? 'X' : 'O';

            const winner =await this.calculateWinnerxo(this.state.squares,this.state.numT,i,history,type);
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
    

    async autoclick(){
      const his = this.state.historyplay;
      for(let i=0 ; i<his.length ; i++){
        await timeout(1000);
        await this.handleClick(parseInt(his[i].postion),his[i].type)
      }
      debugger
      const gameid = this.props.match.params.gid ;
      console.log("gid "+gameid)
      await this.fetchgameid(gameid);
      await this.selectTable();
    }

    render(){
        return(
            <div className="game col">
            
            <div className='col'>
            { this.state.board.map((i) => (
                  <div className='rows'>
                    {i.map((k) => (
                        <button style={{ color:'red' , backgroundColor:'white' , width:50 , height:50} } key={k}>
                          {k.toString()}
                        </button>
                    ))}
                  </div>
            ))}
            </div>
            <div className="game-info">
              <div>{this.state.status}</div>
            </div>
            
            <div>
              <div></div>
              <div><button  onClick={()=> this.autoclick()}>ReplayGame</button></div>
              <div><Link to="/"><button >PlayGame</button></Link></div>
            </div>    
        </div>
        )
     }

}
function timeout(delay) {
  let d = parseInt(delay);
  return new Promise( res => setTimeout(res, d) );
}