import React, { Component } from 'react';
// import NewComponent from './NewComponent';
import './Home.css'

class UpdateQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
         data:[],
         qs:"hi",
      formData: {
        question:"",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        ismul: "",
        isopt1: "",
        isopt2: "",
        isopt3: "",
        isopt4: ""
      },
     quesid:params.match.params.id,
      submitted: false,
    }
    this.handleAChange = this.handleAChange.bind(this);
    this.handleBChange = this.handleBChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this); 
    this.handleEChange = this.handleEChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);
    this.handleHChange = this.handleHChange.bind(this);
    this.handleIChange = this.handleIChange.bind(this);
    this.handleJChange = this.handleJChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Updatevalues=this.Updatevalues.bind(this);
    // this.give=this.give.bind(this)
  }


  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/'+this.state.quesid);
    fetch(request)
      .then(response => response.json())
        .then(data => {this.setState({data: data})
            this.Updatevalues()})
    //   this.setState({qs:this.state.data.question})
    //  this.setState({formData:{question:"who are you"}})
    // this.setState({qs:"krishna"})
  }

/*give(option){
    // this.setState({qs:"sai"})
    if(option=="q")return("hi")
}*/

  Updatevalues(){
    //   if(this.state.data!=null){
        //   if(this.state.data!=undefined){
              this.state.formData.question=this.state.data.question
              this.state.formData.opt1=this.state.data.opt1
              this.state.formData.opt2=this.state.data.opt2
              this.state.formData.opt3=this.state.data.opt3
              this.state.formData.opt4=this.state.data.opt4
              this.state.formData.ismul=this.state.data.ismul
              this.state.formData.isopt1=this.state.data.isopt1
              this.state.formData.isopt2=this.state.data.isopt2
              this.state.formData.isopt3=this.state.data.isopt3
              this.state.formData.isopt4=this.state.data.isopt4

        //   }
    //   }
  }

  handleSubmit (event) {
    event.preventDefault();
    this.state.formData.ismul=JSON.parse(this.state.formData.ismul)
    this.state.formData.isopt1=JSON.parse(this.state.formData.isopt1)
    this.state.formData.isopt2=JSON.parse(this.state.formData.isopt2)
    this.state.formData.isopt3=JSON.parse(this.state.formData.isopt3)
    this.state.formData.isopt4=JSON.parse(this.state.formData.isopt4)
    fetch('http://localhost:8080/updatequestion/'+this.state.quesid, {
     method: 'PUT',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleAChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleBChange(event) {
    this.state.formData.opt1 = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.opt2 = event.target.value;
  }
  handleDChange(event) {
    this.state.formData.opt3 = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.opt4 = event.target.value;
  }
  handleFChange(event) {
    this.state.formData.ismul = event.target.value;
  }
  handleGChange(event) {
    this.state.formData.isopt1 = event.target.value;
  }
  handleHChange(event) {
    this.state.formData.isopt2 = event.target.value;
  }
  handleIChange(event) {
    this.state.formData.isopt3= event.target.value;
  }
  handleJChange(event) {
    this.state.formData.isopt4 = event.target.value;
  }
  

  render() {
    console.log(this.state.qs)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control"  defaultValue={this.state.data.question} onChange={this.handleAChange}/>
            </div>
            <div className="form-group">
                <label>option1</label>
                <input type="text" className="form-control" defaultValue={this.state.data.opt1} onChange={this.handleBChange}/>
            </div>
            <div className="form-group">
                <label>option2</label>
                <input type="text" className="form-control" defaultValue={this.state.data.opt2} onChange={this.handleCChange}/>
            </div>
            <div className="form-group">
                <label>option3</label>
                <input type="text" className="form-control" defaultValue={this.state.data.opt3} onChange={this.handleDChange}/>
            </div>
            <div className="form-group">
                <label>option4</label>
                <input type="text" className="form-control" defaultValue={this.state.data.opt4} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>yes if single answer</label>
                <input type="text" className="form-control" defaultValue={this.state.data.ismul} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>isopt1</label>
                <input type="text" className="form-control" defaultValue={this.state.data.isopt1} onChange={this.handleGChange}/>
            </div>
            <div className="form-group">
                <label>isopt2</label>
                <input type="text" className="form-control" defaultValue={this.state.data.isopt2} onChange={this.handleHChange}/>
            </div>
            <div className="form-group">
                <label>isopt3</label>
                <input type="text" className="form-control" defaultValue={this.state.data.isopt3} onChange={this.handleIChange}/>
            </div>
            <div className="form-group">
                <label>isopt4</label>
                <input type="text" className="form-control" defaultValue={this.state.data.isopt4} onChange={this.handleJChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New person successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default UpdateQuestion;