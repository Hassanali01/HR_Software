import Chart from 'react-apexcharts'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DepartmentEmployees = () => {
  const [Labels, setLabels] = useState([])
  const [Series, setSeries] = useState([])
  const getData = async () => {
    try {
      const noofemployees = await axios.get("departments/get/info");
      const Labels = []
      const Series = [];
      noofemployees.data.depwiseemployees.map((d) => {
        Labels.push(d.departmentname);
        Series.push(d.employees)
      })
      setLabels(Labels);
      setSeries(Series)
    } catch (error) {
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const options = {
    fill: {
      colors: ["#008FFB", "#00E396", "#F9C80E", "#FF4560", "#662E9B", "#2B908F", "#F86624"]
    },
    labels: Labels,
    dataLabels: {
      style: {
        colors: ['#fff']
      }
    },
    colors: ["#008FFB", "#00E396", "#F9C80E", "#FF4560", "#662E9B", "#2B908F", "#F86624"],
  }


  const [department, setDepartment] = useState([])
  const fetch = async () => {
    try {
      const res = await axios.get("departments")
      const data = res.data.departments
      setDepartment(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch();
  }, [])

  const labels = []
  department.map((d) => {
    labels.push({
      departments: d.departmentname
    })
  })

  const series = labels.map((d) => {
    return d.departments
  })


  return (
    <div className="donut">
      <Chart options={options} series={Series} type="pie" width="490" />
    </div>
  )
}

export default DepartmentEmployees