import React, { Component } from 'react'
import { ExcelRenderer } from "react-excel-renderer";
import './ecxel.css'
export class EcxelImport extends Component {
  state = {
    cols: [],
    rows: []
  };
  uploadFile = event => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
      } else {
        const { cols, rows } = resp;
        this.setState(
          {
            cols: cols,
            rows: rows
          },
          () => {
            const data = [...rows];
            data.shift();
            this.props.uploadHandler(data);
          }
        );
      }
    });
  };

  render() {
    return (
      <div className="excel-import-container" >
        <div className="file-upload" style={{backgroundColor:"white"}}>
          <input type="file" onChange={this.uploadFile} />
          <button style={{width:"200px" , backgroundColor: "rgb(137, 179, 83)"}}>Upload Excel File</button>
        </div>
      </div>
    )
  }
}

export default EcxelImport
