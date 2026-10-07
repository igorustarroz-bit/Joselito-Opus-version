import Listbox from './Listbox';
import ListboxItem from '../ListboxItem/ListboxItem';

export default {
  title: 'Components/Listbox',
  component: Listbox,
  parameters: { defaultTheme: 'light-white' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

/** Como en el máster: cuatro opciones "Label" sin control. */
export const Default = { args: { items: [{ text: 'Label' }, { text: 'Label' }, { text: 'Label' }, { text: 'Label' }] } };

/** Con radios (selección única) pasando las opciones como hijos (slot). */
export const ConRadios = {
  render: () => (
    <Listbox>
      {['Jamón', 'Paleta', 'Embutidos'].map((t, i) => <ListboxItem key={t} text={t} name="lb" value={t} defaultChecked={i === 0} />)}
    </Listbox>
  ),
};
