import { ReactComponent as Male } from 'assets/genders/male.svg';
import { ReactComponent as Female } from 'assets/genders/female.svg';
import { ReactComponent as GenderlessIcon } from 'assets/genders/genderless.svg';

const iconMap = {
  Male: <Male width={20} height={20} fill="#33b3c8" title="Male" />,
  Female: <Female width={24} height={24} fill="pink" title="Female" />,
  Genderless: (
    <GenderlessIcon width={24} height={24} fill="#999" title="Genderless" />
  ),
  unknown: (
    <GenderlessIcon width={24} height={24} fill="#999" title="Genderless" />
  )
};

export function GenderIcon({ gender }) {
  return iconMap[gender] || null;
}
