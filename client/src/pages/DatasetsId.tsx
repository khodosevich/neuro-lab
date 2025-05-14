import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DatasetDescription from '../components/datasets/DatasetDescription.tsx';
import DatasetsNotFound from '../components/datasets/DatasetsNotFound.tsx';
import DatasetsBody from '../components/datasets/DatasetsBody.tsx';

const DatasetsId = () => {
	const { id } = useParams();
	const { datasets } = useSelector((state: RootState) => state.datasets);
	const currentDataset = datasets.find(dataset => dataset.id === Number(id));

	if (!currentDataset) {
		return (
			<DatasetsNotFound/>
		);
	}

	return (
		<Box className="container">
			<DatasetDescription {...currentDataset} />
			{
				Number(id) === 4 && <DatasetsBody/>
			}
			{/*<DatasetsActions {...currentDataset} />*/}
		</Box>
	);
};

export default DatasetsId;
