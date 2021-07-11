import React, { Component } from 'react';
// import './Showqns.css';
import { Link } from 'react-router-dom';

class ViewQustions extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      // genre: params.match.params.genre,
      id: params.match.params.id,
      i:0,
      // admin:localStorage.getItem('admin'),
      formData : {
        check_a:"FALSE",
        check_b:"FALSE",
        check_c:"FALSE",
        check_d:"FALSE"
      },
      formData2:{
        // username:localStorage.getItem('user'),
        id: params.match.params.id,
        // genre: params.match.params.genre,
        score : 0
      },
      submitted:false

    }
    this.Nextqn = this.Nextqn.bind(this);
    this.PrintOption = this.PrintOption.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.SubmitQuiz = this.SubmitQuiz.bind(this);
    // this.DeleteQuestion = this.DeleteQuestion.bind(this);

  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    console.log(this.state.data)

  }
  /*DeleteQuestion(){
    if(this.state.data && this.state.data[this.state.i]!==undefined){
    const request = new Request('http://localhost:8080/del_qn/' + this.state.data[this.state.i].questionid);
    // console.log(request)
    fetch(request,{method:'DELETE'})
    .then(response => {
      if(response.status >= 200 && response.status < 300)
        // this.setState({submitted: true});
        window.location.reload()
      });}}*/
  PrintOption(option){
      if(this.state.data && this.state.data[this.state.i]!==undefined){
      if(option==="q")return(this.state.data[this.state.i].question)
      if(option==="a")return("a)"+this.state.data[this.state.i].opt1)
      if(option==="b")return("b)"+this.state.data[this.state.i].opt2)
      if(option==="c")return("c)"+this.state.data[this.state.i].opt3)
      if(option==="d")return("d)"+this.state.data[this.state.i].opt4)
      if(option==="n")if(this.state.i+1<this.state.data.length)return("Next")
      }
  }
handleQuestionChange(a,event) { 
    if (a===1){
        if(event.target.checked){this.state.formData.check_a = "TRUE";}
            else{this.state.formData.check_a = "FALSE";}}
    if (a===2){
        if(event.target.checked){this.state.formData.check_b = "TRUE";}
            else{this.state.formData.check_b = "FALSE";}}
    if (a===3){
        if(event.target.checked){this.state.formData.check_c = "TRUE";}
            else{this.state.formData.check_c = "FALSE";}}
    if (a===4){
        if(event.target.checked){this.state.formData.check_d = "TRUE";}
            else{this.state.formData.check_d = "FALSE";}}                          
      }
Nextqn(){
    if(this.state.data && this.state.data[this.state.i]!==undefined){
    if(this.state.formData.check_a===this.state.data[this.state.i].isopt1 && this.state.formData.check_b===this.state.data[this.state.i].isopt2 && this.state.formData.check_c===this.state.data[this.state.i].isopt3 && this.state.formData.check_d===this.state.data[this.state.i].isopt4)
    {this.state.formData2.score +=1}
    if(this.state.i+1<this.state.data.length){
    }
    this.setState({i:this.state.i+1});
    }
}
SubmitQuiz (event) {
    /*event.preventDefault();
    this.Nextqn();  
    fetch('http://localhost:8080/add_scores',{
     method: 'POST',
     body: JSON.stringify(this.state.formData2)
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });*/

  }
  ShowResult(){
          {"Score="+this.state.formData.score}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>
              <h1>Questions</h1>
              {/* { this.state.data &&  */}
                <div>
                    {/* {this.state.admin=="TRUE" && */}
                    {/* <div> */}
                    {/* <button><Link to={'/Createqn/'+this.state.genre+"/"+this.state.quiz_id}>Add question</Link></button> */}
                    {/* <button><Link to={'/Updateqn/'+this.state.data}>update question</Link></button> */}
                    
                    {/* <button  onClick={this.DeleteQuestion}>Delete</button> */}
                    {/* </div> */}
                    {/* }                   */}
                    <p>{this.PrintOption("q")}</p>
                    <p><input type="checkbox" value={this.state.formData.check_a} onChange={this.handleQuestionChange.bind(this,1)}/> {this.PrintOption("a")}</p>    
                    <p><input type="checkbox" value={this.state.formData.check_b} onChange={this.handleQuestionChange.bind(this,2)}/> {this.PrintOption("b")}</p>    
                    <p><input type="checkbox" value={this.state.formData.check_c} onChange={this.handleQuestionChange.bind(this,3)}/> {this.PrintOption("c")}</p>
                    <p><input type="checkbox" value={this.state.formData.check_d} onChange={this.handleQuestionChange.bind(this,4)}/> {this.PrintOption("d")}</p>
                    {/* <p>{item.option_a}</p>
                    <p>{item.option_b}</p>
                    <p>{item.option_c}</p>
                    <p>{item.option_d}</p> */}
                <button onClick={this.Nextqn}>{this.PrintOption("n")}</button> 
                </div>                 
                }
           {/* <p>{this.state.submitted}</p>   */}

          <button className="btn btn-default" onClick={this.SubmitQuiz }>Submit</button>
          {this.state.submitted &&
          <div>  
          {/* <Link to={'/Showscore/'+this.state.genre+"/"+this.state.quiz_id+"/"+this.state.formData2.score}><button className="btn btn-default">score</button></Link>               */}
          <p>this.formData2.score</p>
          </div>
          }

      </div>
    );
  }
}

export default ViewQustions;
