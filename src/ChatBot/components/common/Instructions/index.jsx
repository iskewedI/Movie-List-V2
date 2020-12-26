import React, { useState } from 'react';
import styles from './styles';

const Instructions = ({ instructions, customButtons, handleDone }) => {
  const classes = styles();

  const [step, setStep] = useState(0);

  const instructionsMarkup = instructions.map(instruction => (
    <li key={instruction.id} className={classes.instruction}>
      {instruction.text}
      {instruction.hint && (
        <button
          className={`${classes.orientation} linkButton`}
          onClick={instruction.hint}
        >
          Give me a hint!
        </button>
      )}
    </li>
  ));

  return (
    <div className={classes.instructionsContainter}>
      {instructionsMarkup[step]}
      {instructionsMarkup[step - 1] && (
        <button
          className={`${classes.stepController} linkButton`}
          onClick={() => setStep(step - 1)}
        >
          Previous
        </button>
      )}
      {instructionsMarkup[step + 1] && (
        <button
          className={`${classes.stepController} linkButton`}
          onClick={() => setStep(step + 1)}
        >
          Next
        </button>
      )}
      {customButtons && (
        <div>
          {customButtons.map(b => (
            <button key={b.id} className={'linkButton'} onClick={b.handler}>
              {b.text}
            </button>
          ))}
        </div>
      )}
      {step === instructionsMarkup.length - 1 && (
        <button className={`${classes.finalize} linkButton`} onClick={handleDone}>
          Done!
        </button>
      )}
    </div>
  );
};

export default Instructions;
