import HistoryItem from '../../components/HistoryItem';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';

export const History = observer(() => {
  const store = useStore();

  return (
    <div className="py-6 pr-6">
      <header>
        <h1 className="text-3xl text-white">History</h1>
      </header>
      <section className="pt-6 overflow-y-auto">
        {store.history.items.map((data) => (
          <HistoryItem
            key={data.id}
            {...data}
            onDelete={() => store.history.removeItemById(data.id)}
          />
        ))}
      </section>
    </div>
  );
});
