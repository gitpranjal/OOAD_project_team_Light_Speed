import React from "react";
import Search from "./components/Search";
class App extends React.Component {
  render() {
    return (
      <div>
        <Search suggestions={["Apple", "Banana", "Oranges",  "Grapes", "The University of Texas at Austin", "The greatest university of all time",  "Google", "Apple - Wikipedia", "8 Impressive Health Benefits of Apples - Healthline", "University of Houston", "Welcome to the City of Dallas, Texas", "The University of Texas at Dallas About Us",]}/>
      </div>
    );
  }
}

export default App;