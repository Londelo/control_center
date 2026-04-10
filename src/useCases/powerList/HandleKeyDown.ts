import React from 'react';

type HandleKeyDownArgs = {
  powerListLength: number;
  standardTaskLength: number;
  powerListRefs: React.RefObject<HTMLInputElement>[];
  standardTaskRefs: React.RefObject<HTMLInputElement>[];
};

const HandleKeyDown = ({ powerListLength, standardTaskLength, powerListRefs, standardTaskRefs }: HandleKeyDownArgs) =>
  (listType: 'power' | 'standard', index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const totalInputs = powerListLength + standardTaskLength;
      let currentGlobalIndex: number;
      if (listType === 'power') {
        currentGlobalIndex = index;
      } else {
        currentGlobalIndex = powerListLength + index;
      }
      let nextGlobalIndex: number;
      if (e.key === 'ArrowDown') {
        nextGlobalIndex = (currentGlobalIndex + 1) % totalInputs;
      } else {
        nextGlobalIndex = (currentGlobalIndex - 1 + totalInputs) % totalInputs;
      }
      if (nextGlobalIndex < powerListLength) {
        powerListRefs[nextGlobalIndex]?.current?.focus();
      } else {
        const standardIndex = nextGlobalIndex - powerListLength;
        standardTaskRefs[standardIndex]?.current?.focus();
      }
    }
  };

export default HandleKeyDown;
