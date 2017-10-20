import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/concatAll';

import React, { Component } from 'react';

import ActivityLogComponent from './ActivityLogComponent';
import { Observable } from 'rxjs/Observable';
import PropTypes from 'prop-types';
import config from '../config';
import createApi from '../api';
import moment from 'moment';
import { sortBy } from 'ramda';

class ActivityLogContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: []
    };
    this.api = createApi(config.api.url);
  }

  refreshActivity = (client) => {
    console.log(client);
    Observable.merge(
      this.api.get(`/clients/${client._id}/sessions`)
        .filter(x => !!x.sessionLog)
        .map(({ sessionLog }) => {
          return sessionLog.map(s => ({ type: 'session', log: s }));
        }),
      this.api.get(`/clients/${client._id}/payments`)
        .filter(x => !!x.paymentLog)
        .map(({ paymentLog }) => {
          return paymentLog.map(p => ({ type: 'payment', log: p }));
        })
    )
    .concatAll()
    .toArray()
      // With be both sessions and payments one at a time
      .subscribe(activity =>{
        const sortedActivity = sortBy(x => -moment(x.log.date).unix(), activity);
        console.log('activity', sortedActivity);
        this.setState({ activity: sortedActivity });
      });
  }

  componentDidMount() {
    this.refreshActivity(this.props.client);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props === nextProps) {
      return;
    }

    this.refreshActivity(nextProps.client);
  }

  render() {
    return <ActivityLogComponent activity={this.state.activity} />
  }
}

ActivityLogContainer.propTypes = {
  client: PropTypes.object.isRequired
};

export default ActivityLogContainer;
