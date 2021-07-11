
import React, { Component } from 'react';
import './DeletePerson.css';

class DeleteQuestion extends Component {



    constructor(params) {
      super(params);
      this.state = {
        data: [] ,
        to_del:[],
        id:params.match.params.id
      }
      this.ops=0;
      this.recnum=this.recnum.bind(this);
      this.deleteppl=this.deleteppl.bind(this);
      
    }
    recnum(event) {
      var to_del=this.state.to_del;
      (event.target.checked)?(to_del.push(event.target.id)):(to_del.splice(to_del.indexOf(event.target.id),1));
      this.setState({to_del:to_del});
    }

    after_forloop(){
        this.ops++;
        if(this.ops>=this.state.to_del.length)
          window.location.reload();
        
  
      }
    


    deleteppl(){
      this.state.to_del.forEach(id=>{
        console.log(id);
        fetch('http://127.0.0.1:8080/deletequestion/'+id,{ method : 'DELETE' }).then(res=> {console.log(res);this.after_forloop();});
      })
    }
  
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.id);
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}));
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">View All Quizes</h1>
          </header>
  
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>checkbox</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                 return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.question}</td>
                        <td><input type="checkbox" id={item.id} onChange={this.recnum}></input></td>
                    </tr>
                  )
               })}
            </tbody>
         </table>
         <button onClick={this.deleteppl} >delete</button>
        </div>
      );
    }
  
  
  
  
  
  
  
  
}
  


export default DeleteQuestion;