import React from 'react';
import { connect } from 'dva';
import Header from '../../components/Header/Header';
// import Demo from '../../components/left/left';
// import Carousels from '../../components/Carousels/Carousels';
import Demo from '../../components/left/left3';
function HomePage() {
  return (
    <div>
      <Header />
      <Demo />
    </div>
  );
}

HomePage.propTypes = {
};

export default connect()(HomePage);
