import React from 'react';
import '../Stylesheets/chart.css';
import "../Stylesheets/form.css";

class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      total: 0,
      checked: 0,
      allSelected: false
    }
    this.checkedBox = this.checkedBox.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.removeDebt = this.removeDebt.bind(this);
    this.addDebt = this.addDebt.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  checkAll(e) {
    const { chart } = this.props;
    let checked = 0;
    let total = 0;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (chart.length === this.state.checked) {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
      this.setState({
        total, 
        checked,
        allSelected: false
      });
    } else {
      for (let i = 1; i < checkboxes.length; i++) {
        checked += 1;
        total += parseFloat((chart[i - 1].balance).toFixed(2));
        checkboxes[i].checked = true;
      };
      this.setState({
        total,
        checked,
        allSelected: true
      });
    };
  };

  checkedBox (e) {
    const chartCount = this.props.chart.length;
    if (this.state.allSelected) {
      const selectAll = document.getElementById('checkboxes');
      selectAll.checked = false;
      this.setState({ allSelected: false });
    } else if (chartCount - 1 === this.state.checked) {
      const selectAll = document.getElementById("checkboxes");
      selectAll.checked = true;
      this.setState({allSelected: true})
    }
    const { chart } = this.props;
    const index = e.currentTarget.value;
    if (e.currentTarget.checked) {
      this.setState({
        total: this.state.total + parseFloat((chart[index].balance).toFixed(2)),
        checked: this.state.checked + 1
      });
    } else {
      this.setState({
        total: this.state.total - parseFloat(chart[index].balance.toFixed(2)),
        checked: this.state.checked - 1,
      });
    }
  };

  addDebt () {
    const form = document.querySelector('form');
    if (!form.style.display || form.style.display === "none") {
      form.style.display = "block"
    } else {
      form.style.display = "none";
      for (let i = 0; i < form.elements.length; i++) {
        form.elements[i].value = "";
      };
    };
  };

  submitForm (e) {
    e.preventDefault();
    const creditorName = document.getElementById('creditorName').value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const minPaymentPercentage = document.getElementById("minPaymentPercentage").value;
    const balance = document.getElementById("balance").value;
    if ((!parseInt(minPaymentPercentage) || minPaymentPercentage > 100) || 
      (!parseInt(balance) || balance < 0)) return;

    if (!creditorName || !firstName || !lastName) return;

    this.props.chart.push({
      creditorName, firstName, lastName, minPaymentPercentage: parseFloat(minPaymentPercentage), balance: parseFloat(balance)
    });
    this.setState({
      allSelected: false
    });
    const form = document.querySelector('form')
    form.style.display = "none";
    for(let i = 0; i < form.elements.length; i++) {
      form.elements[i].value = ""
    };
  };

  removeDebt (e) {
    e.preventDefault();
    const selected = this.state.checked;
    if (selected === 0) return;
    const inputSelected = document.querySelectorAll('input[type="checkbox"]:checked');
    for(let i = inputSelected.length - 1; i >= 0; i--) {
      const index = parseInt(inputSelected[i].value)
      this.props.chart.splice(index, 1)
      inputSelected[i].checked = false
    };
    this.setState({
      total: 0,
      checked: 0
    });
  };

  convertNumber (number) {
    return Number.isInteger(parseFloat(number))
      ? `${parseFloat(number).toLocaleString()}.00`
      : parseFloat(number).toLocaleString();
  };


  render () {
    const chart = this.props.chart;
    const entries = chart.map((entry, i) => {
        const percentage = (entry.minPaymentPercentage).toFixed(2);
        const balance = (entry.balance).toFixed(2);
        return (
          <tr key={i}>
            <td>
              <input
                type="checkbox"
                id="checkboxs"
                onClick={this.checkedBox}
                value={i}
              />
            </td>
            <td>{entry.creditorName}</td>
            <td>{entry.firstName}</td>
            <td>{entry.lastName}</td>
            <td>{percentage}%</td>
            <td>{this.convertNumber(balance)}</td>
          </tr>
        );
    });
    return (
      <main>
        <table className="headers">
          <thead>
            <tr>
              <th>
                <div className="header-checkbox">
                  <input
                    type="checkbox"
                    id="checkboxes"
                    onClick={this.checkAll}
                  />
                </div>
              </th>
              <th>Creditor</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Min Pay%</th>
              <th>Balance</th>
            </tr>
          </thead>
        </table>
        <table className="table">
          <tbody>{entries}</tbody>
        </table>
        <form onSubmit={this.submitForm}>
          <input
            id="creditorName"
            type="text"
            placeholder="Enter Creditor"
          ></input>
          <input
            id="firstName"
            type="text"
            placeholder="Enter First Name"
          ></input>
          <input
            id="lastName"
            type="text"
            placeholder="Enter Last Name"
          ></input>
          <input
            id="minPaymentPercentage"
            type="text"
            placeholder="Enter Percentage"
          ></input>
          <input id="balance" type="text" placeholder="Enter Balance"></input>
          <button>Submit</button>
        </form>
        <div className="buttons">
          <button onClick={this.addDebt}>Add Debt</button>
          <button onClick={this.removeDebt}>Remove Debt</button>
        </div>
        <div className="total">
          <span>Total</span>
          <span>${this.convertNumber(this.state.total)}</span>
        </div>
        <div className="count">
          <span>Total Row Count: {chart.length}</span>
          <span>Check Row Count: {this.state.checked}</span>
        </div>
      </main>
    );
  };
};

export default Chart;