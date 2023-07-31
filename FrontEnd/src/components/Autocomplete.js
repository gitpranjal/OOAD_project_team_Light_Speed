import React, { Component, Fragment } from "react";
import "../styles.css";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: ""
    };
  }

  onInputChange = e => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      option =>
        option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeIndex: 0,
      filteredOptions,
      showOptions: true,
      userInput
    });
  };

  onOptionClick = e => {
    this.setState({
      activeIndex: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onInputKeyDown = e => {
    const { activeIndex, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeIndex: 0,
        showOptions: false,
        userInput: filteredOptions[activeIndex]
      });
    } else if (e.keyCode === 38) {
      if (activeIndex === 0) {
        return;
      }
      this.setState({ activeIndex: activeIndex - 1 });
    } else if (e.keyCode === 40) {
      if (activeIndex - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeIndex: activeIndex + 1 });
    }
  };

  render() {
    const {
      onInputChange,
      onOptionClick,
      onInputKeyDown,
      state: { activeIndex, filteredOptions, showOptions, userInput }
    } = this;

    let optionsListComponent;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionsListComponent = (
          <ul className="options">
            {filteredOptions.map((option, index) => {
              let className;

              if (index === activeIndex) {
                className = "option-active";
              }
              return (
                <li
                  className={className}
                  key={option}
                  onClick={onOptionClick}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionsListComponent = (
          <div className="no-options">
            <em>No options available.</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          value={userInput}
        />
        {optionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
