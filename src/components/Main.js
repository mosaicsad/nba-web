import React, {Component} from 'react';
import nba from '../nba-client';
import Profile from './Profile';
import ShotChart from './ShotChart';
class Main extends Component {
    state = {
        playerInfo: {},
        playerId: 201939,
    }
    componentDidMount() {
        window.nba = nba;
        const PlayerID = nba.findPlayer('Stephen Curry').playerId;
        nba.stats.playerInfo( {PlayerID }
        ).then(info => {
            const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({
                playerInfo: playInfo,
                playerId: PlayerID,
            });
        });
    }
    render() {
        return (
        <div className="main">
            <Profile playerInfo={this.state.playerInfo} />
            <ShotChart playerId={this.state.playerId} />
        </div>
        )
    }
}

export default Main;