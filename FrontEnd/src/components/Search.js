import "../App.css";
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./Coin.js";
import Pagination from "./Pagination";
import HandleError from "./HandleError.js";
class Search extends React.Component{
  //We assign the state variable listOfCoins with an empty array
  //We use the function setListOfCoins to assign value to the state variable
      constructor(props)
      {
          super(props);
          this.state = 
          {
              value: "",
              query: "", //TO store the user query
              results: [], //TO store the results of the query
              loading: false, //To show the data is loading
              message: "", //Store any error message
              final_loading: false,
              currentPage : 1,
              postsPerPage : 5,
              currentPosts : [],
              caseCheckBox : "False",
              andCheckBox : "False",
              orCheckBox : "False",
              notCheckBox : "False"
          };
          this.cancel = "";
  }


   fetchSearchResults = (query, caseBox, andBox, orBox, notBox) => 
  {
    console.log("In Functions");
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const dummy_url = `http://127.0.0.1:8000/search+QUERY=${query}+CASE=${caseBox}+AND=${andBox}+OR=${orBox}+NOT=${notBox}`;;
    console.log("After API");
    console.log(dummy_url);
    console.log(url);
    Axios.get(dummy_url).then( 
      (response) => {
          console.log(response.data);
          this.setState({results : response.data});
          this.setState({loading:true});
          this.setState({final_loading : true})
          console.log(query);
          console.log("Printing results");
          console.log(this.state.results);
          this.pageSettings(1);
      }
    )
    .catch(function(error){
          <h5> Error!!!</h5>
        
    });
  }
 
  pageSettings = (currentPage) => {
    var indexOfLastPost = currentPage * this.state.postsPerPage;
    var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log(indexOfLastPost);
    console.log(indexOfFirstPost);
    this.setState({currentPosts : this.state.results.slice(indexOfFirstPost, indexOfLastPost)});
    console.log(this.state.currentPosts);
  }
  paginate = (pageNumber) => {
     this.setState({currentPage : pageNumber});
     console.log(this.state.currentPage);
     console.log("In PageNumber function");
     console.log(pageNumber);
     this.pageSettings(pageNumber);

  }
  handleChange = (event) => {
    // Autofill
    const { suggestions } = this.props;
    const query = event.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    // Autofill

     this.setState({value: event.target.value});
     this.setState({loading:false});
     this.setState({final_loading : false});
     console.log(this.indexOfLastPage);

     // Autofill
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      query: event.currentTarget.value
    });
    // Autofill
  };

  handleCaseCheckBox = (event) => {
    if (event.target.checked){
        console.log("Case Check Box is checked");
        this.setState({caseCheckBox:"True"});
        console.log(this.state.caseCheckBox);
    }
    else{
      this.setState({caseCheckBox:"False"});
      console.log("Case Check Box is unchecked");
      console.log(this.state.caseCheckBox);
    }

  }
  
  handleAndCheckBox = (event) => {
    if (event.target.checked){
      console.log("And Check Box is checked");
      this.setState({andCheckBox:"True"});
      console.log(this.state.andCheckBox);
    }
    else{
      this.setState({andCheckBox:"False"});
      console.log("And Check Box is unchecked");
      console.log(this.state.andCheckBox);
    }
  }

  handleOrCheckBox = (event) => {
    if (event.target.checked){
      console.log("OrCheck Box is checked");
      this.setState({orCheckBox:"True"});
      console.log(this.state.orCheckBox);
    }
    else{
      this.setState({orCheckBox:"False"});
      console.log("or Check Box is unchecked");
      console.log(this.state.orCheckBox);
    }
  }

  handleNotCheckBox = (event) => {
    if (event.target.checked){
      console.log("Not Check Box is checked");
      this.setState({notCheckBox:"True"});
      console.log(this.state.notCheckBox);
    }
    else{
      this.setState({notCheckBox:"False"});
      console.log("Not Check Box is unchecked");
      console.log(this.state.notCheckBox);
    }
  }

  handleClick = () => {
      // Autofill
      const { suggestions } = this.props;
      const query = document.getElementById("inputTxt").value;
      const filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
      // Autofill
      //const query=this.state.value;
      const caseBox = this.state.caseCheckBox;
      const andBox = this.state.andCheckBox;
      const orBox = this.state.orCheckBox;
      const notBox = this.state.notCheckBox;
      this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query, caseBox, andBox, orBox, notBox); //TO call the function
      console.log(this.indexOfLastPage);
      console.log(query);
      }); //loading:true and message empty: So When typed it moves away
  };

  // Autofill
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      query: e.currentTarget.innerText
    });
  };
  // Autofill

  // Autofill
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        query: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  // Autofill

  render(){
    // Autofill
    const {
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        query
      }
    } = this;
    // Autofill
    let suggestionsListComponent;
    if (showSuggestions && query) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
  
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                      {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }
    return (
      <div className="App">
        <div className="cryptoHead">
            <h1> "SearchLite!!" </h1>
        </div>
        <div className="cryptoHeader">
        <input
            id = "inputTxt"
            type="text"
            placeholder="Search here..."
            onChange= {this.handleChange}
            onKeyDown={onKeyDown}
            value={query}
          />
          <button type="button" class="btn btn-secondary" onClick = {this.handleClick}>
              Search
          </button>
        </div>
        <div className="cryptoHead">
        {suggestionsListComponent}
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Case" onChange={this.handleCaseCheckBox}/>
              <label class="form-check-label" for="inlineCheckbox1">Case</label>
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="And" onChange={this.handleAndCheckBox}/>
              <label class="form-check-label" for="inlineCheckbox2">And</label>
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="Or" onChange={this.handleOrCheckBox}/>
              <label class="form-check-label" for="inlineCheckbox3">Or</label>
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="Not" onChange={this.handleNotCheckBox}/>
              <label class="form-check-label" for="inlineCheckbox4">Not</label>
          </div>
        </div>
      
        <div className = "cryptoDisplay">
              <Coin Posts={this.state.currentPosts} loading={this.state.loading} final_loading={this.state.final_loading} value={this.state.value}/>
              <Pagination postsPerPage = {this.state.postsPerPage} totalPosts = {this.state.results.length} paginate={this.paginate}/>
        </div>
      </div>
    );


  }
}
export default Search;
