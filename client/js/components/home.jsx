"use strict";

import React                    from 'react';
import assets                   from '../libs/assets';

class Home extends React.Component {

  render(){

    const img = assets("./images/atomicjolt.jpg");

    return<div>
      <h1>React Firebase Starter App</h1>
        {this.props.children}
        <div className="footer">
          <p>
            <img src={img} />
            Built by <a href="http://www.atomicjolt.com">Atomic Jolt</a>.
          </p>
        </div>
    </div>;
  }

}

export { Home as default };