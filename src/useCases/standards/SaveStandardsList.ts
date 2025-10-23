import StandardsDB from '@/backend/standards';
import { Standard } from '@/types/standards';

type SaveStandardsListArgs = {
  currentStandard: Standard;
};

const SaveStandardsList = ({
  currentStandard
}: SaveStandardsListArgs) => async () => {
  await StandardsDB.save(currentStandard);
};

export default SaveStandardsList;
