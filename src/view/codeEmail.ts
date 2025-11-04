import { styleToString } from '@/utils';
import { CSSProperties } from '@shared/models';

const wrapper: CSSProperties = {
  backgroundColor: '#78B3CE',
  padding: '20px',
  textAlign: 'center',
  display: 'grid',
  placeItems: 'center',
  height: '50vh',
};

const mail: CSSProperties = {
  backgroundColor: '#FBF8EF',
  padding: '20px',
  borderRadius: '5px',
  height: '150px',
  width: '300px',
  margin: '0 auto',
};

const mailTitleText: CSSProperties = {
  fontSize: '18px',
};

const mailCodeText: CSSProperties = {
  fontSize: '24px',
};

export const codeEmail = (code: string): string => `
  <div style="${styleToString(wrapper)}">
  <div style="${styleToString(mail)}">
    <h2 style="${styleToString(mailTitleText)}">Ваш код подтверждения</h2>
    <p style="${styleToString(mailCodeText)}">${code}</p>
</div>
</div>
`;
