"use client";
import React, { useState } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const Allsteps = [FirstStep, SecondStep][currentStep];
  const [name, setName] = useState<string>("");

  return (
    <Allsteps
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      setName={setName}
      name={name}
    />
  );
};

export default Page;
