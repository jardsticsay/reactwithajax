import React, { Component } from 'react';
// import logo from './logo.svg';
// import axios from 'axios';
import $ from 'jquery';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
    };
  }

  getInitialState(){
    return { text: ''};
  }

  componentDidMount(){
    var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
    var username = "ussd";
    var password = "ussd2019";
    var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
    var parseData;
    var splitData;
    var arrayContent;
    var dataToPass = {
      "method":"select",
          "data":{
              "table":"keyword",
              "returnID":"121"
          }
  }
    $.ajax({
      type:"POST",
      url: apiUrl,
      contentType: "json",
      data : JSON.stringify(dataToPass
      ),
      beforeSend: function(xhr){
          xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
          xhr.setRequestHeader ("Action", actionPoint);
      },
      success : function(response){
          parseData = JSON.parse(response);
          splitData = parseData.methodResponse.content.split('_').join(') ');
          arrayContent = splitData.split('|');
          console.log(arrayContent)
          this.setState({hits: arrayContent});
          console.log({hits: parseData.methodResponse})
      }.bind(this),
      error: function(textStatus,errorThrown){
          console.error(textStatus,errorThrown);
      
      },
  });

  

  }

  render() {
    // hits is now declared as methodResponse in swisknife API. You can pull now the object to view
    // Example: {hits.returnID}
    const { hits } = this.state;
      return (
        <div className="App">
          { hits }
        </div>
      );
    
  }
}

export default App;
