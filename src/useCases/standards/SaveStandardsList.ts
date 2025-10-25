import StandardsDB from '@/backend/standards';
import { Standard } from '@/types/standards';

type SaveStandardsListArgs = {
  currentStandard: Standard;
  updateStandardState: (standard: Standard) => void;
};

const SaveStandardsList = ({
  currentStandard,
  updateStandardState
}: SaveStandardsListArgs) => async () => {
  await StandardsDB.save(currentStandard);
  updateStandardState(currentStandard)
};

export default SaveStandardsList;
