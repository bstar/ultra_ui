import React from 'react';

const styles = {
  borderTop: '1px solid rgb(46, 110, 115)',
  backgroundColor: 'rgba(57, 74, 89, .97)',
  boxShadow: '0px -11px 56px -13px rgba(0,0,0,0.45)',
  position: 'fixed',
};

class Footer extends React.Component {
  render() {
    return (
      <section className="app-footer" style={styles}>
        <div className="container-fluid">
          <span className="float-left">
          </span>
          <span className="float-right">
            <span>EHM League Companion</span>
          </span>
        </div>
      </section>
    );
  }
}

export default Footer;
