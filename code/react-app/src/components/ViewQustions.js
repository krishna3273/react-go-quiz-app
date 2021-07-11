import React, { Component } from 'react';
// import './Showqns.css';
import { Link } from 'react-router-dom';

class ViewQustions extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      id: params.match.params.id,
      i:0,
      formData : {
        is_a:false,
        is_b:false,
        is_c:false,
        is_d:false
      },
      formData2:{
        email:localStorage.email,
        qid: params.match.params.id,
        score:0,
        genre:"",
        qtype:""
      },
      submitted:false

    }
    this.Nextqn = this.Nextqn.bind(this);
    this.Printmy = this.Printmy.bind(this);
    this.myhandleChange = this.myhandleChange.bind(this);
    this.SubmitQuiz = this.SubmitQuiz.bind(this);
    

  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    console.log(this.state.data)

  }
Printmy(option){
      if(this.state.data && this.state.data[this.state.i]!==undefined){
      if(option==="q")return("Q)"+this.state.data[this.state.i].question)
      if(option==="a")return("a)"+this.state.data[this.state.i].opt1)
      if(option==="b")return("b)"+this.state.data[this.state.i].opt2)
      if(option==="c")return("c)"+this.state.data[this.state.i].opt3)
      if(option==="d")return("d)"+this.state.data[this.state.i].opt4)
      }
  }
myhandleChange(a,event) {
    if (a===1){
        if(event.target.checked){
            this.setState((prevst)=>{
                prevst.formData.is_a = true;
                return prevst;
            });
        }
        else{
                        
            this.setState((prevst)=>{
                prevst.formData.is_a = false;
                return prevst;
            });
        }
    }
    if (a===2){
        if(event.target.checked){
            this.setState((prevst)=>{
                prevst.formData.is_b = true;
                return prevst;
            });
        }
        else{
                     
            this.setState((prevst)=>{
                prevst.formData.is_b = false;
                return prevst;
            });
        }
       
    }
    if (a===3){
        
           if(event.target.checked){
            this.setState((prevst)=>{
                prevst.formData.is_c = true;
                return prevst;
            });
        }
        else{
                         
            this.setState((prevst)=>{
                prevst.formData.is_c = false;
                return prevst;
            });
        }
    }
    if (a===4){
        
            if(event.target.checked){
                this.setState((prevst)=>{
                    prevst.formData.is_d = true;
                    return prevst;
                });
            }
            else{
                         
                this.setState((prevst)=>{
                    prevst.formData.is_d = false;
                    return prevst;
                });
            }
        }                          
}
Nextqn(){
    if(this.state.data && this.state.data[this.state.i]!==undefined){
    if(this.state.formData.is_a===this.state.data[this.state.i].isopt1 && this.state.formData.is_b===this.state.data[this.state.i].isopt2 && this.state.formData.is_c===this.state.data[this.state.i].isopt3 && this.state.formData.is_d===this.state.data[this.state.i].isopt4)
    {
        
        this.state.formData2.score+=1
        
       }
    if((this.state.i+1)<=this.state.data.length){
    this.setState({i:this.state.i+1});
    
    this.setState({formData:{is_a:false,is_b:false,is_c:false,is_d:false}})
    }
    }
}
SubmitQuiz (event) {
    event.preventDefault();
    
    fetch('http://localhost:8080/addscore/'+this.state.id,{
     method: 'POST',
     body: JSON.stringify(this.state.formData2)
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
           this.setState({submitted: true});
      });
       {this.state.formData2.score==1 && this.setState({submitted: true})};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>
              {(this.state.submitted==false && this.state.data.length!=0) && <h1>Questions</h1>}
              {this.state.i<this.state.data.length && <div>
                    {this.state.data[this.state.i].ismul==true && <p>Single Corrrect Answer</p>}
                    {this.state.data[this.state.i].ismul==false && <p>Multiple Corrrect Answer</p>}
                    <p>{this.Printmy("q")}</p>
                    <p><input type="checkbox" checked={this.state.formData.is_a} onChange={this.myhandleChange.bind(this,1)}/> {this.Printmy("a")}</p>    
                    <p><input type="checkbox" checked={this.state.formData.is_b} onChange={this.myhandleChange.bind(this,2)}/> {this.Printmy("b")}</p>    
                    <p><input type="checkbox" checked={this.state.formData.is_c} onChange={this.myhandleChange.bind(this,3)}/> {this.Printmy("c")}</p>
                    <p><input type="checkbox" checked={this.state.formData.is_d} onChange={this.myhandleChange.bind(this,4)}/> {this.Printmy("d")}</p>
                <button onClick={this.Nextqn}>Next</button>
                <br></br>
                {localStorage.isAuth==2 &&
                <Link to={"/UpdateQuestion/"+this.state.data[this.state.i].id}>Edit this question</Link>}
                <br></br> 
                </div> }                
                
           

          {(this.state.i >= this.state.data.length && this.state.submitted==false && this.state.data.length!=0) && <button className="btn btn-default" onClick={this.SubmitQuiz }>Submit</button>}
           {this.state.submitted && 
          <div>  
          <p>Congratulations Your score is {this.state.formData2.score}</p>
          
          </div>
           } 
           <br></br>
          {localStorage.isAuth=="2" && <Link to={'/CreateQuestion/'+this.state.id}>Create Questions</Link>}
           <br></br>
           {localStorage.isAuth=="2" && <Link to={'/DeleteQuestion/'+this.state.id}>Delete Questions</Link>}
                
      </div>
    );
  }
}

export default ViewQustions;
