import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Userdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repo: []
    };

     this.handleClickAlltime = this.handleClickAlltime.bind(this);
     this.handleClickRecent = this.handleClickRecent.bind(this);
  }

   handleClickAlltime() {
    var myElement = document.querySelector(".tableTitleAlltime");
myElement.style.fontWeight = "bold";
     myElement = document.querySelector(".tableTitleRecent");
        myElement.style.fontWeight = "normal";


     this.getClick("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
  }

  handleClickRecent(){
        var myElement = document.querySelector(".tableTitleRecent");
        myElement.style.fontWeight = "bold";
    myElement = document.querySelector(".tableTitleAlltime");
myElement.style.fontWeight = "normal";
        this.getClick("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
  }

  getClick(url){
      var that = this;

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          repo: data
        });
      });
  }


  componentDidMount() {

    var that = this;
    var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          repo: data

        });

      });
  }

  render() {
    return (
      <div className="viewController">
        <div className="title">
          camperLeaderboard
        </div>
        <div className="tableTitle">
          <div className="tableTitleRank">
            rank
          </div>
          <div className="tableTitleUser">
            &nbsp;user
          </div>

          <div className="tableTitleRecent">
                    <a href="#" onClick={this.handleClickRecent}>
            &nbsp;recent
            </a>
          </div>
            <div className="tableTitleAlltime">
            <a href="#" onClick={this.handleClickAlltime}>
            all time
            </a>
          </div>
        </div>
        <div className="tableArea">
          <ViewData data={this.state.repo}/>
        </div>
      </div>
    );
  };
}

class ViewData extends React.Component {
  render() {
    var commentNodes = [];
    if (this.props.data.length > 0) {

      commentNodes = this.props.data.map(function(comment,i) {
        return (

              <div className="userMetadata">

            <div className="userRank">
              <div className="userRankData">
              #{i+1}
              </div>
            </div>
            <div className="userInfo">
            <figure>

            <a href={"https://www.freecodecamp.com/"+ comment.username} target="_blank">
              <img className="userAvatar" src= {comment.img} />
                <figcaption> {comment.username}</figcaption>
              </a>
            </figure>
            </div>

                <div className="userRecent">
                  <div>
                {comment.recent}
                  </div>
                </div>
                      <div className="userAlltime">
                  <div>
                {comment.alltime}
                  </div>
                </div>

                </div>

        );

      });
    }
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );

  }
}


export default Userdata;
