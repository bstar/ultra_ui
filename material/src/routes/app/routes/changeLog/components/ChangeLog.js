import React from 'react';
import QueueAnim from 'rc-queue-anim';


const posts = [
  {
    title: '0.5.5 Release: EHM 1.5 & SHA Era',
    date: '2021-07-01',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "Resurrecting the tool for SHA.  It's been about a year since the last update and I've addressed some nagging issues over that time.  There's a ton of placeholders for some incredible features that might still come to pass, but major architecture and changes in focus are unlikely.",
    issues: [
      "Major performance improvement in scrolling",
      "Fixed bug where cloned global lists were not loading properly",
      "On player detail page, arrow icon to show growth now supports 3 colors: green = +1, blue = +2, iridium = +3",
      "Improved where draft/iss/com rankings are surfaced",
      "Player detail page no longer has 'feats' text, just pills for accomplishments",
      "Back-end updates for EHM v1.5",
      "Lists can be exported now!",
    ]
  },
  {
    title: '0.5.0 Release: Player lists and user logins',
    date: '2020-07-06',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "This is the biggest release the tool has ever had.  There are major architectual changes, tons of new features and countless refinements.  We can now create lists in the tool.  That includes draft lists, rankings lists and protected personal lists.  Lists are integrated all over the tool now, giving us much more context at a glance and hopefully making the tedium of creating draft lists much easier.",
    issues: [
      "Updates API to suppors player lists",
      "API now supports user accounts",
      "User accounts support roles default/super/admin",
      "Players support list metadata, required for draft lists",
      "API protects personal lists by username",
      "Menu system now supports list views, organized by list type",
      "API And UI now utilize Javascript Web Tokens to protect all routes but login and registration",
      "When issues a JWT, it will last for a year",
      "Lists can be ordered by either horizontally locked drag and drop handles or by inputting the rank manually",
      "Draft lists are aware of ranking lists and vice versa, this manifests on the player detail page",
      "Modal architecture added for adding/deleting",
      "Notifications architecture for UI",
      "Better error handling",
      "Refined player detail page",
      "Player detail enhancements, more userful info",
      "More league logos will display now, this is an ongoing annoyance",
      "Search has lots of new search criteria",
      "Color coding in search results",
      "New 'irridium' color (purple) for rare attribute ratings",
      "Reordered search columns to make more sense",
      "Reworked UI state management to improve performance and support more features",
      "UI and API support authorization levels... initially only admins can create global lists (draft and rankings)",
    ]
  },
  {
    title: '0.4.1 Release: Minor Fixes',
    date: '2020-04-12',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "Bug fixes",
    issues: [
      "Fixes Player Detail blank page issue.",
      "Fixes some minor UI issues.",
    ]
  },
  {
    title: '0.4.0 Release: Web Only Going Forward',
    date: '2020-04-09',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "This is the web-only update, no more application builds to download.  The app will no longer work so you can trash it.  We now have mobile support and all future updates will happen transparently.  These changes are a precursor to supporting player tagging, player list and ultimately a live draft.  Enjoy.",
    issues: [
      "Reworked Player Detail state management to use redux and redux sagas.  All accessed players will get cached now, so loading them a second time will be instantaneous.",
      "Node server now caches all player requests.  The longer the server is up, the faster accessing players will be.",
      "Removed a bunch of the computed scores... we only care about COM scores and offensive scores.",
      "Introduced AO scores (Age Over).  It simply a players COM score divided by their age.",
      "Responsive design... you can now view all pages in the tool at any aspect ratio or resolution.",
      "Support for mobile devices.",
      "Revamped search page, now supporting responsive design principles.",
      "Can now filter by Nation.",
      "Player search results now support a left to right pan-able table.",
    ]
  },
  {
    title: '0.3.0 Release: UI Overhaul',
    date: '2019-04-26',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "This is primarily a UI update.  I tried to improve the look and feel of the Windows build.  Still have work to do there, but we have some progress.",
    issues: [
      "Addressed bugged Goalie line charts.  They were using the player attribute profile instead of the goalie profile.",
      "New greenish/Blue highlights",
      "Attributes are now highlighted based on their role relevance.  Blue=Primary, Green=Secondary, Orange=Tertiary, Red=Useless",
      "New Look and feel for Search.",
      "Scrollbars are normalized across windows/mac.  No more awful looking scrollbars on windows.",
      "Goalies now have their own graphic on the player detail page",
      "New EHMLC Logo.",
      "Mac build eliminates menu bar and integrates controls into the tool's header",
      "Window height is now fixed and height is based on platform.",
      "Added Line Chart for Combined growth",
      "Charts no longer show the whole date for each entry... having just the snapshot number and ATTs growth number allows for more plots to be displayed.",
      "Brought the footer back.",
      "Added support for a new league: GHL",
      "Removed ability to sort by weighted scores.  I never used this and it just made search more cumbersome.",
      "Brightened the blue link color to make it more readable and added alternating row highlights in Search.",
      "Doubled the maximum search result to 100 records from 50."
    ]
  },
  {
    title: '0.2.0 Release',
    date: '2019-02-22',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "Just added support for multiple leagues.  You can now jump between ESL & NASL.  The atomic.json file is no longer needed so it can be safely deleted.",
    issues: [],
  },
  {
    title: '0.1.2 Release',
    date: '2018-12-06',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "Quick update before the draft starts, goalies got some love.",
    issues: [
      "Player Detail view for Goalies should show the correct 'Technical' ATTs now.",
      "Radar chart now uses sensible ATTs for its data.",
      "No longer showing the ATTs gained number in the top right of the player detail page as it's redundant.",
      "Search page now keeps players/goalies seperate in the results.  Radio button controls what player type to filter by.",
      "Optimized background graphics."
    ]
  },
  {
    title: 'RC1 Notes',
    date: '2018-12-01',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "This is the Release Candidate for all of NASL.  Search was reworked so that it persists and can be cleared.  There are also some other minor things I updated, but aren't worth mentioning.  Enjoy.",
  },
  {
    title: 'The League Companion Alpha Release is finally here!',
    date: '2018-11-27',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Bob',
    category: 'Release',
    content: "The alpha release is finally ready for the upcoming draft.  There are still issues to be addressed, but I will do my best to detail them below so everyone knows what to expect.  Despite its bare-bones state, I think the tool will be useful and add some interesting insight.",
    issues: [
      "Goalie views are bugged.  I need to update them to support goalie technicals and changes all of the rating formulas to make senese for them.  Sorry.",
      "Cannot persist a search query.  I'm aware that it's really annoying to do a search, look at a player, and have to do the search again.  I'll have a fix soon",
      "Age slider can get a little bugged.  Just play with it and it will fix itself.",
      "Lots of optimizations to do, virtually nothing is optimized.",
      "Retired players remain on the last team they played for.  I will eventually do something to tag them and remove them from the general player search.",
      "Color coding doesn't always match EHM's tolerances.  I will make it consistent soon.",
      "Search view will be getting many more search filters in time.",
      "When choosing one of the sort criteria, I will soon add that filed to the table below.  Some of the ratings are not represented there.",
      "UI will be updated with the formulas that I use for the ratings.  I will definitely take suggestions on how to improve them, but changing them does require me to do a complete DB rebuild.",
      "League/Team views will come eventually.",
      "More team logos will be added.",
      "Search is limited to 50 results.  I'll do something to extend this, I just didn't have time to do pagination.",
      "Will eventually have more/better views for larger desktops down to mobile phone views.",
      "Will be adding primary/secondary role ATT highlights if someone can get me that data.",
      "Planning a player comparison view.",
      "And much, much more."
    ]
  }
];

class Blog extends React.Component {

  state = { posts };

  render () {

    const { isAuthed } = this.props;
    if (!isAuthed()) { return <div style={{ padding: '20px 0px 0px 30px', position: 'relative' }}>Not Authenticated</div> };

    return (
      <section className="page-blog container-fluid no-breadcrumbs with-maxwidth-md chapter">
        <QueueAnim type="bottom" className="ui-animate">
          {
            this.state.posts.map((post, index) => (
              <article style={{ margin: '0px', padding: '0px' }} className="blog-item" key={index}>
                <h2><a href="/">{post.title}</a></h2>
                <div className="blog-info">
                  <span><a href="/" className="author">{post.author}</a></span>
                  <span className="date">{post.date}</span>
                  <span className="category"><a href="/">{post.category}</a></span>
                </div>
                <p className="desc">{post.content}</p>

                <ul>
                { post.issues && post.issues.map((issue, index) => (
                  <li>{issue}</li>
                ))}
              </ul>
              </article>
            ))
          }
        </QueueAnim>
      </section>
    );
  }
}

export default Blog;
