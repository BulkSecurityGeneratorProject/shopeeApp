import React from 'react';
import { Switch } from 'react-router-dom';

import Login from 'app/modules/login/login';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';
import NhapDiem from 'app/modules/nhapdiem/nhapdiem';
import ManagerClass from 'app/modules/managerClass/managerClass';

// tslint:enable

const Routes = () => (
  <div className="view-routes">
    {/*<ErrorBoundaryRoute path="/login" component={Login}/>*/}
    <Switch>
      <ErrorBoundaryRoute exact path="/" component={Home}/>
      <ErrorBoundaryRoute path="/login/:role" component={Login}/>
      <ErrorBoundaryRoute path="/nhap-diem" component={NhapDiem}/>
      <ErrorBoundaryRoute path="/quan-ly-lop-hoc" component={ManagerClass}/>
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]}/>
    </Switch>
  </div>
);

export default Routes;
