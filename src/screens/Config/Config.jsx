import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import Checkbox from '../../components/Checkbox';
import { GAME_LEVELS } from '../../utils/constants';

export const Config = observer(() => {
  const store = useStore();

  return (
    <div className="py-6">
      <h2 className="text-3xl text-white">Config</h2>
      <section className="py-6">
        <label>
          <span className="text-white">User Name</span>
          <input
            type="text"
            name="user-name"
            className="ml-4 bg-whtie bg-opacity-30 border-2 border-white rounded-lg px-2 py-1"
            onChange={(e) => store.config.setName(e.target.value)}
            value={store.config.name}
          />
        </label>
        <div className="mt-6">
          <span className="text-white mr-10">Level</span>
          <label>
            <span className="text-white mr-2 ml-5">{GAME_LEVELS[0]}</span>
            <Checkbox
              onClick={() => store.config.setLevel(0)}
              checked={store.config.levelIsEasy}
            />
          </label>
          <label>
            <span className="text-white mr-2 ml-5">{GAME_LEVELS[1]}</span>
            <Checkbox
              onClick={() => store.config.setLevel(1)}
              checked={store.config.levelIsMedium}
            />
          </label>
          <label>
            <span className="text-white mr-2 ml-5">{GAME_LEVELS[2]}</span>
            <Checkbox
              onClick={() => store.config.setLevel(2)}
              checked={store.config.levelIsHard}
            />
          </label>
        </div>
      </section>
    </div>
  );
});
