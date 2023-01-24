import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import Row from './components/Row';
import TableBody from './components/TableBody';
import LeagueInfo from './components/LeagueInfo';

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
    this.handleLeagueClick = this.handleLeagueClick.bind(this);
  }

  handleLeagueClick(e) {
    const newId = e.target.getAttribute('data-leagueid');
    this.setState({
      leagueId: newId
    }, () => { this.fetchData() });
  }

  fetchData = async () => {
    const Token = '4967e52fb7a74be5b8a76ade2ec5d9ed',
      leagueId = this.state.leagueId,
      URL = 'https://api.football-data.org/v2/competitions/' + leagueId + '/standings';

    try {
      const response = await fetch(URL, { headers: { 'X-Auth-Token': Token } });
      const responseJson = await response.json();
      const newRows = responseJson.standings[0].table.map((item, index) => {
        const { position, playedGames, won, draw, lost, goalsFor, goalsAgainst, goalDifference, points } = item;
        const {crestUrl, name} = item.team;
        return (
          <Row key={index} position={position} crestURI={crestUrl} teamName={name} playedGames={playedGames} wins={won} draws={draw} losses={lost} goalsFor={goalsFor} goalsAgainst={goalsAgainst} goalDifference={goalDifference} points={points} />
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
    for (let key in this.state.leagues) {
      this.state.buttons.push(
        <Button handleClick={this.handleLeagueClick} key={this.state.leagues[key]} leagueId={this.state.leagues[key]} text={key} />
      )
    }
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