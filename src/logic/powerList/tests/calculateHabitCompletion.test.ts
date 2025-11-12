import calculateHabitCompletion from '../calculateHabitCompletion';
import { PowerLists } from '@/types/powerList';

describe('calculateHabitCompletion', () => {
  function makeTask(id: string, completed: boolean, left = 0, needed = 10, resetDates: string[] = []): any {
    return {
      id,
      completed,
      time: {
        left,
        needed,
        resetDates,
      },
    };
  }

  function makePowerList(date: string, tasks: any[]): any {
    return {
      id: `pl-${date}`,
      date,
      tasks,
      isWin: false,
      isLoss: false,
      isComplete: false,
    };
  }

  it('increments count for completed tasks', () => {
    const allPowerLists: PowerLists = {
      '11/10/2025': makePowerList('11/10/2025', [makeTask('a', true)]),
      '11/11/2025': makePowerList('11/11/2025', [makeTask('a', true)]),
    };
    const result = calculateHabitCompletion({ allPowerLists });
    expect(result['11/11/2025'].tasks[0].time.left).toBe(8);
  });

  it('resets streak after 3 missed days', () => {
    const allPowerLists: PowerLists = {
      '11/08/2025': makePowerList('11/08/2025', [makeTask('a', true)]),
      '11/09/2025': makePowerList('11/09/2025', [makeTask('a', true)]),
      '11/10/2025': makePowerList('11/10/2025', [makeTask('a', false)]),
      '11/11/2025': makePowerList('11/11/2025', [makeTask('a', false)]),
      '11/12/2025': makePowerList('11/12/2025', [makeTask('a', false)]),
      '11/13/2025': makePowerList('11/13/2025', [makeTask('a', true)]),
    };
    const result = calculateHabitCompletion({ allPowerLists });
    console.log(JSON.stringify(result, null, 2))
    expect(result['11/11/2025'].tasks[0].time.left).toBe(8);
    expect(result['11/11/2025'].tasks[0].time.resettingNext).toBe(false);

    expect(result['11/12/2025'].tasks[0].time.left).toBe(8);
    expect(result['11/12/2025'].tasks[0].time.resettingNext).toBe(true);

    expect(result['11/13/2025'].tasks[0].time.left).toBe(10);
    expect(result['11/13/2025'].tasks[0].time.resettingNext).toBe(false);
    expect(result['11/13/2025'].tasks[0].time.resetDates?.[0]).toBe('11/13/2025');
  });

  it('does not reset streak if missed days < 3', () => {
    const allPowerLists: PowerLists = {
      '11/10/2025': makePowerList('11/10/2025', [makeTask('a', true)]),
      '11/11/2025': makePowerList('11/11/2025', [makeTask('a', false)]),
      '11/12/2025': makePowerList('11/12/2025', [makeTask('a', false)]),
      '11/13/2025': makePowerList('11/13/2025', [makeTask('a', true)]),
    };
    const result = calculateHabitCompletion({ allPowerLists });
    expect(result['11/13/2025'].tasks[0].time.left).toBe(8);
    expect(result['11/13/2025'].tasks[0].time.resetDates?.length).toBe(0);
  });
});
