// This file has been modified to make the app display what i want
import React from 'react';
import Ligue1 from '../images/Ligue1.png';
import PremierLeague from '../images/PremierLeague.png'

const LeagueInfo = (props) => {
    let imgSrc;
    switch (props.leagueCaption) {

        case "Ligue 1":
            imgSrc = Ligue1;
            break;

        case "Premier League":
            imgSrc = PremierLeague;
            break;

        default:
            imgSrc = PremierLeague;
            break;
    }

    return (
        <div className="league-info">
            <img src={imgSrc} alt="" />
        </div>
    );
};

export default LeagueInfo;