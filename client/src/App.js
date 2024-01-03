//The fetchData was written by me and the rest has been refactored
import React, { Component } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Row from './components/Row';
import TableBody from './components/TableBody';
import LeagueInfo from './components/LeagueInfo';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      leagueName: 'Premier League',
      rows: [],
      leagueId: 'PL',
      leagues: {
        "Premier League": 'PL',
        "Ligue 1": 'FL1',
      },
      buttons: []
    }
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick = (e) => {
    const newId = e.target.getAttribute('data-leagueid');
    this.setState({
      leagueId: newId
    }, () => this.fetchData());
  }

  fetchData = async () => {
    const leagueId = this.state.leagueId;
    const URL = `http://localhost:5000/api/standings/${leagueId}`;
  
    try {
      const response = await fetch(URL);
      const responseJson = await response.json();
      const newRows = responseJson.standings[0].table.map((item, index) => {
        const { position, playedGames, won, draw, lost, goalsFor, goalsAgainst, goalDifference, points } = item;
        const {crest, name} = item.team;
        console.log(responseJson);
        return (
          <Row key={index} position={position} crestURI={crest} teamName={name} playedGames={playedGames} wins={won} draws={draw} losses={lost} goalsFor={goalsFor} goalsAgainst={goalsAgainst} goalDifference={goalDifference} points={points} />
        );
      });
      this.setState({
        leagueName: responseJson.competition.name,
        rows: newRows
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  componentDidMount() {
    this.fetchData();
    this.setState({
      buttons: Object.keys(this.state.leagues).map(key => (
        <Button handleClick={this.onButtonClick} key={this.state.leagues[key]} leagueId={this.state.leagues[key]} text={key} />
      ))
    });
  }

  render() {
    
    return (
      <div className="app">
        <h2>Select your league</h2>
        <Header>
          {this.state.buttons}
        </Header>
        <div className="container">
          <LeagueInfo leagueCaption={this.state.leagueName} />
          <TableBody>
            {this.state.rows}
          </TableBody>
        </div>
      </div>
    );
  }

}

export default App;