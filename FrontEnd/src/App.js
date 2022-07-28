import React from "react";
import Search from "./components/Search";
class App extends React.Component {
  render() {
    return (
      <div>
        <Search suggestions={["The University of Texas at Dallas About Us", "Apple", "The University of Texas at Austin", "Google", "Apple - Wikipedia", "8 Impressive Health Benefits of Apples - Healthline", "University of Houston", "Welcome to the City of Dallas, Texas"]}/>
      </div>
    );
  }
}

export default App;