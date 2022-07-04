import Icon from 'shared/components/Icon';
import styles from './CloseButton.scss';

export default function CloseButton() {
  return (
    <Icon
      onClick={function (event: React.MouseEvent<Element, MouseEvent>): void {
        throw new Error('Function not implemented.');
      }}
      type="close"
      className={styles.close}
    ></Icon>
  );
}
