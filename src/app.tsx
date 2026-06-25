import { I18nextProvider } from 'react-i18next';

import i18n from '@/locales/i18n';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <h1>Hello</h1>
  </I18nextProvider>
);

export default App;
