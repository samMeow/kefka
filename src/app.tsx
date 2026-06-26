import { I18nextProvider } from 'react-i18next';

import i18n from '@/locales/i18n';
import MainForm from './mainForm';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <MainForm />
  </I18nextProvider>
);

export default App;
