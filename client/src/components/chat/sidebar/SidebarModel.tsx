import React from 'react';
import { ModelSidebarType } from '../../../types/type.ts';
import { NavLink, useParams } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const SidebarModel: React.FC<ModelSidebarType> = ({ item }) => {
	const { id } = useParams();

	return (
			<NavLink to={`/chat/${item.id}`}
			         style={{
				         display: 'flex',
				         alignItems: 'center',
				         gap: '10px',
				         backgroundColor: `${Number(id) === item.id ? '#9e9e9e' : 'white' } `,
				         color: 'black',
				         borderRadius: '10px',
				         padding: '10px',
			         }}>
				<QuestionAnswerIcon/>
				{
					item?.name
				}
			</NavLink>
	);
};

export default SidebarModel;