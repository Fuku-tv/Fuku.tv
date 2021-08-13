import * as React from 'react';
import styles from './TitleDescription.module.scss';

interface Props {
  title: string;
  descriptionStart: string;
  descriptionEnd?: string;
  dynamicNumber?: string | number;
}

const TitleDescription: React.FC<Props> = ({ title, descriptionStart, descriptionEnd, dynamicNumber }) => {
  const extendedContent = (
    <>
      <span className="inline-number">{dynamicNumber}</span>
      {descriptionEnd}
    </>
  );

  return (
    <div className="title-description-container">
      <div className="text-wrapper">
        <h2>{title}</h2>
        <p>
          {descriptionStart}

          {descriptionEnd && extendedContent}
        </p>
      </div>
    </div>
  );
};

export default TitleDescription;
