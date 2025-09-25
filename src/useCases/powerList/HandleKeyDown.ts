import React from 'react';
import { PowerList } from '@/types/powerList';

type HandleKeyDownArgs = {
  currentPowerList: PowerList | null;
  powerListRefs: React.RefObject<HTMLInputElement>[];
  standardTaskRefs: React.RefObject<HTMLInputElement>[];
};

const HandleKeyDown = ({ currentPowerList, powerListRefs, standardTaskRefs }: HandleKeyDownArgs) =>
  ( listType: 'power' | 'standard', index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const powerListLength = 5;
      const standardTaskLength = currentPowerList?.standardTasks.length || 0;
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
