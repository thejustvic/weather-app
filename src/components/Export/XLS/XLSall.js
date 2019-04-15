import React from 'react'
import { connect } from 'react-redux';
import xlsExport from 'xlsexport';

class XLSall extends React.Component {
  render() {

    const Create = 'Create';
    const Update = 'Update';
    const Expiry = 'Expiry';
    const Registered = 'Registered';
    const Servers = 'Servers';
    const Domain = 'Domain';
    const Registrar = 'Registrar';
    const Company = 'Company';
    const Country = 'Country';
    const City = 'City';

    const Issuer = 'Issuer';
    const Days = 'Days';
    const From = 'From';
    const To = 'To';

    const paramsForExport = [
      Create,
      Update,
      Expiry,
      Registered,
      Servers,
      Domain,
      Registrar,
      Company,
      Country,
      City,
      Issuer,
      Days,
      From,
      To,
    ];

    let dataFromStore = this.props.dataFromStore

    dataFromStore.forEach(item => {
      delete item._index;
      delete item._nestingLevel;
      delete item._original;
      delete item._subRows;
      delete item._viewIndex;
    });

    // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
    // value[p] должно совпадать с key
    const preparationForExport = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (this.props[`is${value[p]}Choice`] === 'none') {

            dataFromStore.forEach(item => {
              if (value[p] === Create) {
                delete item[`Create date`]
              }
              else if (value[p] === Update) {
                delete item[`Update date`]
              }
              else if (value[p] === Expiry) {
                delete item[`Expiry date`]
              }
              else if (value[p] === Registered) {
                delete item['Registered']
              }
              else if (value[p] === Servers) {
                delete item[`Servers`]
              }
              else if (value[p] === Domain) {
                delete item[`Domain status`]
              }
              else if (value[p] === Registrar) {
                delete item[`Registrar name`]
              }
              else if (value[p] === Company) {
                delete item[`Company name`]
              }
              else if (value[p] === Country) {
                delete item['Country name']
              }
              else if (value[p] === City) {
                delete item['City name']
              }

              else if (value[p] === Issuer) {
                delete item['Issuer']
              }
              else if (value[p] === Days) {
                delete item['Days left']
              }
              else if (value[p] === From) {
                delete item['From']
              }
              else if (value[p] === To) {
                delete item['To']
              }
            });

          }
        }
      }
      catch (e) {
        console.log(e.message)
      }
    }

    preparationForExport(paramsForExport)

    let xlsDataFromStore = '';
    dataFromStore.length > 0 ? xlsDataFromStore = new xlsExport(dataFromStore) : xlsDataFromStore = new xlsExport([paramsForExport]);


    return (
      <button
        className="btn btn-primary"
        style={{ whiteSpace: "pre", outline: 'none' }}
        onClick={
          () => xlsDataFromStore.exportToXLS('domains.xls')
        }
      >
        {this.props.label}
      </button>
    )
  }
}

const mapStateToProps = store => {
  // console.log(store)
  return {
    dataFromStore: store.dataAll
  }
}

export default connect(mapStateToProps)(XLSall);