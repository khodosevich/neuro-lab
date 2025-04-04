import React from 'react';
import { DatasetsType } from '../../types/type.ts';

const DatasetsActions: React.FC<DatasetsType> = ({dataset_url}) => {

	return (
		<a href={`${dataset_url}`} rel="noopener noreferrer" target="_blank">
			Датасет
		</a>
	);
};

export default DatasetsActions;