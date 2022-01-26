import React from "react";
import { Background } from "react-imgix";

export default function HeroImage(props) {
  return (
    <Background src={props.image} className="hero-image">
    </Background>
  );
}
