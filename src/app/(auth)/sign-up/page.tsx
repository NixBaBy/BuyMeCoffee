"use client";
import React, { useState } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const Allsteps = [FirstStep, SecondStep][currentStep];

  return <Allsteps setCurrentStep={setCurrentStep} currentStep={currentStep} />;
};

export default Page;
