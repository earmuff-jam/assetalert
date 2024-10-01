import LearnMore from './LearnMore';
import RowHeader from '../../common/RowHeader';

const Collection = ({ title, items }) => {
  return (
    <>
      <RowHeader title={title} />
      <LearnMore items={items} />
    </>
  );
};

export default Collection;
