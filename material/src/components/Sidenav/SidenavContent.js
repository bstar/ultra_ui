import React from 'react';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';
import 'jquery-slimscroll/jquery.slimscroll.min';

const styles = {
  textItem: {
    fontSize: '16px',
    textShadow: '1px 1px 6px rgba(0,0,0,.8)',
    color: '#ccc',
  }
}


class SidebarContent extends React.Component {

  componentDidMount() {
    const { history } = this.props;
    const nav = this.nav;
    const $nav = $(nav);

    // scrol  l
    // $nav.slimscroll({
    //   height: '100%'
    // });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = history.location;
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    history.listen((location) => {
      highlightActive(location.pathname);
    });
  }

  render() {

    return (
      <div>
        <ul className="nav" ref={(c) => { this.nav = c; }}>
          <li style={{ marginLeft: '13px', marginTop: '25px' }} className="nav-header">

            <img style={{ filter: 'drop-shadow(2px 4px 6px #252525)', opacity : 0.65 }} src="assets/img/ehmlc_logo.png" alt="Responsive Layout" />
          </li>

          <br />
          <li>
            <FlatButton href="#/app/releasenotes">
              <i className="nav-icon material-icons">notes</i>
              <span className="nav-text" style={ styles.textItem }>Releases</span>
            </FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/playersearch"><i className="nav-icon material-icons">search</i><span className="nav-text" style={ styles.textItem }>Search</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/lists"><i className="nav-icon material-icons">account_circle</i><span className="nav-text" style={ styles.textItem }>GMs</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/lists"><i className="nav-icon material-icons">store</i><span className="nav-text" style={ styles.textItem }>Teams</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/lists"><i className="nav-icon material-icons">language</i><span className="nav-text" style={ styles.textItem }>Rankings</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/lists"><i className="nav-icon material-icons">list</i><span className="nav-text" style={ styles.textItem }>Lists</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/tags"><i className="nav-icon material-icons">style</i><span className="nav-text" style={ styles.textItem }>Tags</span></FlatButton>
          </li>
          <li>
            <FlatButton href="#/app/admin"><i className="nav-icon material-icons">supervisor_account</i><span className="nav-text" style={ styles.textItem }>Admin</span></FlatButton>
          </li>
        </ul>


      </div>
    );
  }
}

export default withRouter(SidebarContent);
