import React, {Component} from 'react';
import nba from '../nba-client';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';


window.d3_hexbin = {hexbin : hexbin}; // workaround library problem
class ShotChart extends Component {
    static propTypes = {
        playerId: PropTypes.number,
        minCount: PropTypes.number,
        chartType: PropTypes.string,
        displayTooltip: PropTypes.bool,
    }
    componentDidMount() {
        nba.stats.shots({
            PlayerID: this.props.playerId
        }).then((response) => {
            console.log('response: ', response);
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,
            }));
     
            const courtSelection = d3.select("#shot-chart");
            const chart_court = court().width(500);
            const chart_shots = shots().shotRenderThreshold(2).displayToolTips(true).displayType("hexbin");
            courtSelection.call(chart_court);
            courtSelection.datum(final_shots).call(chart_shots);
        })
     }
     
    render() {
        return (
            <div id="shot-chart"></div>
        )
    }
}

export default ShotChart;