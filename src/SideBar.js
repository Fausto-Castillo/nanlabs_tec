import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Operations from "./Operations";
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import ContrastIcon from '@mui/icons-material/Contrast';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Icon from '@mui/material/Icon';


export default function SideBar(props) {
  const [hover, setHover] = useState(true);
  const operationsListOriginal = [
    {
      title: "Rotation",
      operName: "rot",
      marks: [
        {
          value: 0,
          label: "0°"
        },
        {
          value: 359,
          label: "359°"
        }
      ],
      min: 0,
      max: 359,
      defaultValue: 359,
      icon:"3d_rotation"
    },
    {
      title: "Orient",
      operName: "orient",
      marks: [
        {
          value: 1,
          label: "0"
        },
        {
          value: 270,
          label: "270"
        }
      ],
      min: 1,
      max: 270,
      defaultValue: 1,
      icon:"rotate_90_degrees_cw"
    },
    {
      title: "Contrast",
      operName: "con",
      marks: [
        {
          value: -100,
          label: "-100"
        },
        {
          value: 100,
          label: "100"
        }
      ],
      min: -100,
      max: 100,
      defaultValue: 0,
      icon:"contrast"
    },
    {
      title: "Brightness",
      operName: "bri",
      marks: [
        {
          value: -100,
          label: "-100"
        },
        {
          value: 100,
          label: "100"
        }
      ],
      min: -100,
      max: 100,
      defaultValue: 0,
      icon:"brightness_6"
    },
    {
      title: "Hue Shift",
      operName: "hue",
      marks: [
        {
          value: 0,
          label: "0"
        },
        {
          value: 360,
          label: "360"
        }
      ],
      min: 0,
      max: 360,
      defaultValue: 0,
      icon:"invert_colors"
    },
    {
      title: "Pixellate",
      operName: "px",
      marks: [
        {
          value: 0,
          label: "0"
        },
        {
          value: 100,
          label: "100"
        }
      ],
      min: 0,
      max: 100,
      defaultValue: 0,
      icon:"lens_blur"
    },
    {
      title: "Noise Reduction Bound",
      operName: "nr",
      marks: [
        {
          value: -100,
          label: "-100"
        },
        {
          value: 100,
          label: "100"
        }
      ],
      min: -100,
      max: 100,
      defaultValue: 20,
      icon:"compare"
    },
   
  ];

  let operationsList = operationsListOriginal



  const handleSliderChange = (value, operName) => {
    props.changePropertiesImage(value, operName);
  };



  return (
    <div onMouseEnter={() => setHover(false)} onMouseLeave={() => setHover(true)}>
      <div className="navBarContainer">
        {hover ?

          <Box className="navBar">
            {operationsList.map((operation) => (
              <Box className="navBarIcon" key={operation.title}>
                <Icon>{operation.icon}</Icon>
              </Box>
            ))}
          </Box>
          :
          <Box className="navBar">
            {operationsList.map((operation) => (
              <Box className="navBarItem" key={operation.title}>
                 <Icon>{operation.icon}</Icon>
                <Operations
                  marks={operation.marks}
                  max={operation.max}
                  min={operation.min}
                  title={operation.title}
                  defaultValue={props.propertiesSelected[operation.operName] ? props.propertiesSelected[operation.operName] : operation.defaultValue}
                  handleChangeSlider={(event) =>
                    handleSliderChange(event, operation.operName)
                  }
                />
              </Box>
            ))}
          </Box>
        }
      </div>
    </div>
  );
}
