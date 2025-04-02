import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const PercentDifference = () => {
  const generateInitialProblem = () => {
    const n1 = Math.floor(Math.random() * 91) + 10;
    const n2 = Math.floor(Math.random() * 91) + 10;
    return { value1: n1.toString(), value2: n2.toString() };
  };

  const initial = generateInitialProblem();
  const [value1, setValue1] = useState(initial.value1);
  const [value2, setValue2] = useState(initial.value2);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false
  });
  const [userInput1, setUserInput1] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [userInput3, setUserInput3] = useState('');
  const [hasError, setHasError] = useState({
    step1: false,
    step2: false,
    step3: false
  });
  const [stepAnswers, setStepAnswers] = useState({
    step1: '',
    step2: '',
    step3: ''
  });

  const calculatePercentDifference = (a, b) => {
    return Math.abs((b - a) / ((a + b) / 2)) * 100;
  };

  const generateNewProblem = () => {
    const { value1: newValue1, value2: newValue2 } = generateInitialProblem();
    setValue1(newValue1);
    setValue2(newValue2);
    setUserInput1('');
    setUserInput2('');
    setUserInput3('');
    setCurrentStep(1);
    setCompletedSteps({
      step1: false,
      step2: false,
      step3: false
    });
    setHasError({
      step1: false,
      step2: false,
      step3: false
    });
    setStepAnswers({
      step1: '',
      step2: '',
      step3: ''
    });
    setShowSteps(false);
  };

  const showStepAnswer = (step) => {
    const answers = {
      1: Math.abs(parseFloat(value2) - parseFloat(value1)).toString(),
      2: ((parseFloat(value1) + parseFloat(value2)) / 2).toFixed(1),
      3: calculatePercentDifference(parseFloat(value1), parseFloat(value2)).toFixed(1)
    };
    
    setStepAnswers(prev => ({ ...prev, [`step${step}`]: answers[step] }));
    setCompletedSteps(prev => ({ ...prev, [`step${step}`]: true }));
    if (step < 3) setCurrentStep(step + 1);
  };

  const checkStepAnswer = (step) => {
    const answers = {
      1: Math.abs(parseFloat(value2) - parseFloat(value1)).toString(),
      2: ((parseFloat(value1) + parseFloat(value2)) / 2).toFixed(1),
      3: calculatePercentDifference(parseFloat(value1), parseFloat(value2)).toFixed(1)
    };

    const userInputs = {
      1: userInput1,
      2: userInput2,
      3: userInput3
    };

    const isCorrect = Math.abs(parseFloat(userInputs[step]) - parseFloat(answers[step])) < 0.1;
    
    if (isCorrect) {
      setStepAnswers(prev => ({ ...prev, [`step${step}`]: answers[step] }));
      setCompletedSteps(prev => ({ ...prev, [`step${step}`]: true }));
      if (step < 3) setCurrentStep(step + 1);
    }
    
    setHasError(prev => ({ ...prev, [`step${step}`]: !isCorrect }));
    return isCorrect;
  };

  return (
    <div className="bg-gray-100 p-8 w-full max-w-4xl mx-auto">
      <Card className="w-full shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg">
          <h1 className="text-sky-900 text-2xl font-bold">Understanding Percent Difference</h1>
          <p className="text-sky-800">Learn how to calculate the difference between two numbers as a percentage!</p>
        </div>

        <CardContent className="space-y-6 pt-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What is Percent Difference?</h2>
            <p className="text-blue-600">
              Percent difference measures the relative change between two numbers as a percentage of their average. The formula to calculate percentage difference is:
            </p>
            <div className="flex justify-center items-center mt-4 mb-2 w-full">
              <div className="inline-flex items-center justify-center text-xl">
                <div className="text-center px-2">
                  Percentage difference
                </div>
                <div className="text-center px-2">=</div>
                <div>
                  <div className="inline-flex flex-col items-center px-1">
                    <div className="border-b border-black whitespace-nowrap px-1 pb-1">| x - y |</div>
                    <div className="inline-flex flex-col items-center text-lg">
                      <div className="border-b border-black px-1">x + y</div>
                      <div className="text-base px-1">2</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xl px-2">×</span>
                  <div className="px-1">
                    100
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Examples</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg mt-4">Let's find the percent difference between 20 (x) and 30 (y):</p>
                    <div className="space-y-6 mt-6">
                      <div>
                        <p className="font-medium">Step 1: Find the absolute value of x minus y</p>
                        <div className="p-4 my-2">|30 - 20| = 10</div>
                      </div>
                      <div>
                        <p className="font-medium">Step 2: Calculate the average of x and y</p>
                        <div className="p-4 my-2">(20 + 30) ÷ 2 = 25</div>
                      </div>
                      <div>
                        <p className="font-medium">Step 3: Divide and multiply by 100</p>
                        <div className="p-4 mb-1">10 ÷ 25 × 100 = 40%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <Button 
                onClick={generateNewProblem}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Problem
              </Button>
            </div>

            <div className="text-center text-2xl mb-4 space-y-2">
              <div className="font-mono">
                Find the percent difference between {parseInt(value1).toLocaleString()} and {parseInt(value2).toLocaleString()}
              </div>
            </div>

            <Button 
              onClick={() => setShowSteps(true)}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3"
            >
              Solve Step by Step
            </Button>

            {showSteps && (
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p className="mb-4">1. Find the absolute difference:</p>
                {completedSteps.step1 ? (
                  <div className="text-green-600 font-bold mb-6">
                    |{value2} - {value1}| = {stepAnswers.step1}
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <Input 
                        type="number"
                        value={userInput1}
                        onChange={(e) => {
                          setUserInput1(e.target.value);
                          setHasError(prev => ({ ...prev, step1: false }));
                        }}
                        placeholder="Enter absolute difference"
                        className={`flex-1 ${hasError.step1 ? 'border-red-500' : 'border-blue-300'}`}
                      />
                      <div className="flex gap-4">
                        <Button
                          onClick={() => checkStepAnswer(1)}
                          className="bg-blue-400 hover:bg-blue-500"
                        >
                          Check
                        </Button>
                        <Button
                          onClick={() => showStepAnswer(1)}
                          className="bg-gray-400 hover:bg-gray-500 text-white"
                        >
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep >= 2 && (
                  <>
                    <p className="mb-4">2. Calculate the average:</p>
                    {completedSteps.step2 ? (
                      <div className="text-green-600 font-bold mb-6">
                        ({value1} + {value2}) ÷ 2 = {stepAnswers.step2}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <Input 
                          type="number"
                          value={userInput2}
                          onChange={(e) => {
                            setUserInput2(e.target.value);
                            setHasError(prev => ({ ...prev, step2: false }));
                          }}
                          placeholder="Enter average"
                          step="0.1"
                          className={`flex-1 ${hasError.step2 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkStepAnswer(2)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Check
                          </Button>
                          <Button
                            onClick={() => showStepAnswer(2)}
                            className="bg-gray-400 hover:bg-gray-500 text-white"
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {currentStep >= 3 && (
                  <>
                    <p className="mb-4">3. Calculate final percentage (round to nearest 0.1%):</p>
                    {completedSteps.step3 ? (
                      <>
                        <div className="text-green-600 font-bold mb-6">
                          {stepAnswers.step1} ÷ {stepAnswers.step2} × 100 = {stepAnswers.step3}%
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                          <p className="text-green-700">
                            You've successfully calculated the percent difference!
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <Input 
                          type="number"
                          value={userInput3}
                          onChange={(e) => {
                            setUserInput3(e.target.value);
                            setHasError(prev => ({ ...prev, step3: false }));
                          }}
                          placeholder="Enter final percentage"
                          step="0.1"
                          className={`flex-1 ${hasError.step3 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkStepAnswer(3)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Check
                          </Button>
                          <Button
                            onClick={() => showStepAnswer(3)}
                            className="bg-gray-400 hover:bg-gray-500 text-white"
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentDifference;