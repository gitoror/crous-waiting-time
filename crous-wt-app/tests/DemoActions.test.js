import { assert, expect, test } from 'vitest';

import { render, act } from 'vitest/next';
import ShowWaitTime from '../components/ShowWaitTime.js';

//////////////////////////////
// console.log('this is a test');
//////////////////////////////

// SET-UP
const object = {
  a: 1,
  b: 2,
};

// TESTS

test('test1', () => {
  expect(object.a).toBe(1);
});

// components tests

const waitTimesData = [
  {
    id: 9,
    created_at: '2023-04-11T21:05:01.303458+00:00',
    waiting_time: 10,
    name: 'Titi',
  },
  {
    id: 10,
    created_at: '2023-04-11T21:44:00.696299+00:00',
    waiting_time: 58,
    name: 'aah\n',
  },
  {
    id: 11,
    created_at: '2023-04-12T10:30:30.188445+00:00',
    waiting_time: 15,
    name: 'Ath',
  },
  {
    id: 12,
    created_at: '2023-05-18T20:03:36.239076+00:00',
    waiting_time: 1,
    name: 'Sim',
  },
  {
    id: 13,
    created_at: '2023-05-18T21:42:07.41174+00:00',
    waiting_time: 2,
    name: 'Tom',
  },
];

// it("should fetch and display data", async () => {
//   await act(async () => {
//     const { getByText } = render(<ShowWaitTime />);

//     // Assert loading state
//     expect(getByText(4)).toBeInTheDocument();

//     // Simulate async action completion
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Assert data display
//     expect(getByText("Some data")).toBeInTheDocument();
//   });
// });

import { screen } from 'vitest';

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
  },
}));

describe('ShowWaitTime', () => {
  it('should render the wait time and participant list', async () => {
    const mockWaitTimes = [
      { id: 1, name: 'User1', waiting_time: 10 },
      { id: 2, name: 'User2', waiting_time: 15 },
    ];

    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => ({ averageWaitTime: 12 }),
    });

    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => mockWaitTimes,
    });

    render(<ShowWaitTime />);

    expect(await screen.findByText("Temps d'attente actuellement :")).toBeInTheDocument();
    expect(await screen.findByText('12 minutes')).toBeInTheDocument();

    expect(await screen.findByText('Liste des participants à cette estimation :')).toBeInTheDocument();
    expect(await screen.findByText('User1 - 10 min')).toBeInTheDocument();
    expect(await screen.findByText('User2 - 15 min')).toBeInTheDocument();
  });
});
