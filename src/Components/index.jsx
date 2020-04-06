import React from 'react';
import Chart from './chart';
import axios from 'axios';

class Index extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        chart: [],
        contentLoaded: false
      };
    };

    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
            .then(res => {
                this.setState({ chart: res.data, contentLoaded: true })
            });
    };

    render() {
        if (!this.state.contentLoaded) return null;
        return (
            <>
                <Chart chart={this.state.chart}/>
            </>
        )
    };
};

export default Index;
