import LearnMore from './LearnMore';
import HeaderWithButton from '../../common/HeaderWithButton';

const Collection = ({ title, items }) => {
  return (
    <>
      <HeaderWithButton title={title} />
      <LearnMore items={items} />
    </>
  );
};

export default Collection;
