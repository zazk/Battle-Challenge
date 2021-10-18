/* globals describe, test, jest, expect */
import { History } from './History';

test('History Test', () => {
  const history = new History();

  expect(history.items).toEqual([]);

  const historyItem = {
    id: 'test_id',
    userWins: true,
    level: 0,
    startDate: new Date(),
    endDate: new Date(),
  };

  history.addNewItem(historyItem);

  expect(history.items).toEqual([historyItem]);

  history.removeItemById(historyItem.id);

  expect(history.items).toEqual([]);
});
