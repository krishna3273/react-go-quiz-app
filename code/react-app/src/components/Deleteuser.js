
import React, { Component } from 'react';
import './DeletePerson.css';

class Deleteuser extends Component {
    constructor() {
      super();
      this.state = {
          submitted: false,
        data: [] ,
        to_del:[],
      }
      this.record=this.record.bind(this);
      this.deleteppl=this.deleteppl.bind(this);
    }
    
    record(event) {
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
          fetch('http://127.0.0.1:8080/deleteuser/'+id,{ method : 'DELETE' }).then(res=> {console.log(res);this.after_forloop();});
        })
      }
    
    

    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/user/');
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
                <th>Username</th>
                <th>checkbox</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                 return (
                    <tr key = {key}>
                     {item.isadmin==false &&
                        <td>{item.id}</td>}
                        {item.isadmin==false &&
                        <td>{item.name}</td>}
                        {item.isadmin==false &&<td><input type="checkbox" id={item.id} onChange={this.record}></input></td>}
                        </tr>
                  )
               })}
            </tbody>
         </table>
         <button onClick={this.deleteppl} >delete</button>
         <div>
         {this.state.submitted &&
            <h1>Deleted!</h1>
         }
         </div>
        </div>
      );
    }
  
  
  
  
  
  
  
  
}
  


export default Deleteuser;